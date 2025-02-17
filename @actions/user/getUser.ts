import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export const GetUser = async () => {
  try {
    const getCookie = await cookies();
    const session = getCookie.get("session")?.value;
    if (!session) {
      return { error: "User not authenticated" };
    }
    const userData = JSON.parse(session);
    const userId = userData.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        posts: true,
        followers: true,
        following: true,
        // Add other user fields you need here
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};
