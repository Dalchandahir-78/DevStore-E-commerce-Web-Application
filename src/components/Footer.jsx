
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">

        {/* Brand */}
        <div>
          <Link
            to="/"
            className="inline-block text-2xl font-bold"
          >
            DevStore
            <span className="text-cyan-400">.</span>
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
            Explore products, discover details, and save
            your favorite items in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <Link
                to="/"
                className="transition hover:text-cyan-400"
              >
                Home / Products
              </Link>
            </li>

            <li>
              <Link
                to="/wishlist"
                className="transition hover:text-cyan-400"
              >
                My Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Project Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            About Project
          </h3>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>Built with React.js</li>
            <li>Styled with Tailwind CSS</li>
            <li>Powered by DummyJSON API</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-700 px-5 py-5 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} DC Engineer. All rights reserved.
      </div>
    </footer>
  );
}