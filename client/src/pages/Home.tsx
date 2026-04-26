import { type JSX } from "react";
import { Link } from "react-router-dom";

export default function HomePage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">

      {/* --- Navigation Bar --- */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            {/* Simple SVG Logo Placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              TaskMaster
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-slate-600 transition hover:text-primary">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md"
            >
              Sign up free
            </Link>
          </nav>
        </div>
      </header>

      {/* --- Main Hero Section --- */}
      <main className="flex flex-1 items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Manage your team's work, <span className="text-primary">seamlessly.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
            The ultimate productivity dashboard for modern teams. Assign tasks, track employee progress, and hit your deadlines faster than ever before.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-primary-600 hover:shadow-xl sm:w-auto"
            >
              Go to Dashboard
            </Link>
            <a
              href="#features"
              className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
            >
              Learn more
            </a>
          </div>

          {/* Optional: Little trust badge area */}
          <p className="mt-10 text-sm font-medium text-slate-500">
            Trusted by over 10,000+ engineering teams worldwide.
          </p>
        </div>
      </main>

    </div>
  );
}
