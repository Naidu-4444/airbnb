"use server";

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

const GetUser = async () => {
  const session = await getAuthSession();
  try {
    if (!session || !session.user) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default GetUser;
