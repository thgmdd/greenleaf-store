// ============================================================
// Navbar - 绿意家居导航栏
// Design: Urban Oasis - transparent → frosted glass on scroll
// ============================================================
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

const navLinks = [
  { label: "首页", href: "#home" },
  { label: "产品", href: "#products" },
  { label: "场景方案", href: "#scenes" },
  { label: "品牌故事", href: "#about" },
  { label: "联系我们", href: "#contact" },
];

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.30 0.09 150)" }}>
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: scrolled ? "oklch(0.30 0.09 150)" : "oklch(0.18 0.015 150)",
                }}
              >
                绿意家居
              </span>
              <span className="text-xs tracking-widest"
                style={{ color: scrolled ? "oklch(0.52 0.02 150)" : "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
                GREEN LEAF
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-70 relative group"
                style={{ color: scrolled ? "oklch(0.25 0.08 150)" : "oklch(0.18 0.015 150)", fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ background: "oklch(0.42 0.10 148)" }} />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info("搜索功能即将上线")}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: scrolled ? "oklch(0.25 0.08 150)" : "oklch(0.18 0.015 150)" }}
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onCartClick}
              className="relative w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: scrolled ? "oklch(0.25 0.08 150)" : "oklch(0.18 0.015 150)" }}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-white text-xs flex items-center justify-center rounded-full"
                  style={{ background: "oklch(0.30 0.09 150)", fontSize: "10px" }}>
                  {cartCount}
                </span>
              )}
            </button>

            <Button
              size="sm"
              className="hidden md:flex text-white text-sm px-5"
              style={{ background: "oklch(0.30 0.09 150)", borderRadius: "24px" }}
              onClick={() => handleNavClick("#products")}
            >
              立即选购
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center"
              style={{ color: scrolled ? "oklch(0.25 0.08 150)" : "oklch(0.18 0.015 150)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t"
          style={{ background: "rgba(250, 248, 244, 0.97)", borderColor: "oklch(0.88 0.02 145)" }}>
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="py-3 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                style={{ color: "oklch(0.25 0.08 150)", fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-3 text-white"
              style={{ background: "oklch(0.30 0.09 150)", borderRadius: "24px" }}
              onClick={() => handleNavClick("#products")}
            >
              立即选购
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
