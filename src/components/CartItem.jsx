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
    <div className="flex flex-col items-start gap-4 p-6 transition-colors border-b border-gray-100 sm:flex-row sm:items-center hover:bg-gray-50 group">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <button
            onClick={onRemove}
            className="p-2 text-gray-400 transition-colors hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="px-3 py-1 font-medium rounded-full bg-amber-100 text-amber-800">
            ${unitPrice.toFixed(2)} per pack
          </div>
          <div className="text-gray-500">
            {item.weight} • {item.category}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>

            <div className="text-center min-w-12">
              <div className="text-xl font-bold text-gray-900">
                {item.quantity}
              </div>
              <div className="text-xs text-gray-500">packs</div>
            </div>

            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>

            <div className="ml-4 text-gray-600">
              × {guestCount.toLocaleString()} guests ={" "}
              <span className="font-semibold text-amber-600">
                {(item.quantity * guestCount).toLocaleString()} total units
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              $
              {totalForGuests.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-gray-500">
              ${(unitPrice * item.quantity).toFixed(2)} × {guestCount} guests
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
