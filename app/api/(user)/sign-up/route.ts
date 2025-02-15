import prisma from "@/lib/prismaDb";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();

    const findUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (findUser) {
      console.log("⚠️ User already exists!"); // ✅ চেক করো
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
  
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: hashPassword,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
   
    return NextResponse.json(error, { status: 500 });
   
  }
}
