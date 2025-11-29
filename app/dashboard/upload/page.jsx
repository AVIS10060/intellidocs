"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setUploadedUrl(data.url);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setUploading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Document</h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded shadow-md max-w-lg"
      >
        <label className="block mb-3 font-medium">Select File</label>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="mb-4"
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* If upload success */}
      {uploadedUrl && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="font-medium text-green-700">Uploaded Successfully!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
}
