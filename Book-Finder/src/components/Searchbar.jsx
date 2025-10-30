import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="bg-linear-to-r from-white/60 to-white/50 p-4 rounded-lg shadow-sm">
      <label htmlFor="search" className="sr-only">Search books</label>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm flex-1">
          <svg className="w-5 h-5 text-slate-400 ml-1" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <input
            id="search"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => {
              const el = document.getElementById("search");
              if (el) el.focus();
            }}
            className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 shadow hover:opacity-95"
          >
            Search
          </button>
          <button
            onClick={() => onChange("")}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 shadow hover:opacity-95"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-slate-400">Press Enter or wait — search runs after you finish typing.</div>
    </div>
  );
}
