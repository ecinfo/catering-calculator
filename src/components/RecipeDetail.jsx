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
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 font-medium text-amber-600 hover:text-amber-700"
        >
          <ArrowLeft size={20} />
          Back to Recipes
        </button>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          {/* Recipe Header */}
          <div className="relative h-64 md:h-80 bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                  {recipe.category}
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                {recipe.name}
              </h1>
              <p className="text-lg text-amber-100">{recipe.description}</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
              <div className="p-4 text-center bg-amber-50 rounded-xl">
                <Clock className="mx-auto mb-2 text-amber-600" size={24} />
                <div className="font-bold text-gray-900">{recipe.prepTime}</div>
                <div className="text-sm text-gray-600">Prep Time</div>
              </div>
              <div className="p-4 text-center bg-amber-50 rounded-xl">
                <Users className="mx-auto mb-2 text-amber-600" size={24} />
                <div className="font-bold text-gray-900">
                  {recipe.serves} people
                </div>
                <div className="text-sm text-gray-600">Serves</div>
              </div>
              <div className="p-4 text-center bg-amber-50 rounded-xl">
                <ChefHat className="mx-auto mb-2 text-amber-600" size={24} />
                <div className="font-bold text-gray-900">
                  {recipe.yieldPerPackage || "4-6 people"}
                </div>
                <div className="text-sm text-gray-600">Per Package</div>
              </div>
              <div className="p-4 text-center bg-green-50 rounded-xl">
                <TrendingDown
                  className="mx-auto mb-2 text-green-600"
                  size={24}
                />
                <div className="font-bold text-green-800">
                  {recipe.estimatedSavings || "40% Savings"}
                </div>
                <div className="text-sm text-green-600">vs Traditional</div>
              </div>
            </div>

            {/* Required Products */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Required Products
                </h2>
                <div className="text-lg font-bold text-amber-600">
                  {recipe.costPerPerson || "$2.99 per person"}
                </div>
              </div>
              <div className="space-y-3">
                {recipe.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg bg-amber-50"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag size={20} className="text-amber-600" />
                      <span className="font-semibold text-gray-900">
                        {product}
                      </span>
                    </div>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-amber-600 hover:bg-amber-700"
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
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {(recipe.ingredients || []).map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 text-amber-600">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {(recipe.detailedInstructions || []).map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white rounded-full bg-amber-600">
                        {idx + 1}
                      </div>
                      <p className="pt-1 text-gray-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tips */}
            <div className="p-6 mt-8 border border-blue-200 bg-blue-50 rounded-xl">
              <h4 className="mb-2 font-bold text-blue-900">💡 Pro Tips</h4>
              <ul className="space-y-2 text-blue-800">
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

export default RecipeDetail;
