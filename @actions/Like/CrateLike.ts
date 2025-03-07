"use server";

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

type Props = {
  postId: string;
};

export async function CreateLike({ postId }: Props) {
  try {

    if (!postId) {
      return { error: "Post not found", statusCode: 404 };
    }

    const getCookie = await cookies();
    const userid = getCookie.get("session")?.value;

    if (!userid) {
      return { error: "User not authenticated", statusCode: 401 };
    }

    // Check if the like already exists
    const likeExts = await prisma.like.findFirst({
      where: {
        userId: userid,
        postId: postId,
      },
    });

    if (likeExts) {
      // If already liked, then remove it (Unlike)
      await prisma.like.delete({
        where: { id: likeExts.id },
      });
      return { message: "Like removed", statusCode: 200, success: true };
    } else {
      // If not liked before, then add like
      const like = await prisma.like.create({
        data: {
          userId: userid,
          postId: postId,
        },
      });

      if (!like) {
        return { message: "Like not created", statusCode: 500 };
      }

      return { like, statusCode: 200, message: "Like created", success: true };
    }
  } catch (error) {
    return { error, message: "Internal server error", statusCode: 500 };
  }
}
