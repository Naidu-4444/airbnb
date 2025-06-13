"use server";

import { prisma } from "@/utils/prisma";
import GetUser from "./getUser";
const user = await GetUser();
export async function getFavorites() {
  if (!user) {
    return { ok: false, message: "User not found" };
  }
  return await prisma.user.findUnique({
    where: { id: user.id },
    select: { favoriteIds: true },
  });
}

export async function setFavorite(id) {
  if (!user) {
    return { ok: false, message: "User not found" };
  }
  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds.push(id);
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { favoriteIds },
    });
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: error.message, status: 500 };
  }
}
export async function removeFavoritebyId(id) {
  if (!user) {
    return { ok: false, message: "User not found" };
  }
  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((item) => item !== id);
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { favoriteIds },
    });
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: error.message, status: 500 };
  }
}

export async function getListingsByFavoriteIds(favoriteIds) {
  if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) {
    return [];
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
      include: {
        user: true,
      },
    });

    return listings;
  } catch (error) {
    console.log("getListingsByFavoriteIds error:", error.message);
    return [];
  }
}
