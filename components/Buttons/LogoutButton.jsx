"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutUser } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();         // clear cookie (server action)
      router.push("/auth/login"); // redirect to login page
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      disabled={isPending}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
