"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OrderFormData } from "@/types/order";
import { createOrder } from "@/services/api";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (cart.length === 0 && !success) {
    return (
      <>
        <Navbar />
        <main className="section bg-background">
          <div className="container mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-background-secondary flex items-center justify-center">
              <svg
                className="w-12 h-12 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="heading-2 text-text-primary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-text-secondary mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cartItem = cart[0];
  const totalAmount = cartItem ? cartItem.price * cartItem.quantity : 0;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      products: [
        {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        },
      ],
      totalAmount,
    };

    try {
      await createOrder(orderPayload);
      clearCart();
      setSuccess(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="section bg-background">
          <div className="container mx-auto max-w-lg text-center">
            <div className="card p-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="heading-2 text-text-primary mb-4">
                Order Placed! 🎉
              </h1>
              <p className="text-text-secondary mb-8">
                Thank you for your purchase! We'll contact you shortly with
                shipping details.
              </p>
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!cartItem) return null;

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary py-12 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Checkout
          </h1>
          <p className="text-white/80 mt-2">
            Complete your order
          </p>
        </div>
      </section>

      <main className="section bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="order-2 lg:order-1">
              <div className="card p-6 sticky top-24">
                <h2 className="heading-4 mb-6 pb-4 border-b border-card-border">
                  Order Summary
                </h2>

                <div className="flex gap-4 mb-6">
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">
                      {cartItem.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Quantity: {cartItem.quantity}
                    </p>
                    <p className="price mt-2">₹{cartItem.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-card-border pt-4 space-y-3">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-text-primary pt-3 border-t border-card-border">
                    <span>Total</span>
                    <span className="price">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-card-border flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure Checkout
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Quality Guaranteed
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="order-1 lg:order-2">
              <div className="card p-6">
                <h2 className="heading-4 mb-6 pb-4 border-b border-card-border">
                  Shipping Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      name="customerName"
                      placeholder="John Doe"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-text-primary mb-2"
                    >
                      Shipping Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Enter your full shipping address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full btn-lg"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
