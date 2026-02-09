import { ProductFormData } from "@/utils/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CardButtons } from "./cardButtons";
import ProductSingleCard from "@/app/components/ProductCard";

interface Product {
  products: ProductFormData[];
}

export const ProductCard = ({ products }: Product) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3">
      {products.map((pro: ProductFormData, index: number) => (
        <ProductSingleCard key={index} product={pro} />
      ))}
    </div>
  );
};
