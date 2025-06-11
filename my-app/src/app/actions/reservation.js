"use server";

import { prisma } from "@/utils/prisma";
import GetUser from "./getUser";

const user = await GetUser();

export async function foreservations() {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        listing: true,
      },
    });
    return {
      ok: true,
      message: "reservations fetched successfully",
      status: 200,
      data: reservations,
    };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: error.message, status: 500 };
  }
}

export async function cancelReservation(id) {
  try {
    const cancelled = await prisma.reservation.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
      message: "Reservation cancelled successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: error.message, status: 500 };
  }
}

export default async function reservation({
  listingId,
  startDate,
  endDate,
  price,
}) {
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
            userId: user.id,
          },
        },
      },
    });
    return { ok: true, message: "Reservation successful", status: 201 };
  } catch (error) {
    return { ok: false, message: error.message, status: 500 };
  }
}
