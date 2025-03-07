"use server";

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export async function DeletePost(postId: string) {
  try {
    if (!postId) {
      return { success: false, message: "Post ID is required." };
    }

    const getCookie = await cookies();
    const userId = getCookie.get("session")?.value;

    if (!userId) {
      return { success: false, message: "User not authenticated." };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { comments: true, likes: true, SavePost: true },
    });

    if (!post) {
      return { success: false, message: "Post not found." };
    }

    if (post.userId !== userId) {
      return {
        success: false,
        message: "You are not authorized to delete this post.",
      };
    }

    await prisma.comment.deleteMany({ where: { postId: postId } });
    await prisma.like.deleteMany({ where: { postId: postId } });
    await prisma.savePost.deleteMany({ where: { postId: postId } });
    const deletedPost = await prisma.post.delete({ where: { id: postId } });

    return { success: true, message: "Post deleted successfully." };
  } catch (error) {
    console.error(
      "❌ Error deleting post:",
      error instanceof Error ? error.stack : error
    );
    return { success: false, message: "Failed to delete post." };
  }
}
