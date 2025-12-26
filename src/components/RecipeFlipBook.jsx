import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import RecipeCard from "./RecipeCard";
import { recipesData } from "../data/recipes";

const RecipeBook = ({ onViewRecipe }) => {
  const bookRef = useRef(null);

  return (
    <div className="flex justify-center px-4 py-10">
      <HTMLFlipBook
        ref={bookRef}
        width={360}
        height={540}
        size="stretch"
        minWidth={320}
        maxWidth={420}
        minHeight={500}
        maxHeight={600}
        maxShadowOpacity={0.4}
        showCover={false}
        mobileScrollSupport
        className="shadow-2xl"
      >
        {recipesData.map((recipe, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-3 bg-white"
          >
            <RecipeCard recipe={recipe} onViewRecipe={onViewRecipe} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default RecipeBook;
