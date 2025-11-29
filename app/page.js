import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();

  return <div>IntelliDocs DB Connected!</div>;
}
