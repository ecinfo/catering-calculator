import React from "react";
import {
  ChefHat,
  ShoppingBag,
  BookOpen,
  Home,
  ShoppingCart,
} from "lucide-react";

const Header = ({ currentPage, navigateTo, cartCount }) => (
  <header className="sticky top-0 z-50 text-white shadow-lg bg-gradient-to-r from-amber-600 to-orange-600">
    <div className="px-4 py-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div
          onClick={() => navigateTo("recipes")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ChefHat size={32} />
          <div>
            <h1 className="text-2xl font-bold">Netra's Kitchen</h1>
            <p className="text-sm text-amber-100">Instant Recipes & Products</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigateTo("recipes")}
            className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-all ${
              currentPage === "recipes"
                ? "bg-white text-amber-700 shadow-lg"
                : "hover:bg-amber-700"
            }`}
          >
            <BookOpen size={20} />
            Recipe Book
          </button>
          <button
            onClick={() => navigateTo("products")}
            className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-all ${
              currentPage === "products"
                ? "bg-white text-amber-700 shadow-lg"
                : "hover:bg-amber-700"
            }`}
          >
            <ShoppingBag size={20} />
            Products
          </button>
          <button
            onClick={() => navigateTo("cart")}
            className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-all ${
              currentPage === "cart"
                ? "bg-white text-amber-700 shadow-lg"
                : "hover:bg-amber-700"
            }`}
          >
            <ShoppingCart size={20} />
            Cart
            {cartCount > 0 && (
              <span className="px-2 py-1 text-xs font-bold bg-white rounded-full text-amber-600">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
