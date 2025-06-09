"use server";

import { prisma } from "@/utils/prisma";

export default async function getreservations(id) {
  const reservations = await prisma.reservation.findMany({
    where: {
      listingId: id,
    },
    include: {
      listing: true,
    },
  });
  return reservations;
}
