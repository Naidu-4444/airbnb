import { prisma } from "@/utils/prisma";
import { formatISO } from "date-fns";

export default async function getListing({ searchParams }) {
  try {
    const {
      locationValue,
      guestCount,
      roomCount,
      childCount,
      startDate,
      endDate,
      category,
    } = searchParams;

    let query = {};

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }

    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }

    if (childCount) {
      query.childCount = { gte: +childCount };
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      const formatedStDate = formatISO(new Date(startDate));
      const formatedEndDate = formatISO(new Date(endDate));

      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: formatedEndDate },
                endDate: { gte: formatedStDate },
              },
              {
                startDate: { lte: formatedStDate },
                endDate: { gte: formatedEndDate },
              },
            ],
          },
        },
      };
    }

    return await prisma.listing.findMany({ where: query });
  } catch (error) {
    console.log(error);
  }
}
