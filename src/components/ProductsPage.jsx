import React from "react";
import { ShoppingCart } from "lucide-react";
import ProductCard from "./ProductCard";
import { productsData } from "../data/products";

const ProductsPage = ({
  cart,
  guestCount,
  handleGuestCountChange,
  handleGuestCountBlur,
  onAddToCart,
  navigateTo,
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Available Products
          </h2>
          <p className="mt-1 text-gray-600">
            Select items and quantities per person
          </p>
        </div>

        <div className="flex items-center gap-4">
          <GuestCounter
            guestCount={guestCount}
            onChange={handleGuestCountChange}
            onBlur={handleGuestCountBlur}
          />
          <button
            onClick={() => navigateTo("cart")}
            className="flex items-center gap-2 px-6 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700 h-fit"
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
          </button>
        </div>
      </div>

      <div className="p-4 mb-6 border rounded-lg bg-amber-50 border-amber-200">
        <p className="font-medium text-amber-800">
          💡 Tip: Enter quantities per person. Total cost will be calculated for{" "}
          {guestCount} guests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            guestCount={guestCount}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  </div>
);

const GuestCounter = ({ guestCount, onChange, onBlur }) => (
  <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
    <label className="block mb-1 text-sm text-gray-600">Number of Guests</label>
    <input
      type="number"
      min="1"
      value={guestCount}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className="w-24 px-3 py-1 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    />
  </div>
);

export default ProductsPage;
