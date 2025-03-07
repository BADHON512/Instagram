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
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const findUserName = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });
    if (findUserName) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
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

    return NextResponse.json({ user , message:"User created successfully", status: 200 });
  } catch (error) {
    return NextResponse.json({error, message:"Some thing went wrong" ,status: 500 });
  }
}
