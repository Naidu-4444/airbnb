import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const reservationId = session.metadata?.reservationId;

    if (!reservationId) {
      return new NextResponse("Error: Missing reservationId", { status: 400 });
    }

    try {
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: "CONFIRMED",
        },
      });
    } catch (error) {
      console.error(
        "DATABASE ERROR: Failed to update reservation status:",
        error.message
      );
      return new NextResponse(`Database update failed: ${error.message}`, {
        status: 500,
      });
    }
  }

  return NextResponse.json({ received: true });
}
