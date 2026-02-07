import React, { useState } from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { handleWhatsApp } from "./../(public)/shop/components/handleWhatsApp";
import { createPortal } from "react-dom";
import ProductVariant from "./../(public)/shop/components/ProductVariants";

const ProductCard = ({ product }: { product: any }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const from = "cardButton";

  const productPrice =
    product.discount.type === "percentage"
      ? Math.floor(
          Number(product.basePrice) -
            (Number(product.basePrice) *
              Number(product.discount.value)) /
              100,
        )
      : Math.max(
          Number(product.basePrice) - Number(product.discount.value),
          0,
        );

  const { title, slug, thumbnail } = product;

  const productDetails = {
    productPrice,
    title,
    slug,
    thumbnail,
  };

  const calculatePrice = () => {
    const base = parseInt(product.basePrice);
    if (product.discount.type === "flat") {
      return base - parseInt(product.discount.value);
    } else if (product.discount.type === "percentage") {
      return base - (base * parseInt(product.discount.value)) / 100;
    }
    return base;
  };

  const getDiscountLabel = () => {
    if (product.discount.type === "flat") {
      return `-৳${product.discount.value}`;
    } else if (product.discount.type === "percentage") {
      return `-${product.discount.value}%`;
    }
    return "";
  };

  const discountedPrice = calculatePrice();
  const hasDiscount = parseInt(product.discount.value) > 0;

  const handleAddToCart = () => {
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const handleBuyNow = () => {
    setIsCartModalOpen(true);
    setIsBuyNow(true);
  };

  return (
    <div className="group bg-white w-80 overflow-hidden hover:shadow-lg transition-all duration-300 relative border border-gray-200">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded">
              {getDiscountLabel()}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {product.stockQuantity <= 10 && (
          <div className="absolute top-3 right-3 z-20">
            <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
              Only {product.stockQuantity} left
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover"
          />
          
          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              onClick={handleBuyNow}
              className="bg-primary text-white p-3 hover:bg-primary/90 transition-colors shadow-md"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 transition-colors shadow-md ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              title="Add to Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="bg-green-500 text-white p-3 hover:bg-green-600 transition-colors shadow-md"
              title="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button - Slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white border-t border-gray-200 text-gray-900 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-medium text-base mb-3 line-clamp-2 leading-snug min-h-[2.5rem] hover:text-primary transition-colors cursor-pointer">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ৳{discountedPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.basePrice}
            </span>
          )}
        </div>

        {/* Buy Now Button - Always visible */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-primary text-white py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors duration-300"
        >
          Order Now
        </button>
      </div>

      {isCartModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl leading-none"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-2">
                Product added to cart
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {product.title}
              </p>
              <div>
                <ProductVariant
                  variants={product.variants}
                  from={from}
                  productDetails={productDetails}
                  onCloseModal={closeModal}
                  isBuyNow={isBuyNow}
                  product={product}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ProductCard;