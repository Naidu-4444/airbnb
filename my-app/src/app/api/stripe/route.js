import Stripe from "stripe";
import { NextResponse } from "next/server";
import GetUser from "@/app/actions/getUser";
import reservation from "@/app/actions/reservation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const user = await GetUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { listingId, startDate, endDate, price, listingName } =
    await req.json();
  console.log("Data received in API route:", {
    listingId,
    startDate,
    endDate,
    price,
    listingName,
  });

  const reservationResult = await reservation({
    listingId,
    startDate,
    endDate,
    price,
    status: "PENDING",
  });

  if (!reservationResult.ok) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create reservation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: listingName,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/listing/${listingId}`,
      metadata: {
        reservationId: reservationResult.data.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return new NextResponse(JSON.stringify({ error: "Stripe error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
