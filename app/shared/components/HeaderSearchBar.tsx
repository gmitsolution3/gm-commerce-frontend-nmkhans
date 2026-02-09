// components/HeaderSearchBar.tsx

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Phone } from "lucide-react"; // optional: lucide icons
import Link from "next/link";

export default function HeaderSearchBar({
  categories,
  name,
  phone,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] =
    useState<string>("Categories");

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
      <div className="flex items-center space-x-3 ml-3 md:ml-8 lg:ml-11 group">
        <a
          href="tel:${hotlineNumber}"
          aria-label="Call our hotline at ${hotlineNumber}"
          className="flex items-center justify-center p-2.5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
        >
          <svg
            className="w-4.5 h-4.5 text-gray-600 group-hover:text-primary transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </a>

        <div className="leading-tight">
          <div className="text-xs text-gray-500 font-medium tracking-tight mb-0.5">
            {name} Support
          </div>
          <a
            href={`tel:${hotlineNumber}`}
            aria-label={`Call our hotline at ${hotlineNumber}`}
            className="text-sm md:text-base font-medium text-gray-900 hover:text-primary transition-colors duration-200"
          >
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
