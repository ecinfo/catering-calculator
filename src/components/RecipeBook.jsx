import React, { useState, useMemo } from "react";
import RecipeCategory from "./RecipeCategory";
import RecipeFilter from "./RecipeFilter";
import { recipesData } from "../data/recipes";

const RecipeBook = ({ onViewRecipe }) => {
  // Add onViewRecipe prop
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(recipesData.map((recipe) => recipe.category)),
    ];
    return ["All", ...uniqueCategories];
  }, []);

  // Get all unique products from recipes
  const allProducts = useMemo(() => {
    const productSet = new Set();
    recipesData.forEach((recipe) => {
      recipe.products.forEach((product) => productSet.add(product));
    });
    return Array.from(productSet).sort();
  }, []);

  // Filter recipes based on selected criteria
  const filteredRecipes = useMemo(() => {
    return recipesData.filter((recipe) => {
      // Category filter
      if (selectedCategory !== "All" && recipe.category !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (
        searchTerm &&
        !recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Product filter
      if (selectedProducts.length > 0) {
        const recipeProducts = recipe.products.map((p) => p.toLowerCase());
        const hasSelectedProduct = selectedProducts.some((product) =>
          recipeProducts.includes(product.toLowerCase())
        );
        if (!hasSelectedProduct) return false;
      }

      return true;
    });
  }, [selectedCategory, searchTerm, selectedProducts]);

  // Group filtered recipes by category
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
    setSelectedProducts((prev) => {
      if (prev.includes(product)) {
        return prev.filter((p) => p !== product);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Netra's Recipe Collection
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Discover delicious recipes made easy with Netra's instant products.
            Filter by category, ingredients, or search for your favorite dishes.
          </p>
        </div>

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

        <div className="mt-8">
          {Object.keys(recipesByCategory).length > 0 ? (
            Object.entries(recipesByCategory).map(([category, recipes]) => (
              <RecipeCategory
                key={category}
                category={category}
                recipes={recipes}
                onViewRecipe={onViewRecipe} // Pass prop down
              />
            ))
          ) : (
            <div className="p-8 text-center bg-white shadow-md rounded-xl">
              <p className="mb-4 text-lg text-gray-600">
                No recipes found matching your criteria. Try different filters!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setSelectedProducts([]);
                }}
                className="px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        <div className="p-6 mt-12 bg-white border shadow-lg rounded-xl border-amber-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-amber-100">
              <span className="text-xl font-bold text-amber-600">💡</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recipe Tips</h3>
              <p className="text-gray-600">
                Each recipe uses Netra's instant products. Simply follow package
                instructions and combine as shown in recipes for authentic taste
                in minutes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBook;
