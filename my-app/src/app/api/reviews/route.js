import { NextResponse } from "next/server";
import GetUser from "@/app/actions/getUser";
import { prisma } from "@/utils/prisma";

export async function POST(request) {
  const currentUser = await GetUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { listingId, rating, comment } = body;

  if (!listingId || !rating || !comment) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const reservation = await prisma.reservation.findFirst({
    where: {
      userId: currentUser.id,
      listingId: listingId,
      endDate: {
        lt: new Date(),
      },
    },
  });

  if (!reservation) {
    return NextResponse.json(
      {
        error: "You must have a completed reservation to review this property.",
      },
      { status: 403 }
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: currentUser.id,
      listingId: listingId,
    },
  });

  if (existingReview) {
    return NextResponse.json(
      { error: "You have already reviewed this property." },
      { status: 403 }
    );
  }

  const review = await prisma.review.create({
    data: {
      comment,
      rating: parseInt(rating, 10),
      listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(review);
}
