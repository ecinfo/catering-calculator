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
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Cost Calculator
            </h2>
            <p className="mt-1 text-gray-600">
              Calculating for {parsedGuestCount} guests
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-xl">
              <label className="block mb-2 text-sm text-gray-600">
                <Users size={16} className="inline mr-2" />
                Number of Guests
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={guestCount}
                  onChange={(e) => handleGuestCountChange(e.target.value)}
                  onBlur={handleGuestCountBlur}
                  className="w-32 px-4 py-2 text-xl font-bold text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="text-sm text-gray-500">
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

            <div className="px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="mb-2 text-sm text-gray-600">Cart Summary</div>
              <div className="text-lg font-bold text-amber-600">
                {totalItems} items
              </div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <EmptyCart navigateTo={navigateTo} />
        ) : (
          <>
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

            <CartSummary
              guestCount={parsedGuestCount}
              cartTotal={cartTotal}
              perPersonCost={perPersonCost}
              estimatedSavings={estimatedSavings}
              totalItems={totalItems}
            />

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <button
                onClick={() => navigateTo("products")}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-4 text-lg font-semibold text-gray-800 transition-colors bg-gray-200 hover:bg-gray-300 rounded-xl"
              >
                <ShoppingCart size={20} />
                Continue Shopping
              </button>
              <button
                onClick={() => navigateTo("enquiry")}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-4 text-lg font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl hover:shadow-xl"
              >
                Proceed to Enquiry
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Bulk Pricing Info */}
            <div className="p-6 mt-8 border border-blue-200 bg-blue-50 rounded-xl">
              <h3 className="mb-3 text-lg font-bold text-blue-900">
                💡 Bulk Order Benefits
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 text-center bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    200+ Guests
                  </div>
                  <div className="text-sm text-gray-600">
                    5% Additional Discount
                  </div>
                </div>
                <div className="p-4 text-center bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    500+ Guests
                  </div>
                  <div className="text-sm text-gray-600">
                    10% Additional Discount
                  </div>
                </div>
                <div className="p-4 text-center bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    3000+ Guests
                  </div>
                  <div className="text-sm text-gray-600">
                    Custom Pricing & Support
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const EmptyCart = ({ navigateTo }) => (
  <div className="p-12 text-center bg-white shadow-lg rounded-xl">
    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100">
      <ShoppingCart size={48} className="text-amber-600" />
    </div>
    <h3 className="mb-3 text-2xl font-bold text-gray-900">
      Your cart is empty
    </h3>
    <p className="max-w-md mx-auto mb-6 text-gray-600">
      Add products from our catalog to calculate costs for your event
    </p>
    <button
      onClick={() => navigateTo("products")}
      className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
    >
      Browse Products
      <ArrowRight size={20} />
    </button>
  </div>
);

const CartSummary = ({
  guestCount,
  cartTotal,
  perPersonCost,
  estimatedSavings,
  totalItems,
}) => (
  <div className="p-6 text-white shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
    <h3 className="mb-6 text-2xl font-bold">Cost Summary</h3>

    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/20">
        <div>
          <div className="text-sm opacity-90">Number of Guests</div>
          <div className="text-lg font-bold">
            {guestCount.toLocaleString()} people
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-90">Total Items</div>
          <div className="text-lg font-bold">{totalItems} units</div>
        </div>
      </div>

      <div className="flex justify-between text-lg">
        <span>Total Product Cost:</span>
        <span className="font-bold">${cartTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm opacity-90">
        <span>Cost Per Person:</span>
        <span className="font-semibold">${perPersonCost.toFixed(2)}</span>
      </div>

      <div className="flex justify-between px-6 py-3 -mx-6 text-lg bg-white/10">
        <span>Estimated Savings (vs retail):</span>
        <span className="font-bold text-green-300">
          -${estimatedSavings.toFixed(2)} (35%)
        </span>
      </div>

      <div className="flex justify-between pt-4 text-2xl font-bold border-t border-white/20">
        <span>Final Total:</span>
        <span className="text-yellow-300">${cartTotal.toFixed(2)}</span>
      </div>
    </div>

    <div className="mt-6 text-sm italic opacity-90">
      * Prices exclude shipping. Bulk discounts automatically applied. For
      events with 3000+ guests, contact us for special pricing and dedicated
      support.
    </div>
  </div>
);

export default CartPage;
