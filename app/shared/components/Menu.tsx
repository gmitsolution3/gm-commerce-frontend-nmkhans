"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setActiveCategory(id);
    setOpen(false);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "home";
    setActiveCategory(lastSegment);
  }, []);

  return (
    <div className="border-t border-gray-200 lg:py-3 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔹 Mobile Header */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <span className="font-semibold text-gray-800">Categories</span>
          <button
            onClick={() => setOpen(!open)}
            className={clsx(
              "transition-transform duration-300 p-2 rounded-lg hover:bg-gray-100",
              open && "rotate-90"
            )}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* 🔹 Menu Items */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out lg:overflow-visible",
            open
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100",
            "lg:opacity-100"
          )}
        >
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 px-2 py-2 lg:py-0">
            {/* All Products */}
            <Link href={`/`} className="group relative">
              <button
                onClick={() => handleClick("home")}
                className={clsx(
                  "w-full lg:w-auto text-left px-4 py-3 lg:py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap relative z-10 capitalize",
                  activeCategory === "home"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                Home
                {/* Animated underline */}
                <span className={clsx(
                  "absolute left-4 right-4 bottom-1 h-0.5 rounded-full transition-all duration-300 transform",
                  activeCategory === "home"
                    ? "w-[calc(100%-2rem)] bg-primary scale-100"
                    : "w-0 group-hover:w-[calc(100%-2rem)] bg-primary/50 group-hover:scale-100 scale-0"
                )} />
              </button>
            </Link>
            
            <Link href={`/shop/all`} className="group relative">
              <button
                onClick={() => handleClick("all")}
                className={clsx(
                  "w-full lg:w-auto text-left px-4 py-3 lg:py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap relative z-10 capitalize",
                  activeCategory === "all"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                All Product
                {/* Animated underline */}
                <span className={clsx(
                  "absolute left-4 right-4 bottom-1 h-0.5 rounded-full transition-all duration-300 transform",
                  activeCategory === "all"
                    ? "w-[calc(100%-2rem)] bg-primary scale-100"
                    : "w-0 group-hover:w-[calc(100%-2rem)] bg-primary/50 group-hover:scale-100 scale-0"
                )} />
              </button>
            </Link>

            {!categories || !categories.length ? (
              <div className="text-center text-primary text-2xl">
                No Category found
              </div>
            ) : (
              categories.map((category: any) => (
                <Link href={`/shop/${category._id}`} key={category._id} className="group relative">
                  <button
                    onClick={() => handleClick(category._id)}
                    className={clsx(
                      "w-full lg:w-auto text-left px-4 py-3 lg:py-2 text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap relative z-10 capitalize",
                      activeCategory === category._id
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    )}
                  >
                    {category.name}
                    {/* Animated underline */}
                    <span className={clsx(
                      "absolute left-4 right-4 bottom-1 h-0.5 rounded-full transition-all duration-300 transform",
                      activeCategory === category._id
                        ? "w-[calc(100%-2rem)] bg-primary scale-100"
                        : "w-0 group-hover:w-[calc(100%-2rem)] bg-primary/50 group-hover:scale-100 scale-0"
                    )} />
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};