"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { OrderFormData } from "@/types/order";
import { CartItem } from "@/types/cart";

export default function CheckoutPage() {
  // TEMP product (later comes from cart or backend)
  const cartItem: CartItem = {
    productId: "1",
    name: "Handmade Vase",
    price: 1200,
    image: "/vase.jpg",
    quantity: 1,
  };

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalAmount = cartItem.price * cartItem.quantity;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const orderPayload = {
      customer: formData,
      items: [cartItem],
      totalAmount,
    };

    console.log("Order Payload:", orderPayload);
    alert("Order submitted (frontend only)");
  }

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
              className="w-full bg-black text-white py-2 rounded hover:opacity-90"
            >
              Place Order
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
