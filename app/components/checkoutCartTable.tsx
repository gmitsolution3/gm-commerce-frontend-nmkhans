import React, { useState } from "react";
import { Trash2, ShoppingBag, ArrowRight, Tag, Shield, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateCartItems } from "@/utils/cartStorage";
import Link from "next/link";
import Image from "next/image";

interface CheckoutProduct {
  productPrice: number;
  quantity: number;
  selectedColor: { name: string };
  selectedProductSize: string;
  selectedVariant: {
    attributes: { color: string; size: string };
    sku: string;
    stock: number;
  };
  sku: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export default function CheckoutCartTable({
  products,
}: {
  products: CheckoutProduct[];
}) {
  const [cartItems, setCartItems] = useState<CheckoutProduct[]>(products);
  const router = useRouter();

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const getTotalPrice = (item: any) => {
    return (item.productPrice * item.quantity).toLocaleString("en-BD");
  };

  const handleGoCheckout = () => {
    const normalizedCart = cartItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

    updateCartItems(normalizedCart);
    router.push("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 text-sm mt-1">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Cart Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
                  <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                    {cartItems.length} items
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary transition-colors group">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <Link href={`/product/${item.slug}`}>
                              <h3 className="font-bold text-gray-900 hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-600">
                                Color: <span className="font-medium">{item.selectedColor.name}</span>
                              </span>
                              <span className="text-sm text-gray-600">
                                Size: <span className="font-medium">{item.selectedProductSize}</span>
                              </span>
                              <span className="text-sm text-gray-600">
                                SKU: <span className="font-medium">{item.sku}</span>
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">৳ {item.productPrice.toLocaleString("en-BD")}</p>
                            <p className="text-sm text-gray-500">each</p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  if (value >= 1) handleQuantityChange(index, value);
                                }}
                                className="w-12 text-center border-x border-gray-300 py-2 text-sm font-semibold focus:outline-none"
                              />
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">৳ {getTotalPrice(item)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">Over ৳ 5,000</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <Tag className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Best Price</p>
                  <p className="text-sm text-gray-600">Guaranteed</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">SSL Protected</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">৳ {subtotal.toLocaleString("en-BD")}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>৳ {total.toLocaleString("en-BD", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Including VAT</p>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200">
                  <button
                    onClick={handleGoCheckout}
                    className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <Link href="/">
                    <button className="w-full border-2 border-primary text-primary py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-colors mt-4">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      
      </div>
    </div>
  );
}