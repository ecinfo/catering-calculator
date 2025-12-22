import React, { useState } from "react";
import {
  ChefHat,
  ShoppingBag,
  BookOpen,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const NavButton = ({
  page,
  icon: Icon,
  label,
  currentPage,
  navigateTo,
  setMenuOpen,
  cartCount,
}) => (
  <button
    onClick={() => {
      navigateTo(page);
      setMenuOpen(false);
    }}
    className={`flex items-center gap-2 w-full md:w-auto font-medium px-4 py-3 md:py-2 rounded-lg transition-all
      ${
        currentPage === page
          ? "bg-white text-amber-700 shadow-md"
          : "hover:bg-amber-700"
      }`}
  >
    <Icon size={20} />
    <span>{label}</span>

    {page === "cart" && cartCount > 0 && (
      <span className="px-2 py-1 ml-auto text-xs font-bold bg-white rounded-full md:ml-0 text-amber-600">
        {cartCount}
      </span>
    )}
  </button>
);

const Header = ({ currentPage, navigateTo, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 text-white shadow-lg bg-gradient-to-r from-amber-600 to-orange-600">
      <div className="px-4 py-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigateTo("recipes")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <ChefHat size={32} />
            <div className="leading-tight">
              <h1 className="text-xl font-bold md:text-2xl">
                Netra&apos;s Kitchen
              </h1>
              <p className="text-xs md:text-sm text-amber-100">
                Instant Recipes & Products
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="items-center hidden gap-3 md:flex">
            <NavButton
              page="recipes"
              icon={BookOpen}
              label="Recipe Book"
              currentPage={currentPage}
              navigateTo={navigateTo}
              setMenuOpen={setMenuOpen}
              cartCount={cartCount}
            />
            <NavButton
              page="products"
              icon={ShoppingBag}
              label="Products"
              currentPage={currentPage}
              navigateTo={navigateTo}
              setMenuOpen={setMenuOpen}
              cartCount={cartCount}
            />
            <NavButton
              page="cart"
              icon={ShoppingCart}
              label="Cart"
              currentPage={currentPage}
              navigateTo={navigateTo}
              setMenuOpen={setMenuOpen}
              cartCount={cartCount}
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 transition rounded-lg md:hidden hover:bg-amber-700"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 overflow-hidden shadow-lg md:hidden bg-amber-700/90 backdrop-blur rounded-xl">
            <div className="flex flex-col divide-y divide-amber-600">
              <NavButton
                page="recipes"
                icon={BookOpen}
                label="Recipe Book"
                currentPage={currentPage}
                navigateTo={navigateTo}
                setMenuOpen={setMenuOpen}
                cartCount={cartCount}
              />
              <NavButton
                page="products"
                icon={ShoppingBag}
                label="Products"
                currentPage={currentPage}
                navigateTo={navigateTo}
                setMenuOpen={setMenuOpen}
                cartCount={cartCount}
              />
              <NavButton
                page="cart"
                icon={ShoppingCart}
                label="Cart"
                currentPage={currentPage}
                navigateTo={navigateTo}
                setMenuOpen={setMenuOpen}
                cartCount={cartCount}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
