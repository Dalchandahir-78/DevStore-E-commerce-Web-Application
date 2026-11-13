import { Link, NavLink } from "react-router-dom";

export default function Navbar({ wishlistCount }) {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-2xl font-bold">
        
          DevStore<span className="text-cyan-400">.</span>
        </Link>

        <div className="flex items-center gap-5">
          <NavLink to="/" className="hover:text-cyan-400">
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className="hover:text-cyan-400"
          >
            Wishlist ({wishlistCount})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}