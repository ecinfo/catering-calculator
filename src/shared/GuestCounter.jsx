import React from "react";

const GuestCounter = ({ guestCount, onChange, onBlur }) => (
  <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
    <label className="block mb-1 text-sm text-gray-600">Number of Guests</label>
    <input
      type="number"
      value={guestCount}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className="w-24 px-3 py-1 text-lg font-semibold text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    />
  </div>
);

export default GuestCounter;
