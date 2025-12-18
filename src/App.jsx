import React, { useState } from "react";
import { ShoppingCart, ArrowRight, Check } from "lucide-react";

// Mock product data
const productsData = [
  {
    id: 1,
    name: "Basmati Rice",
    description: "Premium long-grain rice, ideal for pilafs and biryanis",
    price: 2.5,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Garam Masala Blend",
    description: "Authentic spice blend for curries and marinades",
    price: 8.99,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1596040033229-a0b3b4a7aa16?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Red Lentils",
    description: "Quick-cooking protein-rich lentils",
    price: 1.75,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1607623488235-e2a71e3e8cea?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Turmeric Powder",
    description: "Pure ground turmeric for flavor and color",
    price: 6.5,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Chickpeas (Garbanzo)",
    description: "Dried chickpeas perfect for curries and salads",
    price: 1.99,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1610031392374-1b6f0eb4f1e9?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Cardamom Pods",
    description: "Aromatic green cardamom for desserts and chai",
    price: 18.99,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1599909533439-545e30d05f80?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Coconut Oil",
    description: "Cold-pressed virgin coconut oil",
    price: 12.5,
    unit: "per gallon",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Curry Leaves (Dried)",
    description: "Aromatic curry leaves for authentic Indian flavor",
    price: 9.99,
    unit: "per lb",
    image:
      "https://images.unsplash.com/photo-1596040033229-a0b3b4a7aa16?w=400&h=300&fit=crop",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [guestCount, setGuestCount] = useState(200); // Changed to number
  const [formData, setFormData] = useState({
    name: "",
    restaurantName: "",
    email: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculate cart total with guest multiplier
  const parsedGuestCount = Math.max(1, guestCount);
  const cartTotal =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
    parsedGuestCount;

  const estimatedSavings = cartTotal * 0.35;
  const perPersonCost = cart.length > 0 ? cartTotal / parsedGuestCount : 0;

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setQuantities({ ...quantities, [product.id]: 1 });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.restaurantName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Enquiry Submitted:", {
      ...formData,
      cart,
      guestCount,
      totalCost: cartTotal,
      perPersonCost,
      estimatedSavings,
    });
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setCurrentPage("home");
      setCart([]);
      setFormData({ name: "", restaurantName: "", email: "", message: "" });
    }, 3000);
  };

  // Handle guest count change
  const handleGuestCountChange = (e) => {
    const value = e.target.value;
    // Allow empty string temporarily for better UX
    if (value === "") {
      setGuestCount(1);
    } else if (/^\d+$/.test(value)) {
      const numValue = parseInt(value, 10);
      if (numValue > 0) {
        setGuestCount(numValue);
      }
    }
  };

  // Handle blur to ensure minimum value
  const handleGuestCountBlur = () => {
    if (guestCount < 1) {
      setGuestCount(1);
    }
  };

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reduce Catering Costs by Importing from India
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            US restaurants can significantly reduce their catering costs by
            sourcing premium ingredients directly from India. With our
            streamlined import process, you get authentic, high-quality products
            at prices 30-40% lower than domestic suppliers. Calculate your
            potential savings today and discover how importing can transform
            your bottom line while maintaining the authentic flavors your
            customers love.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage("products")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg text-lg flex items-center gap-2 transition-colors"
          >
            Start Cost Calculation
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">30-40%</div>
            <div className="text-gray-600">Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">
              Premium
            </div>
            <div className="text-gray-600">Quality Products</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">Direct</div>
            <div className="text-gray-600">From Source</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Products Page
  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Available Products
            </h2>
            <p className="text-gray-600 mt-1">
              Select items and quantities per person
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <label className="text-sm text-gray-600 block mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                value={guestCount}
                onChange={handleGuestCountChange}
                onBlur={handleGuestCountBlur}
                className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center font-semibold text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setCurrentPage("cart")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors h-fit"
            >
              <ShoppingCart size={20} />
              Cart ({cart.length})
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-medium">
            💡 Tip: Enter quantities per person. Total cost will be calculated
            for {parsedGuestCount} guests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                  {product.unit}
                </div>
                <div className="text-sm text-amber-700 font-medium mb-4">
                  Per person × {parsedGuestCount} guests
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={quantities[product.id] || 1}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantities({
                        ...quantities,
                        [product.id]: Math.max(1, value),
                      });
                    }}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold text-lg
             focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />

                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Cart Page
  const CartPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Cost Calculator
            </h2>
            <p className="text-gray-600 mt-1">
              Calculating for {parsedGuestCount} guests
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <label className="text-sm text-gray-600 block mb-1">
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={handleGuestCountChange}
              onBlur={handleGuestCountBlur}
              className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center font-semibold text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => setCurrentPage("products")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border-b last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toFixed(2)} {item.unit}
                    </p>
                    <p className="text-amber-600 text-sm font-medium">
                      {item.quantity} × {parsedGuestCount} guests ={" "}
                      {(item.quantity * parsedGuestCount).toFixed(1)} units
                    </p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartQuantity(
                        item.id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="text-xl font-semibold text-gray-900 w-32 text-right">
                    $
                    {(item.price * item.quantity * parsedGuestCount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600 pb-2 border-b">
                  <span>Number of Guests:</span>
                  <span className="font-semibold text-gray-900">
                    {parsedGuestCount} people
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Total Cost:</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600">
                  <span>Cost Per Person:</span>
                  <span className="font-semibold">
                    ${perPersonCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg text-green-600">
                  <span>Estimated Savings (vs US suppliers):</span>
                  <span className="font-semibold">
                    -${estimatedSavings.toFixed(2)} (35%)
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-2xl font-bold">
                  <span>Final Total:</span>
                  <span className="text-amber-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 italic">
                * Estimated cost includes export and logistics buffer. Final
                pricing will be confirmed based on order volume and shipping
                requirements.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage("products")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setCurrentPage("enquiry")}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Enquire Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Enquiry Form Page
  const EnquiryPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Submit Your Enquiry
        </h2>
        <p className="text-gray-600 mb-8">
          We'll get back to you within 24 hours with a detailed quote.
        </p>

        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <Check size={48} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-green-700">
              We'll contact you shortly with a detailed quote.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
              <div className="font-semibold text-gray-900 mb-2">
                Your Cart Summary:
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Number of Guests:</div>
                  <div className="text-xl font-bold text-gray-900">
                    {parsedGuestCount} people
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Total Cost:</div>
                  <div className="text-xl font-bold text-amber-600">
                    ${cartTotal.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Cost Per Person:</div>
                  <div className="text-lg font-semibold text-blue-600">
                    ${perPersonCost.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Potential Savings:</div>
                  <div className="text-lg font-semibold text-green-600">
                    ${estimatedSavings.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Tell us about your requirements, delivery timeline, or any questions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setCurrentPage("cart")}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div
            onClick={() => setCurrentPage("home")}
            className="cursor-pointer"
          >
            <h1 className="text-2xl font-bold text-amber-600">IndiaImports</h1>
            <p className="text-sm text-gray-600">
              Cost Calculator for US Restaurants
            </p>
          </div>

          <nav className="flex gap-6">
            <button
              onClick={() => setCurrentPage("home")}
              className={`font-medium ${
                currentPage === "home"
                  ? "text-amber-600"
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("products")}
              className={`font-medium ${
                currentPage === "products"
                  ? "text-amber-600"
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentPage("cart")}
              className={`font-medium flex items-center gap-1 ${
                currentPage === "cart"
                  ? "text-amber-600"
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <ShoppingCart size={18} />
              Cart {cart.length > 0 && `(${cart.length})`}
            </button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === "home" && <HomePage />}
      {currentPage === "products" && <ProductsPage />}
      {currentPage === "cart" && <CartPage />}
      {currentPage === "enquiry" && <EnquiryPage />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 IndiaImports. Cost calculator for demonstration purposes.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            No payment processing. Enquiry-based system only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
