"use server";

import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "./db";
import { signToken } from "./jwt";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

// export async function registerUser(formData) {
//   try {
//     await connectDB();

//     const name = formData.get("name");
//     const email = formData.get("email");
//     const password = formData.get("password");

//     if (!name || !email || !password) {
//       return { error: "Please fill all fields" };
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return { error: "User already exists" };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Optionally auto-login after register:
//     const token = signToken({ id: user._id, email: user.email });
//     cookies().set({
//       name: "intellidocs_token",
//       value: token,
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
//       sameSite: "lax",
//       // secure: true // enable in production (HTTPS)
//     });

//     return { success: true, user: { id: user._id, name: user.name, email: user.email } };
//   } catch (error) {
//     console.error("Register Error:", error);
//     return { error: "Server error while registering" };
//   }
// }
export async function registerUser(formData) {
  "use server";
  console.log("🔥 registerUser CALLED");  // <--- LOG 1

  try {
    console.log("🟡 Connecting DB...");   // <--- LOG 2
    await connectDB();
    console.log("🟢 DB Connected");        // <--- LOG 3

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("📥 INPUT:", { name, email, password }); // <--- LOG 4

    const existingUser = await User.findOne({ email });
    console.log("🔍 existingUser:", existingUser); // <--- LOG 5

    if (existingUser) {
      console.log("❌ User already exists");
      return { error: "User already exists" };
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("📝 Creating user...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("🎉 USER CREATED:", user); // <--- LOG 6

    const token = signToken({ id: user._id, email: user.email });
    console.log("🔑 TOKEN:", token); // <--- LOG 7

   // Inside registerUser
const cookieStore = await cookies();
cookieStore.set({
  name: "intellidocs_token",
  value: token,
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
});


    console.log("🍪 Cookie set"); // <--- LOG 8

    return { success: true };
  } catch (error) {
    console.error("❌ Register Error:", error); // <--- LOG 9
    return { error: "Server error while registering" };
  }
}


export async function loginUser(formData) {
  try {
    await connectDB();
 
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Please fill all fields" };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return { error: "User not found" };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: "Invalid password" };
    }

    // Create JWT and set HttpOnly cookie
    const token = signToken({ id: user._id, email: user.email });
   const cookieStore = await cookies();
cookieStore.set({
  name: "intellidocs_token",
  value: token,
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "lax",
});

    return { success: true, user: { id: user._id, name: user.name, email: user.email } };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Server error while logging in" };
  }
}
export async function logoutUser() {
  "use server";
  // clear cookie
  cookies().set({
    name: "intellidocs_token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return redirect("/auth/login");
  
}

// For production, uncomment secure: true to send cookie only over HTTPS.