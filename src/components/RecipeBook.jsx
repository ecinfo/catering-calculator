import React, { useState, useMemo } from "react";
import RecipeCategory from "./RecipeCategory";
import RecipeFilter from "./RecipeFilter";
import { recipesData } from "../data/recipes";

const RecipeBook = ({ onViewRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  /* -----------------------------
     Derived Data
  ----------------------------- */

  const categories = useMemo(() => {
    const unique = [...new Set(recipesData.map((recipe) => recipe.category))];
    return ["All", ...unique];
  }, []);

  const allProducts = useMemo(() => {
    const set = new Set();
    recipesData.forEach((recipe) => recipe.products.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipesData.filter((recipe) => {
      if (selectedCategory !== "All" && recipe.category !== selectedCategory) {
        return false;
      }

      if (
        searchTerm &&
        !recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (selectedProducts.length > 0) {
        const recipeProducts = recipe.products.map((p) => p.toLowerCase());
        const hasProduct = selectedProducts.some((product) =>
          recipeProducts.includes(product.toLowerCase())
        );
        if (!hasProduct) return false;
      }

      return true;
    });
  }, [selectedCategory, searchTerm, selectedProducts]);

  const recipesByCategory = useMemo(() => {
    const grouped = {};
    filteredRecipes.forEach((recipe) => {
      if (!grouped[recipe.category]) {
        grouped[recipe.category] = [];
      }
      grouped[recipe.category].push(recipe);
    });
    return grouped;
  }, [filteredRecipes]);

  const handleProductToggle = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  /* -----------------------------
     Render
  ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 sm:py-8">
        {/* Hero */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Netra&apos;s Recipe Collection
          </h1>
          <p className="max-w-3xl mx-auto text-sm text-gray-600 sm:text-base md:text-lg">
            Discover delicious recipes made easy with Netra&apos;s instant
            products. Filter by category, ingredients, or search for your
            favorite dishes.
          </p>
        </div>

        {/* Filters */}
        <RecipeFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          allProducts={allProducts}
          selectedProducts={selectedProducts}
          onProductToggle={handleProductToggle}
        />

        {/* Results */}
        <div className="mt-6 sm:mt-8">
          {Object.keys(recipesByCategory).length > 0 ? (
            Object.entries(recipesByCategory).map(([category, recipes]) => (
              <RecipeCategory
                key={category}
                category={category}
                recipes={recipes}
                onViewRecipe={onViewRecipe}
              />
            ))
          ) : (
            <div className="p-6 text-center bg-white shadow-md sm:p-8 rounded-xl">
              <p className="mb-4 text-sm text-gray-600 sm:text-lg">
                No recipes found matching your criteria. Try different filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setSelectedProducts([]);
                }}
                className="w-full px-6 py-3 font-semibold text-white transition-colors rounded-lg sm:w-auto bg-amber-600 hover:bg-amber-700"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="p-5 mt-10 bg-white border shadow-lg sm:mt-12 sm:p-6 border-amber-200 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-amber-100 shrink-0">
              <span className="text-xl font-bold text-amber-600">💡</span>
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                Recipe Tips
              </h3>
              <p className="text-sm text-gray-600 sm:text-base">
                Each recipe uses Netra&apos;s instant products. Simply follow
                the package instructions and combine as shown in the recipes for
                authentic taste in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBook;
