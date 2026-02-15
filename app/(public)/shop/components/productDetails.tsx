import { ProductFormData } from "@/utils/product";
import React from "react";
import ProductVariants from "./ProductVariants";
import ProductImage from "./productImage";
import YouTubeVideoPlayer from "./youtubeVideoPlayer";
import {
  Star,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
} from "lucide-react";

interface ProductDetailsProps {
  product: ProductFormData;
}

export const ProductDetail = ({ product }: ProductDetailsProps) => {
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

  const originalPrice = Number(product.basePrice);
  const discountPercentage =
    product.discount.type === "percentage"
      ? product.discount.value
      : Math.round(
          (Number(product.discount.value) / originalPrice) * 100,
        );

  const { title, slug, thumbnail } = product;
  const productDetails = { productPrice, title, slug, thumbnail };
  const cleanHTML = product.description.replace(/<p>\s*<\/p>/g, "");
  const from = "productDetails";

  // Calculate rating (mock data - you would typically get this from your backend)
  const rating = 4.5;
  const reviewCount = 128;
  const stockStatus =
    Number(product.stockQuantity) > 0 ? "In stock" : "Out of stock";
  const stockClass =
    Number(product.stockQuantity) > 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="bg-white">
      {/* Product Header with Breadcrumb */}
      <div className="border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-500">
            Home / Products / {product.category} /{" "}
            <span className="text-gray-900 font-medium">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div className="max-w-full md:max-w-80 w-full mx-auto">
            <ProductImage
              thumbnail={product.thumbnail}
              gallery={product.gallery}
              title={product.title}
            />

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">
                  On orders over $50
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-gray-500">
                  Money back guarantee
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-sm font-medium">2-Year Warranty</p>
                <p className="text-xs text-gray-500">
                  Quality assurance
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Product Title and Rating */}
            <div className="mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">
                  {reviewCount} reviews
                </span>
                <span className="text-gray-400">|</span>
                <span className={`font-medium ${stockClass}`}>
                  {stockStatus}
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-6 text-lg">
              {product.shortDescription}
            </p>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${productPrice.toFixed(2)}
                </span>
                {Number(product.discount.value) > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Variants */}
            <div className="mb-8 w-full">
              <ProductVariants
                variants={product.variants}
                product={product}
                from={from}
                productDetails={productDetails}
              />
            </div>

            {/* Additional Info */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    Secure payment
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    Free shipping over $50
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    30-day return policy
                  </span>
                </div>
              </div>
            </div>

            {/* SKU and Categories */}
            <div className="text-sm text-gray-500">
              <div className="flex gap-4">
                <span>
                  SKU:{" "}
                  <span className="text-gray-700">
                    {product.sku || "N/A"}
                  </span>
                </span>
                <span>
                  Category:{" "}
                  <span className="text-gray-700">
                    {product.category}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Product Description
            </h2>
            <div
              className="prose prose-lg max-w-none
                prose-p:my-4
                prose-h1:my-6 prose-h1:text-3xl
                prose-h2:my-5 prose-h2:text-2xl
                prose-h3:my-4 prose-h3:text-xl
                prose-li:my-2 prose-li:ml-4
                prose-table:my-6
                prose-img:rounded-lg prose-img:my-6"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
          </div>
        </div>

        {/* Video Section - Optional */}
        {/* {product.videoUrl && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Product Video
            </h2>
            <div className="max-w-4xl mx-auto">
              <YouTubeVideoPlayer
                videoUrl={product.videoUrl}
                thumbnail={
                  product.videoThumbnail || product.thumbnail || ""
                }
              />
            </div>
          </div>
        )} */}

        {/* Additional Information Tabs - You can expand this section */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">
                  Specifications
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">
                      {product?.material || "Not specified"}
                    </span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">
                      {product?.weight || "Not specified"}
                    </span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">
                      {product?.dimensions || "Not specified"}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">
                  Shipping & Returns
                </h3>
                <p className="text-gray-600">
                  Free standard shipping on orders over $50. Express
                  shipping available. Returns accepted within 30 days
                  of purchase. See our return policy for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
