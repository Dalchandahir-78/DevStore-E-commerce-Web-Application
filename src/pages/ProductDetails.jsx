import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails({
  wishlist,
  toggleWishlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="p-10 text-center">
        Loading product details...
      </p>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center">
        <p>{error || "Product not found."}</p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded bg-slate-900 px-5 py-2 text-white"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const isFavorite = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-slate-600 hover:text-black"
      >
        ← Go Back
      </button>

      <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-slate-50 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 capitalize text-cyan-700">
            {product.category}
          </p>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            {product.title}
          </h1>

          <p className="mb-4 text-slate-600">
            {product.description}
          </p>

          <p className="mb-3 text-3xl font-bold">
            ${product.price}
          </p>

          <p className="mb-6 text-slate-600">
            Rating: ⭐ {product.rating}
          </p>

          <button
            onClick={() => toggleWishlist(product)}
            className="rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
          >
            {isFavorite
              ? "♥ Remove from Wishlist"
              : "♡ Add to Wishlist"}
          </button>
        </div>
      </div>
    </main>
  );
}