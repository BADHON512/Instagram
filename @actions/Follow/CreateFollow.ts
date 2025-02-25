"use server";

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export async function CreateFollow(followingId: string) {
  try {
    const cookie = await cookies();
    const userid = cookie.get("session")?.value;
    if (!userid) {
      return {
        error: "User not authenticated",
        message: "Unauthorized",
        statusCode: 401,
      };
    }

    if (!followingId) {
      return {
        error: "User not authenticated",
        message: "Something went wrong",
        statusCode: 401,
      };
    }

    const FollowExist = await prisma.follow.findFirst({
      where: {
        followerId: userid,
        followeeId: followingId,
      },
    });
    if (FollowExist) {
      return {
        error: "User not authenticated",
        message: "Already follow",
        statusCode: 401,
      };
    }
    const follow = await prisma.follow.create({
      data: {
        followerId: userid,
        followeeId: followingId,
      },
    });
    if (!follow) {
      return {
        error: "User not authenticated",
        message: "Something went wrong",
        statusCode: 401,
      };
    }
    return {
      follow,
      message: "Follow successful",
      statusCode: 200,
      success: true,
    };
  } catch (error) {
    return {
      error: error.message || "Internal server error",
      message: "Something went wrong",
      statusCode: 500,
    };
  }
}
