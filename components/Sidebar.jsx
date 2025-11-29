"use client";

import { useSidebar } from "@/app/context/SidebarContext";
import { usePathname } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUpload,
  FiFileText,
  FiZap,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <FiHome size={20} />, href: "/dashboard" },
    { name: "Upload Documents", icon: <FiUpload size={20} />, href: "/dashboard/upload" },
    { name: "My Documents", icon: <FiFileText size={20} />, href: "/dashboard/documents" },
    { name: "AI Extractor", icon: <FiZap size={20} />, href: "/dashboard/extract" },
    { name: "Profile", icon: <FiUser size={20} />, href: "/dashboard/profile" },
  ];

  return (
    <div className="relative h-full text-white p-6 ">

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2
                  bg-[#1E1E1E] border border-white/20 text-white p-2 rounded-full
                  hover:bg-[#333] transition z-[999]"
      >
        {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
      </button>

      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-10">

        <img src="/images/logo.png" className="h-14 w-13 rounded-full" />

        {/* CHANGE #1 — Smooth Width + Hidden Overflow */}
        <div
          className={`
            overflow-hidden transition-[width] duration-300
            ${collapsed ? "w-12" : "w-40"}  
          `}
        >
          {/* CHANGE #2 — Fade text (prevents glitch) */}
          <h1
            className={`
              text-xl font-bold whitespace-nowrap
              transition-opacity duration-200 delay-100
              ${collapsed ? "opacity-0" : "opacity-100"}
            `}
          >
            IntelliDocs
          </h1>
        </div>
      </div>

      {/* MENU */}
      <ul className="space-y-6">
        {menu.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-md transition
                  ${isActive ? "bg-white/10 text-white font-semibold" : "text-gray-300 hover:text-white"}
                `}
              >
                {/* Always visible icon */}
                <span className={`${isActive ? "text-white" : "text-gray-400"}`}>
                  {item.icon}
                </span>

                {/* CHANGE #3 — Animated width wrapper */}
                <div
                  className={`
                    overflow-hidden transition-[width] duration-300 
                    ${collapsed ? "w-0" : "w-40"}
                  `}
                >
                  <span
                    className={`
                      whitespace-nowrap transition-opacity duration-200 delay-100
                      ${collapsed ? "opacity-0" : "opacity-100"}
                    `}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}

        {/* LOGOUT */}
       {/* LOGOUT */}
{/* LOGOUT */}
<li className="pt-10 border-t border-white/20">
  <form action="/api/logout" method="POST">
    <button
      className={`
        relative flex items-center gap-3 py-2 rounded-md w-full text-left
        text-red-400 hover:text-red-600 transition pl-10
      `}
    >
      {/* Icon ALWAYS visible + fixed position */}
      <span className="absolute left-2 top-1/2 -translate-y-1/2">
        <FiLogOut size={20} />
      </span>

      {/* Text wrapper (animated) */}
      <div
        className={`
          overflow-hidden transition-[width] duration-300
          ${collapsed ? "w-0" : "w-32"}
        `}
      >
        <span
          className={`
            whitespace-nowrap transition-opacity duration-200 delay-100
            ${collapsed ? "opacity-0" : "opacity-100"}
          `}
        >
          Logout
        </span>
      </div>
    </button>
  </form>
</li>


      </ul>
    </div>
  );
}
