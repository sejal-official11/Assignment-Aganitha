import React from "react";

export default function RecentSearches({ items = [], onClick, onClear }) {
  if (!items || items.length === 0) {
    return <div className="text-sm text-slate-500">No recent searches yet.</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-600">Last {items.length}</div>
        <button onClick={onClear} className="text-xs text-slate-400 hover:underline">Clear</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <button
            key={t}
            onClick={() => onClick(t)}
            className="text-sm px-3 py-1 bg-slate-100 rounded hover:bg-slate-200"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
