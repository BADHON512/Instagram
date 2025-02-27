"use server";

import prisma from "@/lib/prismaDb";

export async function GetComment(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!comments)
      return { error: "Something went wrong", message: "", statusCode: 500 };
    return {
      comments,
      message: "Comments fetched successfully",
      statusCode: 200,
      success: true,
    };
  } catch (error) {
    return { error, message: "Internal server error", statusCode: 500 };
  }
}
