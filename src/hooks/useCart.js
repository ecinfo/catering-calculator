import { useState, useMemo, useEffect } from "react";

/* ---------- Helpers ---------- */

const getUnitPrice = (item) => {
  let price = item.mrp || 0;

  if (item.bulkDiscount && item.quantity >= 10 && item.bulkPrices) {
    if (item.quantity >= 100) price = item.bulkPrices["100+"] ?? price;
    else if (item.quantity >= 50) price = item.bulkPrices["50-99"] ?? price;
    else if (item.quantity >= 10) price = item.bulkPrices["10-49"] ?? price;
  }

  return price;
};

const getDiscountRate = (guestCount) => {
  if (guestCount >= 3000) return 0.15;
  if (guestCount >= 500) return 0.1;
  if (guestCount >= 200) return 0.05;
  return 0;
};

/* ---------- Hook ---------- */

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [guestCount, setGuestCount] = useState("200");

  /* ---------- Load from storage ---------- */
  useEffect(() => {
    const savedCart = localStorage.getItem("netraCart");
    const savedGuestCount = localStorage.getItem("netraGuestCount");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedGuestCount) setGuestCount(savedGuestCount);
  }, []);

  /* ---------- Save to storage ---------- */
  useEffect(() => {
    localStorage.setItem("netraCart", JSON.stringify(cart));
    localStorage.setItem("netraGuestCount", guestCount);
  }, [cart, guestCount]);

  /* ---------- Guest Count ---------- */

  const parsedGuestCount = useMemo(
    () => Math.max(1, Number(guestCount) || 1),
    [guestCount]
  );

  const handleGuestCountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setGuestCount(value);
  };

  const handleGuestCountBlur = () => {
    if (!guestCount || Number(guestCount) < 1) {
      setGuestCount("1");
    }
  };

  /* ---------- Totals ---------- */

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const unitPrice = getUnitPrice(item);
      return sum + unitPrice * item.quantity * parsedGuestCount;
    }, 0);
  }, [cart, parsedGuestCount]);

  const discountRate = useMemo(
    () => getDiscountRate(parsedGuestCount),
    [parsedGuestCount]
  );

  const estimatedSavings = useMemo(
    () => subtotal * discountRate,
    [subtotal, discountRate]
  );

  const finalTotal = useMemo(
    () => Math.max(subtotal - estimatedSavings, 0),
    [subtotal, estimatedSavings]
  );

  const perPersonCost = useMemo(
    () => (parsedGuestCount > 0 ? finalTotal / parsedGuestCount : 0),
    [finalTotal, parsedGuestCount]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  /* ---------- Cart Actions ---------- */

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  /* ---------- Export ---------- */

  return {
    cart,

    /* Totals */
    subtotal, // before discount
    estimatedSavings,
    finalTotal, // ✅ payable
    perPersonCost,

    /* Guests */
    guestCount,
    parsedGuestCount,

    /* Meta */
    totalItems,

    /* Actions */
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    handleGuestCountChange,
    handleGuestCountBlur,
    setGuestCount,
  };
};
