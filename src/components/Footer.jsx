import React from "react";
import { ChefHat, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ChefHat size={32} className="text-amber-400" />
              <div>
                <h2 className="text-2xl font-bold">Netra's Kitchen</h2>
                <p className="text-sm text-gray-400">
                  Instant Culinary Delights
                </p>
              </div>
            </div>
            <p className="text-gray-400">
              Bringing authentic flavors to your kitchen with our premium
              instant food products.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#recipes"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Recipe Book
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#popular"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Popular Recipes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Products</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#curry-pastes"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Curry Pastes
                </a>
              </li>
              <li>
                <a
                  href="#instant-meals"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Instant Meals
                </a>
              </li>
              <li>
                <a
                  href="#desserts"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Desserts
                </a>
              </li>
              <li>
                <a
                  href="#breakfast"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                >
                  Breakfast
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>contact@netrakitchen.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-gray-700">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Netra's Kitchen. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Made with ❤️ for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
