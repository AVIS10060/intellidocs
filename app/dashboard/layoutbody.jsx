"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/app/context/SidebarContext";

export default function LayoutBody({ user, children }) {
  return (
    <SidebarProvider>
      <LayoutInner user={user}>{children}</LayoutInner>
    </SidebarProvider>
  );
}

function LayoutInner({ user, children }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
      }}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#121212] border-r border-white/10 shadow-xl z-50 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
      >
        <Sidebar />
      </aside>

      {/* MAIN PAGE */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}`}
      >
        {/* TOPBAR */}
        <header
          className={`fixed top-0 right-0 h-16 bg-white bg-opacity-80 backdrop-blur-xl shadow-md z-40 transition-all duration-300
            ${collapsed ? "left-20" : "left-64"}`}
        >
          <Topbar user={user} />
        </header>

        {/* CONTENT */}
        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  );
}
