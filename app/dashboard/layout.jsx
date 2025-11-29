import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import LayoutBody from "./layoutnew";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) return redirect("/auth/login");

  return <LayoutBody user={user}>{children}</LayoutBody>;
}
