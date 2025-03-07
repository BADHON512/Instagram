"use server";
import { cookies } from "next/headers";
import prisma from "@/lib/prismaDb";
import bcrypt from "bcryptjs";

export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return { error: "User not found", status: 404, success: false };
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!passwordMatch) {
      return { error: "Invalid password", status: 401, success: false };
    }

    // ✅ `cookies()` কে await করা হয়েছে
    const cookieStore = await cookies();

    // ✅ কুকি সেট করা
    cookieStore.set("session", user.id, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600 * 24 * 7,
      path: "/",
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    return {
      error: error || "Internal server error",
      status: 500,
      success: false,
    };
  }
}
