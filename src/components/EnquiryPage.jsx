import React, { useEffect, useState } from "react";
import { Check, Mail, Phone, Calendar, Users } from "lucide-react";

/* ======================================================
   MAIN PAGE
====================================================== */

const EnquiryPage = ({
  guestCount,
  cartTotal,
  perPersonCost,
  estimatedSavings,
  cart,
  clearCart,
  navigateTo,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    restaurantName: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
    eventType: "corporate",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- Keep guestCount in sync ---------- */
  useEffect(() => {
    // No-op, but ensures rerender if guestCount changes
  }, [guestCount]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Enquiry Submitted:", {
        ...formData,
        guests: guestCount,
        cart,
        totalCost: cartTotal,
        perPersonCost,
        estimatedSavings,
        timestamp: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      clearCart();

      setTimeout(() => {
        setSubmitSuccess(false);
        navigateTo("home");
      }, 5000);
    }, 1500);
  };

  const eventTypes = [
    { id: "corporate", label: "Corporate", icon: "🏢" },
    { id: "wedding", label: "Wedding", icon: "💒" },
    { id: "birthday", label: "Birthday", icon: "🎂" },
    { id: "festival", label: "Festival", icon: "🎉" },
    { id: "catering", label: "Catering", icon: "👨‍🍳" },
  ];

  if (submitSuccess) return <SuccessMessage />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Submit Your Enquiry
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Get a detailed quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* Cart Summary */}
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h2 className="mb-6 text-xl font-bold">Cart Summary</h2>

              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                <SummaryCard
                  icon={<Users size={22} />}
                  title="Guests"
                  value={guestCount.toLocaleString()}
                  subtitle="Total attendees"
                />
                <SummaryCard
                  icon="💰"
                  title="Total Cost"
                  value={`$${cartTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`}
                  subtitle="All guests"
                />
                <SummaryCard
                  icon="📊"
                  title="Per Person"
                  value={`$${perPersonCost.toFixed(2)}`}
                  subtitle="Avg cost"
                />
                <SummaryCard
                  icon="💸"
                  title="Savings"
                  value={`$${estimatedSavings.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`}
                  subtitle="Vs retail"
                  color="text-green-600"
                />
              </div>

              {/* Cart Items */}
              <div className="pt-4 space-y-3 border-t">
                {cart.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × {guestCount} ={" "}
                        {item.quantity * guestCount} units
                      </p>
                    </div>
                    <div className="font-bold text-amber-600">
                      $
                      {(item.mrp * item.quantity * guestCount).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h2 className="mb-6 text-xl font-bold">Contact Information</h2>

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormInput
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                  <FormInput
                    label="Organization *"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormInput
                    label="Email *"
                    name="email"
                    type="email"
                    icon={<Mail size={18} />}
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                  <FormInput
                    label="Phone *"
                    name="phone"
                    type="tel"
                    icon={<Phone size={18} />}
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>

                <FormInput
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  icon={<Calendar size={18} />}
                  value={formData.eventDate}
                  onChange={handleFormChange}
                />

                <FormTextarea
                  label="Additional Requirements"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => navigateTo("cart")}
                    className="flex-1 py-3 bg-gray-200 rounded-lg"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center justify-center flex-1 gap-2 py-3 text-white rounded-lg bg-gradient-to-r from-amber-500 to-orange-500"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    <Check size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 lg:sticky lg:top-6">
            <InfoCard />
            <GuestGuide />
            <SupportCard />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   SUPPORTING COMPONENTS (UNCHANGED)
====================================================== */

const SummaryCard = ({
  icon,
  title,
  value,
  subtitle,
  color = "text-gray-900",
}) => (
  <div className="p-4 rounded-lg bg-gray-50">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-500">{subtitle}</div>
  </div>
);

const FormInput = ({ label, icon, ...props }) => (
  <div>
    <label className="flex items-center gap-2 mb-1 font-medium">
      {icon}
      {label}
    </label>
    <input
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
      {...props}
    />
  </div>
);

const FormTextarea = ({ label, ...props }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <textarea
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
      {...props}
    />
  </div>
);

const InfoCard = () => (
  <div className="p-6 text-white bg-blue-600 rounded-xl">
    <h3 className="mb-4 font-bold">Why Choose Us?</h3>
    <ul className="space-y-2 text-sm">
      <li>✓ 24-hour quote response</li>
      <li>✓ Bulk discounts</li>
      <li>✓ Dedicated event manager</li>
      <li>✓ Flexible delivery</li>
    </ul>
  </div>
);

const GuestGuide = () => (
  <div className="p-6 bg-white shadow rounded-xl">
    <h3 className="mb-4 font-bold">Guest Count Guide</h3>
    <GuestLevel count="200–500" label="Small Events" price="Standard" />
    <GuestLevel count="500–1000" label="Medium" price="10% off" />
    <GuestLevel count="1000+" label="Large" price="Custom" />
  </div>
);

const GuestLevel = ({ count, label, price }) => (
  <div className="flex justify-between py-2">
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-xs text-gray-500">{count} guests</p>
    </div>
    <div className="font-semibold">{price}</div>
  </div>
);

const SupportCard = () => (
  <div className="p-6 border bg-amber-50 border-amber-200 rounded-xl">
    <h3 className="mb-2 font-bold">Need Help?</h3>
    <p className="text-sm">Call us directly:</p>
    <p className="text-xl font-bold text-center">+91 98765 43210</p>
  </div>
);

const SuccessMessage = () => (
  <div className="flex items-center justify-center min-h-screen bg-green-50">
    <div className="p-8 bg-white shadow rounded-xl">
      <Check size={48} className="mx-auto mb-4 text-green-600" />
      <h2 className="text-2xl font-bold text-green-800">Enquiry Submitted!</h2>
    </div>
  </div>
);

export default EnquiryPage;
