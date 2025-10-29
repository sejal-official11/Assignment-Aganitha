import React, { useEffect } from "react";

export default function BookModal({ book, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cover = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "/placeholder-cover.png";
  const authors = Array.isArray(book.author_name) ? book.author_name.join(", ") : "Unknown";
  const subjects = Array.isArray(book.subject) ? book.subject.join(", ") : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-w-3xl w-full bg-white rounded shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 flex items-start justify-center">
            <img src={cover} alt={book.title} className="w-44 h-64 object-cover rounded" onError={(e)=> e.currentTarget.src="/placeholder-cover.png"} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{authors}</p>
            <div className="mt-3 text-sm text-slate-600 space-y-2">
              <div><strong>First published:</strong> {book.first_publish_year || "N/A"}</div>
              <div><strong>Edition count:</strong> {book.edition_count || "N/A"}</div>
              <div><strong>Subjects / Genres:</strong> {subjects}</div>
              <div><strong>Publisher:</strong> {(book.publisher || []).slice(0,3).join(", ") || "N/A"}</div>
            </div>

            <div className="mt-4 flex gap-3">
              <a className="px-3 py-2 bg-brand-500 text-white rounded" href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer">Open on OpenLibrary</a>
              <button onClick={onClose} className="px-3 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
