"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import DocumentCard from "@/components/documents/DocumentCard";
import RenameModal from "@/components/documents/RenameModal";

import {
  fetchDocuments,
  deleteDocument,
  renameDocument,
} from "@/lib/documents";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [renameDoc, setRenameDoc] = useState(null);
  const [newName, setNewName] = useState("");

  // Load docs
  useEffect(() => {
    async function load() {
      const data = await fetchDocuments();
      setDocuments(data.documents || []);
    }
    load();
  }, []);

  // DELETE
  async function handleDelete(id) {
    toast.promise(deleteDocument(id), {
      loading: "Deleting...",
      success: () => {
        setDocuments((prev) => prev.filter((d) => d._id !== id));
        return "Deleted!";
      },
      error: "Failed to delete",
    });
  }

  // RENAME
  async function handleRenameSave() {
    if (!renameDoc) return;

    const id = renameDoc._id;

    await renameDocument(id, newName);

    setDocuments((prev) =>
      prev.map((d) => (d._id === id ? { ...d, name: newName } : d))
    );

    toast.success("Renamed!");
    setRenameDoc(null);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl text-white font-bold mb-6">📄 My Documents</h1>

      {documents.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No documents uploaded yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {documents.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={doc}
              onRename={setRenameDoc}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* RENAME MODAL */}
      <RenameModal
        renameDoc={renameDoc}
        newName={newName}
        setNewName={setNewName}
        onCancel={() => setRenameDoc(null)}
        onSave={handleRenameSave}
      />
    </div>
  );
}
