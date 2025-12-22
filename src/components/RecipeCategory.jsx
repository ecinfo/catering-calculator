import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCategory = ({ category, recipes, onViewRecipe }) => {
  // Add onViewRecipe prop
  const getCategoryIcon = (cat) => {
    const icons = {
      "Vegetarian Party Food": "🥘",
      "Vegetarian Low-Carb Food": "🥗",
      "Non-Vegetarian Low-Carb Food": "🍗",
      "Festival Food & Desserts": "🎉",
      "Vegetarian Comfort Food": "🏡",
      "Non-Vegetarian Party Food": "🎊",
    };
    return icons[cat] || "📖";
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{getCategoryIcon(category)}</span>
        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-amber-100 text-amber-800">
          {recipes.length} Recipes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewRecipe={onViewRecipe} // Pass prop down
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeCategory;
