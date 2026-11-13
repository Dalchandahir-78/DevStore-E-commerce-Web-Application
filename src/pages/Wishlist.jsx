import { useNavigate } from "react-router-dom";

export default function Wishlist({
  wishlist,
  toggleWishlist,
}) {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-2 text-3xl font-bold">
        My Wishlist ♥
      </h1>

      <p className="mb-8 text-slate-500">
        Your saved products: {wishlist.length}
      </p>

      {wishlist.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="mb-5 text-lg">
            Your wishlist is empty.
          </p>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-slate-900 px-5 py-3 text-white"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <button
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
                className="mb-4 h-44 w-full"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </button>

              <h2 className="mb-2 font-semibold">
                {product.title}
              </h2>

              <p className="mb-4 text-lg font-bold">
                ${product.price}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                >
                  Details
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="rounded-lg border px-3 py-2 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}