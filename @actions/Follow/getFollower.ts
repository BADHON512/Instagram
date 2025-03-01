"use server";


import { cookies } from "next/headers";
import prisma from "@/lib/prismaDb";

export async function GetFollower() {
  try {
    const getCookie = await cookies();
    const userId = getCookie.get("session")?.value;
    if (!userId) {
      return { message: "User ID not found", statusCode: 400 };

          }

          const  follower = await prisma.user.findMany({
           include:{
            followers:true
           }
          })

        return {follower, message: "Follower fetched successfully", statusCode: 200}
  } catch (error: any) {
    return { error: error.message || "Internal Server Error", statusCode: 500 };
  }
}
