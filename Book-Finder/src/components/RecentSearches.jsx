import React from "react";

export default function RecentSearches({ items = [], onClick, onClear }) {
  if (!items || items.length === 0) {
    return <div className="text-sm text-slate-500">No recent searches yet.</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-600">Recent</div>
        <button onClick={onClear} className="text-xs text-slate-400 hover:underline">Clear</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <button
            key={t}
            onClick={() => onClick(t)}
            className="text-sm px-3 py-1 bg-white/70 hover:bg-white rounded-full shadow-sm text-slate-700"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
