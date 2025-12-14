import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/api";
import { Product } from "@/types/product";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Collection
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Discover handcrafted treasures made with passion and tradition.
            Each piece tells a unique story.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="section bg-background">
        <div className="container mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="heading-3 text-text-primary mb-2">
                No products yet
              </h2>
              <p className="text-text-secondary">
                Check back soon for our handcrafted collection.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-text-secondary">
                  Showing <span className="font-medium text-text-primary">{products.length}</span> products
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
