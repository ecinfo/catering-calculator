import React from "react";
import {
  Clock,
  Users,
  ChefHat,
  ArrowLeft,
  ShoppingBag,
  TrendingDown,
} from "lucide-react";

const RecipeDetail = ({ recipe, onBack, onAddToCart }) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl px-4 py-6 mx-auto sm:py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-5 text-sm font-medium sm:text-base text-amber-600 hover:text-amber-700"
        >
          <ArrowLeft size={18} />
          Back to Recipes
        </button>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          {/* Hero */}
          <div className="relative h-56 sm:h-64 md:h-80 bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty}
                </span>
                <span className="px-3 py-1 text-xs rounded-full sm:text-sm bg-white/20 backdrop-blur">
                  {recipe.category}
                </span>
              </div>

              <h1 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                {recipe.name}
              </h1>
              <p className="text-sm sm:text-lg text-amber-100">
                {recipe.description}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
              <Stat
                icon={<Clock size={22} />}
                value={recipe.prepTime}
                label="Prep Time"
              />
              <Stat
                icon={<Users size={22} />}
                value={`${recipe.serves} people`}
                label="Serves"
              />
              <Stat
                icon={<ChefHat size={22} />}
                value={recipe.yieldPerPackage || "4–6 people"}
                label="Per Package"
              />
              <Stat
                icon={<TrendingDown size={22} className="text-green-600" />}
                value={recipe.estimatedSavings || "40% Savings"}
                label="vs Traditional"
                highlight
              />
            </div>

            {/* Required Products */}
            <div className="mb-8">
              <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Required Products
                </h2>
                <div className="text-base font-bold sm:text-lg text-amber-600">
                  {recipe.costPerPerson || "$2.99 per person"}
                </div>
              </div>

              <div className="space-y-3">
                {recipe.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 p-4 rounded-lg sm:flex-row sm:items-center sm:justify-between bg-amber-50"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag size={18} className="text-amber-600" />
                      <span className="font-semibold text-gray-900">
                        {product}
                      </span>
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg sm:w-auto bg-amber-600 hover:bg-amber-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients & Instructions */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                  Ingredients
                </h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  {(recipe.ingredients || []).map((ingredient, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-amber-600">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {(recipe.detailedInstructions || []).map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-amber-600 shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-gray-700 sm:text-base">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 mt-8 border border-blue-200 sm:p-6 bg-blue-50 rounded-xl">
              <h4 className="mb-2 font-bold text-blue-900">💡 Pro Tips</h4>
              <ul className="space-y-2 text-sm text-blue-800 sm:text-base">
                <li>• Adjust spice levels according to preference</li>
                <li>• For creamier texture, add fresh cream at the end</li>
                <li>• Garnish with fresh herbs before serving</li>
                <li>• Can be prepared in advance and reheated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Helper ---------- */
const Stat = ({ icon, value, label, highlight }) => (
  <div
    className={`p-4 text-center rounded-xl ${
      highlight ? "bg-green-50" : "bg-amber-50"
    }`}
  >
    <div className="mx-auto mb-2 text-amber-600">{icon}</div>
    <div
      className={`font-bold ${highlight ? "text-green-800" : "text-gray-900"}`}
    >
      {value}
    </div>
    <div
      className={`text-sm ${highlight ? "text-green-600" : "text-gray-600"}`}
    >
      {label}
    </div>
  </div>
);

export default RecipeDetail;
