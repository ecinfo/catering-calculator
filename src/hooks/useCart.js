import { useState, useMemo, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [guestCount, setGuestCount] = useState(200);
  const [cartItems, setCartItems] = useState({});

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("netraCart");
    const savedGuestCount = localStorage.getItem("netraGuestCount");
    const savedCartItems = localStorage.getItem("netraCartItems");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedGuestCount) setGuestCount(JSON.parse(savedGuestCount));
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("netraCart", JSON.stringify(cart));
    localStorage.setItem("netraGuestCount", JSON.stringify(guestCount));
    localStorage.setItem("netraCartItems", JSON.stringify(cartItems));
  }, [cart, guestCount, cartItems]);

  const parsedGuestCount = Math.max(1, guestCount);

  // Calculate totals with bulk pricing
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const basePrice = item.mrp || 0;
      let unitPrice = basePrice;

      // Apply bulk discount if applicable
      if (item.bulkDiscount && item.quantity >= 10) {
        const quantity = item.quantity;
        if (quantity >= 100) {
          unitPrice = item.bulkPrices["100+"] || basePrice;
        } else if (quantity >= 50) {
          unitPrice = item.bulkPrices["50-99"] || basePrice;
        } else if (quantity >= 10) {
          unitPrice = item.bulkPrices["10-49"] || basePrice;
        }
      }

      return sum + unitPrice * item.quantity;
    }, 0);
  }, [cart]);

  const estimatedSavings = useMemo(() => cartTotal * 0.35, [cartTotal]);
  const perPersonCost = useMemo(() => {
    return cart.length > 0 ? cartTotal / parsedGuestCount : 0;
  }, [cart, cartTotal, parsedGuestCount]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...currentCart, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((currentCart) =>
        currentCart.filter((item) => item.id !== productId)
      );
    } else {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleGuestCountChange = (value) => {
    if (value === "") {
      setGuestCount(1);
    } else if (/^\d+$/.test(value)) {
      const numValue = parseInt(value, 10);
      if (numValue > 0) {
        setGuestCount(numValue);
      }
    }
  };

  const handleGuestCountBlur = () => {
    if (guestCount < 1) {
      setGuestCount(1);
    }
  };

  // Calculate total items in cart
  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    cartTotal,
    guestCount,
    parsedGuestCount,
    estimatedSavings,
    perPersonCost,
    totalItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setGuestCount,
    handleGuestCountChange,
    handleGuestCountBlur,
  };
};
