import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const session = await getAuthSession();
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const {
    category,
    location,
    roomCount,
    children,
    guestCount,
    imageSrc,
    title,
    description,
    price,
  } = body;
  const newListing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      roomCount,
      childCount: children,
      guestCount,
      imageSrc,
      title,
      description,
      price: parseInt(price, 10),
      userId: session?.user.id,
    },
  });
  return NextResponse.json({ created: newListing }, { status: 201 });
}
