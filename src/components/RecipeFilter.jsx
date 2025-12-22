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
    <div className="p-4 mb-6 bg-white shadow-lg sm:p-6 sm:mb-8 rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <Filter size={22} className="text-amber-600" />
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          Filter Recipes
        </h3>
      </div>

      {/* Search */}
      <div className="mb-5 sm:mb-6">
        <div className="relative">
          <Search
            className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2"
            size={18}
          />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-3 pr-10 text-sm border border-gray-300 rounded-lg pl-11 sm:text-base focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-5 sm:mb-6">
        <h4 className="mb-3 text-sm font-semibold text-gray-700 sm:text-base">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors
                ${
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

      {/* Products */}
      <div className="mb-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-700 sm:text-base">
          Filter by Products
        </h4>
        <div className="flex flex-wrap gap-2">
          {allProducts.map((product) => {
            const isSelected = selectedProducts.includes(product);
            return (
              <button
                key={product}
                onClick={() => onProductToggle(product)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors
                  flex items-center gap-2
                  ${
                    isSelected
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {product}
                </span>
                {isSelected && <X size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Actions */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
          <button
            onClick={() =>
              onProductToggle(selectedProducts[selectedProducts.length - 1])
            }
            className="font-medium text-amber-600 hover:text-amber-700"
          >
            Clear last product
          </button>
          <span className="hidden text-gray-400 sm:inline">|</span>
          <button
            onClick={() =>
              selectedProducts.forEach((product) => onProductToggle(product))
            }
            className="font-medium text-amber-600 hover:text-amber-700"
          >
            Clear all products
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeFilter;
