import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const requestHeaders = await headers();

  const host = requestHeaders.get("host");
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/me`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Cookie: requestHeaders.get("cookie") || "",
    },
  });

  const data = await res.json();
  const user = data?.user;

  if (!user) return redirect("/auth/login");

  return (
    <>
    <div className="w-full h-full"
     >
    </div>
    </>
  );
}
