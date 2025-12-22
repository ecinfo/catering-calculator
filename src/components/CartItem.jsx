import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ item, guestCount, onUpdateQuantity, onRemove }) => {
  const calculateUnitPrice = () => {
    let unitPrice = item.mrp || 0;

    if (item.bulkDiscount && item.quantity >= 10) {
      if (item.quantity >= 100) {
        unitPrice = item.bulkPrices["100+"] || unitPrice;
      } else if (item.quantity >= 50) {
        unitPrice = item.bulkPrices["50-99"] || unitPrice;
      } else if (item.quantity >= 10) {
        unitPrice = item.bulkPrices["10-49"] || unitPrice;
      }
    }

    return unitPrice;
  };

  const unitPrice = calculateUnitPrice();
  const totalForGuests = unitPrice * item.quantity * guestCount;

  return (
    <div className="flex flex-col gap-4 p-4 transition border-b border-gray-100 sm:p-6 hover:bg-gray-50">
      {/* Top Row */}
      <div className="flex items-start w-full gap-4">
        {/* Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate sm:text-lg">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm line-clamp-2">
                {item.description}
              </p>
            </div>

            <button
              onClick={onRemove}
              className="p-2 text-gray-400 transition rounded-full hover:text-red-600 hover:bg-red-50"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-600 sm:text-sm">
            <span className="px-3 py-1 font-medium rounded-full bg-amber-100 text-amber-800">
              ${unitPrice.toFixed(2)} per pack
            </span>
            <span className="text-gray-500">
              {item.weight} • {item.category}
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Price */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Quantity */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>

          <div className="min-w-[48px] text-center">
            <div className="text-lg font-bold text-gray-900 sm:text-xl">
              {item.quantity}
            </div>
            <div className="text-xs text-gray-500">packs</div>
          </div>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>

          <div className="text-xs text-gray-600 sm:text-sm sm:ml-4">
            × {guestCount.toLocaleString()} guests ={" "}
            <span className="font-semibold text-amber-600">
              {(item.quantity * guestCount).toLocaleString()} units
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-left sm:text-right">
          <div className="text-xl font-bold text-gray-900 sm:text-2xl">
            $
            {totalForGuests.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs text-gray-500 sm:text-sm">
            ${(unitPrice * item.quantity).toFixed(2)} × {guestCount} guests
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
