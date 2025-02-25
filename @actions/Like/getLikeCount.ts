"use server";
import prisma from "@/lib/prismaDb";

export async function GetLikeCount(postId: string) {
  try {
    if (!postId) {
      return { message: "Post id is required", statusCode: 400 };
    }
    const likeCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    });

    if (!likeCount) {
      return { message: "No like found", statusCode: 404 };
    }
    return { likeCount, statusCode: 200, message: "Like count found" };
  } catch (error) {
    return { error, message: "Internal server error", statusCode: 500 };
  }
}
