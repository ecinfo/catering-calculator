import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCategory = ({ category, recipes, onViewRecipe }) => {
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
    <section className="mb-10 sm:mb-12">
      {/* Category Header */}
      <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
        <span className="text-2xl sm:text-3xl">
          {getCategoryIcon(category)}
        </span>

        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {category}
        </h2>

        <span className="px-3 py-1 text-xs font-semibold rounded-full sm:text-sm bg-amber-100 text-amber-800">
          {recipes.length} Recipes
        </span>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </div>
    </section>
  );
};

export default RecipeCategory;
