import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

export async function POST(req) {
  const body = await req.json();

  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("email", body.email);
  formData.append("password", body.password);

  const result = await registerUser(formData);

  return NextResponse.json(result);
}
