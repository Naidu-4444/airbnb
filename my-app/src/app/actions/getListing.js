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
    } = searchParams;
    let query;
    query = {
      ...query,
      ...(locationValue && { locationValue }),
      ...(guestCount && { guestCount: { gte: +guestCount } }),
      ...(roomCount && { roomCount: { gte: +roomCount } }),
      ...(childCount && { childCount: { gte: +childCount } }),
    };

    if (startDate && endDate) {
      const formatedStDate = formatISO(new Date(startDate));
      const formatedEndDate = formatISO(new Date(endDate));
      console.log(formatedStDate, formatedEndDate);
      query = {
        ...query,

        NOT: {
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
        },
      };
    }
    return await prisma.listing.findMany({ where: query });
  } catch (error) {
    console.log(error);
  }
}
