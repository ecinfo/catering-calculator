import React from "react";
import { ArrowRight } from "lucide-react";

const HomePage = ({ navigateTo }) => (
  <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
    <div className="max-w-4xl px-4 py-16 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Reduce Catering Costs by Importing from India
        </h1>
        <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
          US restaurants can significantly reduce their catering costs by
          sourcing premium ingredients directly from India. With our streamlined
          import process, you get authentic, high-quality products at prices
          30-40% lower than domestic suppliers. Calculate your potential savings
          today and discover how importing can transform your bottom line while
          maintaining the authentic flavors your customers love.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigateTo("products")}
          className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
        >
          Start Cost Calculation
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-amber-600">30-40%</div>
          <div className="text-gray-600">Cost Savings</div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-amber-600">Premium</div>
          <div className="text-gray-600">Quality Products</div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-amber-600">Direct</div>
          <div className="text-gray-600">From Source</div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
