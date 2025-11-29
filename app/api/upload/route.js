import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Document from "@/models/Document";
import { getCurrentUser } from "@/lib/session";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    // 1. AUTH — Get Current Logged In User
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect DB
    await connectDB();

    // 2. Read file from form-data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Upload to Cloudinary (config already done globally)
    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "intellidocs" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    // 4. Save in MongoDB
    const doc = await Document.create({
      userId: user.id,
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      format: uploaded.format,
      size: uploaded.bytes,
      name: file.name,
    });

    return NextResponse.json({ success: true, document: doc });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
