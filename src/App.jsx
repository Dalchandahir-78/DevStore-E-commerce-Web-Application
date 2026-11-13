
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

export default function App() {
  const [wishlist, setWishlist] = useState([]);

  function toggleWishlist(product) {
    setWishlist((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previous, product];
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar wishlistCount={wishlist.length} />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Products
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="*"
            element={
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}