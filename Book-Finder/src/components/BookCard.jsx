import React from "react";

function coverUrl(id) {
  return id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : "/placeholder-cover.png";
}

export default function BookCard({ book, onView }) {
  const title = book.title || "Untitled";
  const authors = Array.isArray(book.author_name) ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || "N/A";
  const cover = coverUrl(book.cover_i);
  const genres = Array.isArray(book.subject) ? book.subject.slice(0, 3) : [];

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer flex flex-col" onClick={onView}>
      <div className="h-48 bg-slate-50 flex items-center justify-center rounded">
        <img src={cover} alt={title} className="max-h-full object-contain" onError={(e)=> e.currentTarget.src="/placeholder-cover.png"} />
      </div>

      <div className="mt-3 flex-1">
        <div className="font-semibold text-sm line-clamp-2">{title}</div>
        <div className="text-xs text-slate-500 mt-1">{authors}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-400">Year: {year}</div>
        <div className="flex gap-1">
          {genres.map((g) => (
            <span key={g} className="text-xs bg-slate-100 px-2 py-0.5 rounded">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
