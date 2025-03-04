"use server";
import prisma from "@/lib/prismaDb";

export async function GetSingleUser(id: string) {
  try {
    if (!id) {
      return { error: "User ID not found", statusCode: 400 };
    }

    const user = await prisma.user.findUnique({
      where: {
        username: id,
      },
      include: {
        posts: true,
        followers: true,
        following: true,
        savePost: true,
        comments: true,
        likes: true,
      },
    });

    if (!user) {
      return { error: "User not found", statusCode: 404 };
    }

    return { user, statusCode: 200 };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Internal Server Error", statusCode: 500 };
  }
}
