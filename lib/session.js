// "use server";

// import { headers } from "next/headers";
// import cookie from "cookie";
// import { verifyToken } from "./jwt";
// import { connectDB } from "./db";
// import User from "@/models/User";

// export async function getCurrentUser() {
//   // MUST AWAIT headers()
//   const h = await headers();

//   const rawCookie = h.get("cookie") || "";
//   if (!rawCookie) return null;

//   const parsed = cookie.parse(rawCookie);
//   const token = parsed.intellidocs_token;

//   if (!token) return null;

//   const payload = verifyToken(token);
//   if (!payload) return null;

//   await connectDB();
//   const user = await User.findById(payload.id).lean();

//   if (!user) return null;

//   // fix ObjectId for client component safety
//   return {
//     id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//   };
// }

"use server";

import { headers } from "next/headers";
import cookie from "cookie";
import { verifyToken } from "./jwt";
import { connectDB } from "./db";
import User from "@/models/User";

export async function getCurrentUser() {
  const h = await headers(); // ⬅ REQUIRED in Next.js 15

  const rawCookie = h.get("cookie") || "";
  if (!rawCookie) return null;

  const parsed = cookie.parse(rawCookie);
  const token = parsed.intellidocs_token;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  await connectDB();
  const user = await User.findById(payload.id).lean();

  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}

