"use server";

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

type Props = {
  postId: string;
  UserId:string
};
export async function CreateSavePost({ postId, UserId }: Props) {
  try {
    const getCookie = await cookies();
    const userId = getCookie.get("session")?.value;
    if (!userId) {
      return {
        message: "User not authenticated",
        error: "Unauthorized",
        statusCode: 401,
      };
    }

    if (userId===UserId) {
      return {
        message: "You can't save your own post",
        error: "Unauthorized",
        statusCode: 401,
      };
    }

    const savePost = await prisma.savePost.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    if (!savePost) {
      return {
        message: "Something went wrong",
        error: "Something went wrong",
        statusCode: 500,
      };
    }
    return {
      message: "Saved ",
      success: true,
      statusCode: 200,
    };
  } catch (error) {
    return { error, message: "Internal server error", statusCode: 500 };
  }
}
