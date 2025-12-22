import React from "react";
import { Search, Filter, X } from "lucide-react";

const RecipeFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
  searchTerm,
  onSearchChange,
  allProducts,
  selectedProducts,
  onProductToggle,
}) => {
  return (
    <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <Filter size={24} className="text-amber-600" />
        <h3 className="text-xl font-bold text-gray-900">Filter Recipes</h3>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
            size={20}
          />
          <input
            type="text"
            placeholder="Search recipes by name or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="mb-3 font-semibold text-gray-700">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "All" ? "All Categories" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Filter */}
      <div className="mb-4">
        <h4 className="mb-3 font-semibold text-gray-700">Filter by Products</h4>
        <div className="flex flex-wrap gap-2">
          {allProducts.map((product) => {
            const isSelected = selectedProducts.includes(product);
            return (
              <button
                key={product}
                onClick={() => onProductToggle(product)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isSelected
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{product}</span>
                {isSelected && <X size={16} />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() =>
              onProductToggle(selectedProducts[selectedProducts.length - 1])
            }
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Clear last product
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() =>
              selectedProducts.forEach((product) => onProductToggle(product))
            }
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Clear all products
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeFilter;
