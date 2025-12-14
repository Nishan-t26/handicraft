import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-text py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Handicraft</h3>
            <p className="text-footer-muted text-sm">
              Discover unique handcrafted products from artisans around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-footer-muted text-sm">
              <li>
                <Link href="/products" className="hover:text-footer-text">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-footer-text">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-footer-muted text-sm">
              Email: contact@handicraft.com
            </p>
          </div>
        </div>
        <div className="border-t border-footer-border mt-8 pt-8 text-center text-footer-muted text-sm">
          © {new Date().getFullYear()} Handicraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
