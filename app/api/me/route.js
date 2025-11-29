import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import cookie from "cookie";

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const parsed = cookie.parse(cookieHeader);

    const token = parsed.intellidocs_token;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    await connectDB();
    const user = await User.findById(payload.id)
      .select("name email")
      .lean();

    return NextResponse.json({ user });
  } catch (err) {
    console.log("API /me error: ", err);
    return NextResponse.json({ user: null });
  }
}
