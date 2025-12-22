import React from "react";
import { ChefHat, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 sm:py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <ChefHat size={30} className="text-amber-400" />
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Netra&apos;s Kitchen
                </h2>
                <p className="text-xs text-gray-400 sm:text-sm">
                  Instant Culinary Delights
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm text-gray-400 sm:text-base">
              Bringing authentic flavors to your kitchen with our premium
              instant food products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                ["#recipes", "Recipe Book"],
                ["#products", "All Products"],
                ["#categories", "Categories"],
                ["#popular", "Popular Recipes"],
              ].map(([href, label]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Products
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                ["#curry-pastes", "Curry Pastes"],
                ["#instant-meals", "Instant Meals"],
                ["#desserts", "Desserts"],
                ["#breakfast", "Breakfast"],
              ].map(([href, label]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:text-lg">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={16} />
                <span>contact@netrakitchen.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-8 text-center border-t border-gray-700">
          <p className="text-sm text-gray-400 sm:text-base">
            © {new Date().getFullYear()} Netra&apos;s Kitchen. All rights
            reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
