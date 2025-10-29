import React, { useEffect, useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";
import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

const RECENT_KEY = "bf_recent_searches_v1";

export default function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 450);
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    // fetch only when debounced query changes and is non-empty
    if (!debouncedQuery) {
      setBooks([]);
      setNumFound(0);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    (async () => {
      try {
        const resp = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(debouncedQuery)}&page=1`,
          { signal: controller.signal }
        );
        if (!resp.ok) throw new Error("API error " + resp.status);
        const data = await resp.json();
        setBooks(Array.isArray(data.docs) ? data.docs : []);
        setNumFound(data.numFound || 0);

        // update recent searches (keep unique, maintain order, max 8)
        setRecent((prev) => {
          const q = debouncedQuery.trim();
          if (!q) return prev;
          const without = prev.filter((x) => x.toLowerCase() !== q.toLowerCase());
          return [q, ...without].slice(0, 8);
        });
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery]);

  function handleRecentClick(term) {
    setQuery(term);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SearchBar value={query} onChange={setQuery} placeholder="Search books by title..." />
          <div className="mt-4">
            {loading && (
              <div className="p-6 bg-white rounded shadow text-center text-slate-500">Loading…</div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded">Error: {error}</div>
            )}

            {!loading && !error && debouncedQuery && books.length === 0 && (
              <div className="p-6 bg-white rounded text-center text-slate-500">No results found.</div>
            )}

            {!debouncedQuery && (
              <div className="p-6 bg-white rounded text-center text-slate-500">
                Try searching for a title, e.g. <strong>harry potter</strong>
              </div>
            )}

            {books.length > 0 && (
              <>
                <div className="mt-4 mb-2 text-sm text-slate-500">
                  Showing {Math.min(books.length, 100)} results — total found: {numFound}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.slice(0, 30).map((b) => (
                    <BookCard key={b.key} book={b} onView={() => setSelected(b)} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium mb-2">Recent searches</h3>
            <RecentSearches items={recent} onClick={handleRecentClick} onClear={() => setRecent([])} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium mb-2">Tips</h3>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>Search by book title (try "pride and prejudice").</li>
              <li>Click a card to view more details.</li>
              <li>Genres are taken from the Open Library `subject` field when available.</li>
            </ul>
          </div>
        </aside>
      </div>

      {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
