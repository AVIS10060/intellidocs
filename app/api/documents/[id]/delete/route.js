import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";
import { getCurrentUser } from "@/lib/session";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (already done in /lib/db or /lib/cloudinary, so skip here)
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function DELETE(req, context) {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;

    // 1) Find document first so we can delete from Cloudinary too
    const doc = await Document.findOne({
      _id: id,
      userId: user.id,
    });

    if (!doc)
      return NextResponse.json({ error: "Document not found" }, { status: 404 });

    // 2) DELETE from Cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId);
    }

    // 3) DELETE from MongoDB
    await Document.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
