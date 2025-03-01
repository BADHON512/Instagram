"use server";

type Props = {
  text: string;

  receiverId: string;
};
import { cookies } from "next/headers";
import prisma from "@/lib/prismaDb";

export async function CreateMessage({ text, receiverId }: Props) {
  try {
    const getCookie = await cookies();
    const userId = getCookie.get("session")?.value;
    if (!userId) {
      return { message: "User ID not found", statusCode: 400 };
    }

    const createMessage = await prisma.message.create({
      data: {
        senderId: userId,
        text: text,
        receiverId: receiverId,
      },
    });

    return {
      createMessage,
      success:true,
      message: "Message created successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    return { error: error.message || "Internal Server Error", statusCode: 500 };
  }
}
