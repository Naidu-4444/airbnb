"use server";

import { prisma } from "@/utils/prisma";

export default async function listingbyid(id) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return listing;
}
