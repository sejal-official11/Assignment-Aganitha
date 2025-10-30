import React, { useState } from "react";

function coverUrl(id) {
  return id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : "/placeholder-cover.png";
}

export default function BookCard({ book, onView }) {
  const [hover, setHover] = useState(false);
  const title = book.title || "Untitled";
  const authors = Array.isArray(book.author_name) ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || "N/A";
  const cover = coverUrl(book.cover_i);
  const genres = Array.isArray(book.subject) ? book.subject.slice(0, 3) : [];

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onView}
      className="relative bg-white rounded-xl p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e)=> { if (e.key === 'Enter') onView(); }}
    >
      <div className="h-48 rounded-md bg-slate-50 flex items-center justify-center overflow-hidden">
        <img src={cover} alt={title} className="max-h-full object-contain" onError={(e)=> e.currentTarget.src="/placeholder-cover.png"} />
      </div>

      <div className="mt-3">
        <div className="font-semibold text-sm leading-tight">{title}</div>
        <div className="text-xs text-slate-500 mt-1">{authors}</div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-400">Year: {year}</div>
        <div className="flex gap-2 items-center">
          {genres.map((g) => (
            <span key={g} className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{g}</span>
          ))}
        </div>
      </div>

      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => { e.stopPropagation(); alert('Favorite feature demo — I can add real favorites if you want') }}
          className="p-1 rounded-md bg-white/70 hover:bg-white text-slate-600"
          title="Favorite (demo)"
        >
          {hover ? (
            <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.3l-6.16 3.24 1.18-6.88L2 9.77l6.92-1.01L12 2.5l3.08 6.26L22 9.77l-5.02 3.89 1.18 6.88z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 17.3l-6.16 3.24 1.18-6.88L2 9.77l6.92-1.01L12 2.5l3.08 6.26L22 9.77l-5.02 3.89 1.18 6.88z" />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
