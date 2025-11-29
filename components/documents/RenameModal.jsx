"use client";

export default function RenameModal({
  renameDoc,
  newName,
  setNewName,
  onCancel,
  onSave
}) {
  if (!renameDoc) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Rename Document</h2>

        <input
          className="w-full p-2 border rounded mb-4"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
