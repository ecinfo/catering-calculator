import React from "react";
import { Clock, Users, ChefHat, ShoppingBag, Eye } from "lucide-react";

const RecipeCard = ({ recipe, onViewRecipe }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-2xl md:hover:-translate-y-1">
      <div className="flex flex-col h-full p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl">
            {recipe.name}
          </h3>
          <span
            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 sm:text-base line-clamp-2">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center mb-4 text-sm text-gray-500 gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>Serves {recipe.serves}</span>
          </div>
        </div>

        {/* Products */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag size={16} className="text-amber-600" />
            <span className="text-sm font-semibold text-gray-700">
              Required Products
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recipe.products.map((product, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs border rounded-full bg-amber-50 text-amber-700 border-amber-200"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 pt-4 mt-auto border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ChefHat size={16} />
            <span className="font-medium">{recipe.category}</span>
          </div>

          {onViewRecipe && (
            <button
              onClick={() => onViewRecipe(recipe)}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700 sm:w-auto"
            >
              <Eye size={16} />
              View Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
