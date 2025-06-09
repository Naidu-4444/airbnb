"use server";

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

export default async function reservation({
  listingId,
  startDate,
  endDate,
  price,
}) {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return { ok: false, message: "Not authorized", status: 403 };
  }
  if (!listingId || !startDate || !endDate || !price) {
    return { ok: false, message: "Missing required fields", status: 400 };
  }
  try {
    const res = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            startDate: startDate,
            endDate: endDate,
            totalPrice: price,
            userId: session.user.id,
          },
        },
      },
    });
    return { ok: true, message: "Reservation successful", status: 201 };
  } catch (error) {
    return { ok: false, message: error.message, status: 500 };
  }
}
