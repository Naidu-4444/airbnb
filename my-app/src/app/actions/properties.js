"use server";

import { prisma } from "@/utils/prisma";
import GetUser from "@/app/actions/getUser";

export async function getProperties() {
  try {
    const user = await GetUser();
    if (!user) return [];

    return await prisma.listing.findMany({
      where: { userId: user.id },
    });
  } catch (error) {
    console.error("Get properties error:", error);
    return [];
  }
}

export async function deletePropertyById(id) {
  try {
    await prisma.listing.delete({ where: { id } });
    return { ok: true, message: "Property deleted successfully" };
  } catch (error) {
    console.error("Delete property error:", error);
    return { ok: false, message: error.message };
  }
}
