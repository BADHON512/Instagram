"use server"

import prisma from "@/lib/prismaDb";
import { cookies } from "next/headers";

export async function GetMessage(receiverId:string) {
    try {
        const getCookie = await cookies();
        const userId = getCookie.get("session")?.value;

        if (!userId) {
            return { error: "User ID not found", statusCode: 400 };
        }

        const getMessage=await prisma.message.findMany(({
            where:{
                senderId:userId,
                receiverId:receiverId
            }
        }))

    if (!getMessage) {
        return { error: "Message not found", statusCode: 404 };
    }

    return {getMessage, success:true, message: "Message fetched successfully", statusCode: 200}
    } catch (error) {
        return { error: error.message|| "internal server error", statusCode: 500 };
    }
}