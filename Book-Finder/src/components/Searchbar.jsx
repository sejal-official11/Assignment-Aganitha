import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <label htmlFor="search" className="sr-only">Search books</label>
      <div className="flex items-center gap-3">
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-3 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          className="px-3 py-2 bg-brand-500 text-white rounded hover:opacity-95 text-sm"
          onClick={() => {
            // focus triggers nothing since we debounce; clicking used only for style
            const el = document.getElementById("search");
            if (el) el.focus();
          }}
          aria-hidden
        >
          Search
        </button>
      </div>
    </div>
  );
}
