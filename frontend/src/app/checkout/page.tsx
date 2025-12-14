export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* Order items will be rendered here */}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            {/* Payment form will be rendered here */}
          </div>
        </div>
      </main>
    </div>
  );
}
