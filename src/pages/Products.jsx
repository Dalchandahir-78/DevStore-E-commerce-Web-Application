import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products({
  wishlist,
  toggleWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Products load nahi ho paye.");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <p className="p-10 text-center text-lg">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-slate-900 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Discover Products
        </h1>

        <p className="mt-2 text-slate-500">
          Explore products with DevStore.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-white p-3 outline-none focus:border-cyan-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border bg-white p-3"
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-5 text-slate-600">
        Showing {filteredProducts.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="py-10 text-center">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isFavorite = wishlist.some(
              (item) => item.id === product.id
            );

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  className="flex h-52 w-full items-center justify-center bg-white p-5"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </button>

                <div className="p-4">
                  <p className="mb-2 text-xs capitalize text-slate-500">
                    {product.category}
                  </p>

                  <h2 className="mb-2 line-clamp-2 font-semibold">
                    {product.title}
                  </h2>

                  <p className="mb-4 text-xl font-bold text-slate-900">
                    ${product.price}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/product/${product.id}`)
                      }
                      className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      aria-label={
                        isFavorite
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="rounded-lg border px-3 py-2 text-lg hover:bg-slate-100"
                    >
                      {isFavorite ? "♥" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}