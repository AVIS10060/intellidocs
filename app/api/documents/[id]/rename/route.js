import { NextResponse } from "next/server";
import Document from "@/models/Document";
import { getCurrentUser } from "@/lib/session";
import { connectDB } from "@/lib/db";

export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();
    const { newName } = body;

    if (!newName) {
      return NextResponse.json(
        { error: "New name is required" },
        { status: 400 }
      );
    }

    // Auth check
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update name in DB only (NO CLOUDINARY RENAME)
    const updatedDoc = await Document.findOneAndUpdate(
      { _id: id, userId: user.id },
      { name: newName },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, document: updatedDoc });
  } catch (error) {
    console.error("RENAME ERROR:", error);
    return NextResponse.json(
      { error: "Rename failed", details: error.message },
      { status: 500 }
    );
  }
}
