"use client";

export async function fetchDocuments() {
  const res = await fetch("/api/documents", { cache: "no-store" });
  return res.json();
}

export async function deleteDocument(id) {
  return fetch(`/api/documents/${id}/delete`, { method: "DELETE" });
}

export async function renameDocument(id, newName) {
  return fetch(`/api/documents/${id}/rename`, {
    method: "PUT",
    body: JSON.stringify({ newName }),
    headers: { "Content-Type": "application/json" },
  });
}
