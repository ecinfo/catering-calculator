import React from "react";
import { Search, Filter, SortAsc } from "lucide-react";

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="p-4 mb-8 transition-shadow duration-200 bg-white shadow-md rounded-2xl sm:p-6 hover:shadow-xl">
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-center">
        {/* Search - Full width on mobile, larger on desktop */}
        <div className="relative md:col-span-2 lg:col-span-6">
          <Search
            size={20}
            className="absolute text-gray-400 transition-colors -translate-y-1/2 pointer-events-none left-4 top-1/2"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pr-4 text-base transition-all duration-200 border border-gray-200 rounded-xl pl-11 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-gray-300 placeholder:text-gray-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 lg:col-span-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50">
            <Filter size={18} className="text-amber-600" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategorySelect(e.target.value)}
            className="w-full h-12 px-4 text-base transition-all duration-200 bg-white border border-gray-200 appearance-none cursor-pointer rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-gray-300"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 lg:col-span-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50">
            <SortAsc size={18} className="text-blue-600" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-12 px-4 text-base transition-all duration-200 bg-white border border-gray-200 appearance-none cursor-pointer rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "All" || searchTerm) && (
        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Active filters:
            </span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100">
                <Filter size={14} />
                {selectedCategory}
                <button
                  onClick={() => onCategorySelect("All")}
                  className="flex items-center justify-center w-5 h-5 transition-colors rounded-full hover:bg-amber-200"
                  aria-label="Remove category filter"
                >
                  ×
                </button>
              </span>
            )}

            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-200 rounded-lg bg-blue-50 hover:bg-blue-100">
                <Search size={14} />"{searchTerm}"
                <button
                  onClick={() => onSearchChange("")}
                  className="flex items-center justify-center w-5 h-5 transition-colors rounded-full hover:bg-blue-200"
                  aria-label="Clear search"
                >
                  ×
                </button>
              </span>
            )}

            {(selectedCategory !== "All" || searchTerm) && (
              <button
                onClick={() => {
                  onCategorySelect("All");
                  onSearchChange("");
                }}
                className="ml-auto text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
