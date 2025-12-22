import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import { productsData } from "../data/products";
import { ShoppingBag } from "lucide-react";

const ProductList = ({ cart, addToCart, removeFromCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = useMemo(() => {
    const unique = [...new Set(productsData.map((p) => p.category))];
    return ["All", ...unique];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsData.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (
            parseFloat(a.price.match(/\d+/)[0]) -
            parseFloat(b.price.match(/\d+/)[0])
          );
        case "price-high":
          return (
            parseFloat(b.price.match(/\d+/)[0]) -
            parseFloat(a.price.match(/\d+/)[0])
          );
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const totalInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-10">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="inline-flex items-center justify-center mb-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500">
            <ShoppingBag size={26} className="text-white" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Netra&apos;s Product Range
          </h1>

          <p className="max-w-3xl mx-auto text-sm text-gray-600 sm:text-base lg:text-lg">
            Premium instant food products imported from India. Perfect for US
            restaurants, caterers, and event planners looking for authentic
            Indian flavors.
          </p>

          <div className="flex flex-col justify-center gap-3 mt-4 sm:flex-row">
            <div className="px-4 py-2 font-medium rounded-lg bg-amber-100 text-amber-800">
              Total Products: {productsData.length}
            </div>
            <div className="px-4 py-2 font-medium text-blue-800 bg-blue-100 rounded-lg">
              In Cart: {totalInCart} items
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Product Grid */}
        <div className="mt-6 sm:mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const cartItem = cart.find((i) => i.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onAdd={() => addToCart(product)}
                    onRemove={() => removeFromCart(product.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-white shadow-md sm:p-8 rounded-xl">
              <p className="mb-4 text-sm text-gray-600 sm:text-base">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setSortBy("name");
                }}
                className="w-full px-6 py-3 font-semibold text-white transition rounded-lg sm:w-auto bg-amber-600 hover:bg-amber-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 mt-10 text-white shadow-lg sm:mt-14 sm:p-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
          <h3 className="mb-6 text-lg font-bold text-center sm:text-xl lg:text-2xl">
            Why Choose Netra&apos;s Products?
          </h3>

          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            {[
              ["⚡", "Quick & Easy", "Ready in minutes with minimal effort"],
              ["👨‍🍳", "Chef-Quality", "Restaurant-grade taste at home"],
              ["🌿", "Natural Ingredients", "No artificial preservatives"],
            ].map(([icon, title, desc]) => (
              <div key={title}>
                <div className="mb-2 text-3xl">{icon}</div>
                <h4 className="mb-1 text-base font-bold sm:text-lg">{title}</h4>
                <p className="text-sm text-amber-100">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
