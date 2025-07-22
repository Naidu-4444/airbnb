"use server";

import { prisma } from "@/utils/prisma";
import GetUser from "./getUser";

export default async function reservation({
  listingId,
  startDate,
  endDate,
  price,
  status = "PENDING",
}) {
  try {
    const user = await GetUser();
    if (!user) {
      throw new Error("User not found");
    }

    const newReservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        listingId,
        startDate,
        endDate,
        totalPrice: price,
        status,
      },
    });

    return {
      ok: true,
      message: "Reservation created successfully",
      status: 201,
      data: newReservation,
    };
  } catch (error) {
    console.log("RESERVATION_CREATE_ERROR", error);
    return { ok: false, message: error.message, status: 500 };
  }
}

export async function foreservations() {
  try {
    const user = await GetUser();
    if (!user) return { ok: false, message: "Unauthorized", status: 401 };

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: user.id,
        status: "CONFIRMED",
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      message: "Reservations fetched successfully",
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
    await prisma.reservation.delete({
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
