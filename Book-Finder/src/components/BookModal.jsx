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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 max-w-4xl w-full bg-white rounded-2xl overflow-auto shadow-2xl">
        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex items-start justify-center">
            <img src={cover} alt={book.title} className="w-44 h-64 object-cover rounded-lg" onError={(e)=> e.currentTarget.src="/placeholder-cover.png"} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{authors}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
              <div><strong>First published:</strong> {book.first_publish_year || "N/A"}</div>
              <div><strong>Edition count:</strong> {book.edition_count || "N/A"}</div>
              <div className="sm:col-span-2"><strong>Genres:</strong> {subjects}</div>
              <div className="sm:col-span-2"><strong>Publisher:</strong> {(book.publisher || []).slice(0,3).join(", ") || "N/A"}</div>
            </div>

            <div className="mt-6 flex gap-3">
              <a className="px-4 py-2 bg-brand-500 text-white rounded-lg" href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer">Open on OpenLibrary</a>
              <button onClick={onClose} className="px-4 py-2 border rounded-lg">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
