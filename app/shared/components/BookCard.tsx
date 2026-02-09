"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const BookCard = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCart().length);
    };

    updateCart();

    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);
  return (
    <Link href={`/checkoutCart`}>
      <div className="flex gap-2 w-12">
        <div className="relative">
        <ShoppingCart className="text-gray-600" />{" "}
        <span className="bg-primary text-white rounded-full h-5 w-5 text-center font-medium leading-5 absolute -top-2 -right-2">{cartCount}</span>

        </div>
      </div>
    </Link>
  );
};
