"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function WelcomeUser({ name }) {
  return (
    <div className="text-3xl font-bold">
      <ContainerTextFlip words={["Welcome", name]} />
    </div>
  );
}
