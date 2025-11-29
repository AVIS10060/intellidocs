"use client";

import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";

export default function DocumentCard({
  doc,
  onRename,
  onDelete
}) {
  return (
    <CometCard>
      <div className="w-72 my-4 flex flex-col items-stretch rounded-xl bg-[#1F2121] saturate-0 cursor-pointer">

        {/* Thumbnail */}
        <div className="relative aspect-[3/4] w-full p-2">
          <Image
            src="/images/pdf-thumbnail.png"
            alt="PDF Thumbnail"
            width={400}
            height={500}
            className="rounded-lg object-cover contrast-10"
          />
        </div>

        {/* Title + Size */}
        <div className="p-4 text-white flex items-center justify-between">
          <div className="text-sm truncate max-w-[70%]">{doc.name}</div>
          <div className="text-xs text-gray-300 opacity-70">
            {(doc.size / 1024).toFixed(1)} KB
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 flex justify-between">
          <a
            href={doc.url}
            target="_blank"
            className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
          >
            Open
          </a>

          <button
            onClick={() => onRename(doc)}
            className="px-3 py-1 bg-gray-600 rounded text-xs hover:bg-gray-700"
          >
            Rename
          </button>

          <button
            onClick={() => onDelete(doc._id)}
            className="px-3 py-1 bg-red-600 rounded text-xs hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </CometCard>
  );
}
