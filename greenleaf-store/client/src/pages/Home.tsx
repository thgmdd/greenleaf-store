// ============================================================
// Home - 绿意家居主页
// Design: Urban Oasis - Deep forest green + warm cream
// Sections: Announcement → Navbar → Hero → Features → Products → Scenes → Reviews → About → Footer
// ============================================================
import { useState, useCallback } from "react";
import { toast } from "sonner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import ScenesSection from "@/components/ScenesSection";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import FloatingActions from "@/components/FloatingActions";
import MiniPottedSection from "@/components/MiniPottedSection";
import type { Product } from "@/lib/data";
import type { MiniPottedPlant } from "@/lib/mini-potted-plants";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product | MiniPottedPlant) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`已将「${product.name}」加入购物车`, {
      action: {
        label: "查看购物车",
        onClick: () => setCartOpen(true),
      },
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0);
    });
  }, []);

  const handleRemove = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    toast.success("已从购物车移除");
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const scrollToProducts = () => {
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.98 0.008 95)" }}>
      {/* Top announcement bar */}
      <AnnouncementBanner />

      {/* Fixed Navigation */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero - Full-bleed parallax */}
        <HeroSection onShopClick={scrollToProducts} />

        {/* 2. Features - Why choose us */}
        <FeaturesSection />

        {/* 3. Products - Filterable grid */}
        <ProductsSection onAddToCart={handleAddToCart} />

        {/* 3.5. Mini Potted Plants - 100+ 款精品小型盆栽 */}
        <MiniPottedSection onAddToCart={handleAddToCart} />

        {/* 4. Scene Solutions - Alternating layout */}
        <ScenesSection />

        {/* 5. Reviews - Dark background */}
        <ReviewsSection />

        {/* 6. Brand Story */}
        <AboutSection />
      </main>

      {/* Footer + Contact */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
}
