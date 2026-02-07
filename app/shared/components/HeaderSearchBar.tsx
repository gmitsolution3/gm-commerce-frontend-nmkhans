// components/HeaderSearchBar.tsx

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Phone } from "lucide-react"; // optional: lucide icons
import Link from "next/link";

export default function HeaderSearchBar({ categories, name, phone }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("Categories");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hotlineNumber = phone || "(12) 345 67895";

  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-4 w-full">
      {/* Search Bar */}
      <div className="mx-4">
        <div className="relative flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-72 px-4 py-2 text-gray-900 border bg-gray-100 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none rounded-l-2xl"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 min-w-40"
            >
              <span>{selectCategory ?? "Categories"}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 z-10 w-56 mt-2 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-1">
                  {categories.map((category: any, index: number) => (
                    <Link href={`/shop/${category._id}`}>
                      <button
                        key={index}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 font-semibold hover:cursor-pointer hover:text-white hover:bg-primary"
                        onClick={() => {
                          setIsOpen(false);
                          setSelectCategory(category.name);
                        }}
                      >
                        {category.name}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="px-3 py-2.5 text-gray-500 bg-gray-100 rounded-r-2xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:cursor-pointer hover:text-white border border-gray-300">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Call Us Now */}
      <div className="flex items-center space-x-2 ml-3 md:ml-8 lg:ml-11">
        <div className="p-3 rounded-full bg-gray-100">
          <a
            href={`tel:${hotlineNumber}`}
            aria-label={`Call our hotline at ${hotlineNumber}`}
          >
            <Phone className="w-5 h-5 text-primary" />
          </a>
        </div>
        <div className="text-sm md:text-lg font-medium text-gray-800">
          {`${name} Hotline`} <br />
          <a
            href={`tel:${hotlineNumber}`}
            aria-label={`Call our hotline at ${hotlineNumber}`}
          >
            <span className="text-primary">{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
