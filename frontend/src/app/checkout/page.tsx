"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { OrderFormData } from "@/types/order";
import { createOrder } from "@/services/api";
import { useCart } from "@/context/CartContext";

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
        <p className="text-center p-8 text-lg">Your cart is empty.</p>
      </>
    );
  }

  // Determine items to display (single item for now based on context implementation)
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
        <div className="max-w-xl mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Placed 🎉</h1>
          <p className="text-gray-600">
            Thank you! We will contact you shortly.
          </p>
        </div>
      </>
    );
  }

  // Safe check if somehow component renders without items
  if (!cartItem) return null;

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Order Summary */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex gap-4">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{cartItem.name}</h3>
              <p className="text-sm text-gray-600">
                Quantity: {cartItem.quantity}
              </p>
              <p className="mt-2 font-medium">₹{cartItem.price}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </section>

        {/* RIGHT: Checkout Form */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="customerName"
              placeholder="Full Name"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
