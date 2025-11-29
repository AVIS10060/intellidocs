import { NextResponse } from "next/server";
import Document from "@/models/Document";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    // Authenticate User
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ documents: [] });
    }

    await connectDB();

    const docs = await Document.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      documents: docs.map((d) => ({
        ...d,
        _id: d._id.toString(), // fix ObjectId
      })),
    });
  } catch (error) {
    console.error("Document Fetch Error:", error);
    return NextResponse.json({ documents: [] });
  }
}
