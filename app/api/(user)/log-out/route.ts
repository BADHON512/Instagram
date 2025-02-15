import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout successful" });

    // ✅ কুকি মুছে ফেলার জন্য সেট করা
    response.cookies.set("session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: true, // HTTPS এ থাকলে নিরাপদ
      expires: new Date(0), // কুকি এক্সপায়ার করানো
      path: "/",
    });

    return response; // ✅ রেসপন্স রিটার্ন করতেই হবে!
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
