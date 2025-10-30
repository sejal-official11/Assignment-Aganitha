import React from "react";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                <span className="hero-gradient">Book Finder</span>
              </h1>
              <p className="mt-1 text-slate-500">Search books fast — beautiful UI + recent searches</p>
            </div>
            <div className="hidden md:block text-sm text-slate-400">React · Vite · Tailwind</div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="bg-white rounded-2xl p-6 card-shadow">
          <Home />
        </div>
      </main>

      <footer className="container py-6 text-sm text-slate-500">
        <div className="flex justify-between">
          <div>Data from Open Library</div>
          <div>© {new Date().getFullYear()} Book Finder</div>
        </div>
      </footer>
    </div>
  );
}
