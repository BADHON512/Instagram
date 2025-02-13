
import prisma from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userDataSend = await req.json(); // রিকোয়েস্টের বডি থেকে JSON ডেটা নেয়া

   const   user=await prisma.user.create({
    data:{
      name:userDataSend.name,
      email:userDataSend.email,
      username:userDataSend.username,

    
    }
   })
  



return NextResponse.json({user}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}