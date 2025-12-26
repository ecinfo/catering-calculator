import RecipeFlipBook from "./RecipeFlipBook";

const recipes = [
  {
    name: "Pasta Alfredo",
    difficulty: "Easy",
    description: "Creamy Italian pasta with garlic and parmesan.",
    prepTime: "25 mins",
    serves: 2,
    category: "Italian",
    products: ["Pasta", "Cream", "Parmesan"],
  },
  {
    name: "Butter Chicken",
    difficulty: "Medium",
    description: "Rich and creamy Indian curry.",
    prepTime: "45 mins",
    serves: 4,
    category: "Indian",
    products: ["Chicken", "Butter", "Tomato"],
  },
];

export default function RecipesPage() {
  const handleViewRecipe = (recipe) => {
    console.log("View recipe:", recipe);
  };

  return (
    <div className="py-10">
      <RecipeFlipBook recipes={recipes} onViewRecipe={handleViewRecipe} />
    </div>
  );
}
