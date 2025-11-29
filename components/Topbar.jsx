"use client";

import WelcomeUser from "@/components/WelcomeUser";

export default function Topbar({ user }) {
  return (
    <div className="w-full h-full bg-black flex items-center justify-between px-6 bg-opacity-80 backdrop-blur-md shadow-sm">

      {/* Left Section — Welcome text flip */}
      <div className="flex items-center">
        <WelcomeUser name={user?.name} />
      </div>

      {/* Right Section — Logo only */}
     

    </div>
  );
}
