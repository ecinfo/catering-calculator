import React from "react";
import CartItem from "./CartItem";
import { ShoppingCart, ArrowRight, Users } from "lucide-react";

const CartPage = ({
  cart,
  guestCount,
  parsedGuestCount,
  cartTotal,
  perPersonCost,
  estimatedSavings,
  handleGuestCountChange,
  handleGuestCountBlur,
  updateCartQuantity,
  removeFromCart,
  navigateTo,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Cost Calculator
            </h2>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Calculating for {parsedGuestCount} guests
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Guest Count */}
            <div className="px-4 py-3 bg-white border border-gray-200 shadow-sm sm:px-6 rounded-xl">
              <label className="block mb-2 text-sm text-gray-600">
                <Users size={14} className="inline mr-2" />
                Number of Guests
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => handleGuestCountChange(e.target.value)}
                  onBlur={handleGuestCountBlur}
                  className="w-full px-4 py-2 text-lg font-bold text-center border border-gray-300 rounded-lg sm:w-32 sm:text-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="text-xs text-gray-500 sm:text-sm">
                  {guestCount >= 3000
                    ? "Large Event (3000+)"
                    : guestCount >= 1000
                    ? "Big Event (1000+)"
                    : guestCount >= 500
                    ? "Medium Event (500+)"
                    : guestCount >= 200
                    ? "Small Event (200+)"
                    : "Small Gathering"}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="px-4 py-3 bg-white border border-gray-200 shadow-sm sm:px-6 rounded-xl">
              <div className="mb-1 text-sm text-gray-600">Cart Summary</div>
              <div className="text-lg font-bold text-amber-600">
                {totalItems} items
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <EmptyCart navigateTo={navigateTo} />
        ) : (
          <>
            {/* Cart Items */}
            <div className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  guestCount={parsedGuestCount}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            {/* Summary */}
            <CartSummary
              guestCount={parsedGuestCount}
              cartTotal={cartTotal}
              perPersonCost={perPersonCost}
              estimatedSavings={estimatedSavings}
              totalItems={totalItems}
            />

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <button
                onClick={() => navigateTo("products")}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-4 text-base font-semibold text-gray-800 transition bg-gray-200 sm:text-lg hover:bg-gray-300 rounded-xl"
              >
                <ShoppingCart size={20} />
                Continue Shopping
              </button>

              <button
                onClick={() => navigateTo("enquiry")}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-4 text-base font-semibold text-white transition shadow-lg sm:text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl hover:shadow-xl"
              >
                Proceed to Enquiry
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Bulk Info */}
            <div className="p-4 mt-8 border border-blue-200 sm:p-6 bg-blue-50 rounded-xl">
              <h3 className="mb-3 text-base font-bold text-blue-900 sm:text-lg">
                💡 Bulk Order Benefits
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  ["200+ Guests", "5% Additional Discount"],
                  ["500+ Guests", "10% Additional Discount"],
                  ["3000+ Guests", "Custom Pricing & Support"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="p-4 text-center bg-white rounded-lg"
                  >
                    <div className="text-xl font-bold text-blue-600 sm:text-2xl">
                      {title}
                    </div>
                    <div className="text-xs text-gray-600 sm:text-sm">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- Empty Cart ---------- */

const EmptyCart = ({ navigateTo }) => (
  <div className="p-8 text-center bg-white shadow-lg sm:p-12 rounded-xl">
    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full sm:w-24 sm:h-24 bg-amber-100">
      <ShoppingCart size={40} className="text-amber-600" />
    </div>
    <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
      Your cart is empty
    </h3>
    <p className="max-w-md mx-auto mb-6 text-sm text-gray-600 sm:text-base">
      Add products from our catalog to calculate costs for your event
    </p>
    <button
      onClick={() => navigateTo("products")}
      className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-white transition rounded-lg sm:text-lg bg-amber-600 hover:bg-amber-700"
    >
      Browse Products
      <ArrowRight size={20} />
    </button>
  </div>
);

/* ---------- Summary ---------- */

const CartSummary = ({
  guestCount,
  cartTotal,
  perPersonCost,
  estimatedSavings,
  totalItems,
}) => (
  <div
    className="p-4 mt-6 text-white shadow-lg sm:p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl"
  >
    <h3 className="mb-6 text-xl font-bold sm:text-2xl">Cost Summary</h3>

    <div className="space-y-4">
      <div className="flex justify-between pb-3 border-b border-white/20">
        <div>
          <div className="text-sm opacity-90">Guests</div>
          <div className="text-lg font-bold">{guestCount.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-90">Items</div>
          <div className="text-lg font-bold">{totalItems}</div>
        </div>
      </div>

      <div className="flex justify-between text-base sm:text-lg">
        <span>Total Product Cost</span>
        <span className="font-bold">${cartTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm opacity-90">
        <span>Cost Per Person</span>
        <span className="font-semibold">${perPersonCost.toFixed(2)}</span>
      </div>

      <div
        className="flex justify-between px-4 py-3 -mx-4 text-base sm:px-6 sm:-mx-6 bg-white/10 sm:text-lg"
      >
        <span>Estimated Savings</span>
        <span className="font-bold text-green-300">
          -${estimatedSavings.toFixed(2)} (35%)
        </span>
      </div>

      <div
        className="flex justify-between pt-4 text-xl font-bold border-t sm:text-2xl border-white/20"
      >
        <span>Final Total</span>
        <span className="text-yellow-300">${cartTotal.toFixed(2)}</span>
      </div>
    </div>

    <p className="mt-6 text-xs italic sm:text-sm opacity-90">
      * Prices exclude shipping. Bulk discounts applied automatically. For
      events with 3000+ guests, contact us for custom pricing.
    </p>
  </div>
);

export default CartPage;
