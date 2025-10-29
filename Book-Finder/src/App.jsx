import React from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow-sm">
        <div className="container py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Book Finder</h1>
            <p className="text-sm text-slate-500">Search titles — beautiful UI with recent searches</p>
          </div>
          <div className="text-xs text-slate-400">Built with React + Tailwind</div>
        </div>
      </header>

      <main className="container py-8">
        <Home />
      </main>

      <footer className="container pb-8 text-sm text-slate-500">
        <hr className="mb-4" />
        <div className="flex items-center justify-between">
          <div>Data from Open Library</div>
          <div>© {new Date().getFullYear()} — Book Finder</div>
        </div>
      </footer>
    </div>
  );
}
