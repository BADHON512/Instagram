"use server";

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export async function GetMessage(receiverId: string) {
  try {
    const getCookie = await cookies();
    const userId = getCookie.get("session")?.value;

    if (!userId) {
      return { error: "User ID not found", statusCode: 400 };
    }

    const getMessage = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!getMessage || getMessage.length === 0) {
      return { error: "No messages found", statusCode: 404 };
    }

    return {
      getMessage,
      success: true,
      message: "Messages fetched successfully",
      statusCode: 200,
    };
  } catch (error) {
    return { error: error.message || "Internal server error", statusCode: 500 };
  }
}
