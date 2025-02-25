"use server";
import prisma from "@/lib/prismaDb";

export async function GetSingleMessage(id: string) {
  try {
    if (!id) {
      return { error: "User ID not found", statusCode: 400 };
    }

    const user = await prisma.user.findUnique({
      omit:{
        password:false
      },
      where: {
        id: id,
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
