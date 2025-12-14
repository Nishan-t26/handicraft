import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider uppercase mb-6 animate-fade-in">
            ✨ Handcrafted with Love
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 animate-slide-up">
            Discover<br />
            <span className="text-accent-light">Artisan Treasures</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Each piece in our collection carries the soul of skilled artisans.
            From pottery to textiles, find unique handmade products that tell a story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn btn-accent btn-lg group"
            >
              Explore Collection
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="btn btn-lg bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-text-primary mb-4">
              Why Choose Handicraft?
            </h2>
            <div className="divider-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-background-secondary hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Direct from Artisans</h3>
              <p className="text-text-secondary">
                Every purchase supports skilled craftspeople and their families directly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-background-secondary hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Unique & Authentic</h3>
              <p className="text-text-secondary">
                No mass production. Each piece is one-of-a-kind with its own character.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-background-secondary hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Eco-Friendly</h3>
              <p className="text-text-secondary">
                Sustainable materials and traditional techniques that respect our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-background-muted">
        <div className="container mx-auto text-center">
          <h2 className="heading-2 text-text-primary mb-4">
            Ready to Explore?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Browse our curated collection of handcrafted products and find the perfect piece for your home.
          </p>
          <Link href="/products" className="btn btn-primary btn-lg">
            View All Products
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
