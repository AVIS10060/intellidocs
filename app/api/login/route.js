import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    // Convert JSON → FormData (because loginUser expects formData)
    const formData = new FormData();
    formData.append("email", body.email);
    formData.append("password", body.password);

    const result = await loginUser(formData);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Login Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
