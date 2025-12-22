import React from "react";
import { Package, Users, Weight, Plus, Minus } from "lucide-react";

const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  const extractPrice = (priceString) => {
    if (!priceString) return 0;

    // Remove currency symbols and non-numeric characters except dot
    const numeric = priceString.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(numeric);

    return isNaN(parsed) ? 0 : parsed;
  };

  console.log("Product price string:", product.price);
  const price = extractPrice(product.price);
  console.log("Extracted price:", price);

  return (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />

        {/* Category */}
        <div className="absolute px-3 py-1 text-xs font-medium text-gray-800 rounded-full top-3 left-3 bg-white/90 backdrop-blur">
          {product.category}
        </div>

        {/* Price Badge */}
        <div className="absolute px-3 py-1 text-sm font-bold text-white rounded-full shadow-lg top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500">
          {product.price}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight text-gray-900">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{product.servings}</span>
          </div>

          <div className="flex items-center gap-2">
            <Weight size={16} />
            <span>{product.weight}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package size={16} />
            <span>${price.toFixed(2)} per pack</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            {quantity > 0 ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onRemove}
                  className="flex items-center justify-center text-red-600 rounded-lg w-9 h-9 bg-red-50 hover:bg-red-100"
                >
                  <Minus size={18} />
                </button>

                <span className="w-6 font-semibold text-center text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={onAdd}
                  className="flex items-center justify-center text-green-600 rounded-lg w-9 h-9 bg-green-50 hover:bg-green-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-amber-600 hover:bg-amber-700"
              >
                Add to Cart
              </button>
            )}

            {/* Total */}
            <div className="text-right">
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-lg font-bold text-gray-900">
                <span>${price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
