// ============================================================
// HeroSection - 全宽视差Hero区
// Design: Urban Oasis - full-bleed image + dark overlay + centered copy
// ============================================================
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392852100/CD7tjTbceR5unCtzt9q9hX/hero-bg-evb8FWSHHnF5QdafQkmvs6.webp";

interface HeroSectionProps {
  onShopClick: () => void;
}

export default function HeroSection({ onShopClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setOffsetY(window.scrollY * 0.35);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full"
        style={{
          transform: `translateY(${offsetY}px)`,
          height: "115%",
          top: "-7.5%",
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="仿真绿植家居场景"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(24,40,28,0.62) 0%, rgba(24,40,28,0.28) 60%, rgba(24,40,28,0.15) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div
          className="max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
          }}
        >
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'Noto Sans SC', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            高品质仿真绿植 · 以假乱真
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "rgba(255,255,255,0.96)",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            让绿意
            <br />
            <span style={{ color: "oklch(0.82 0.14 145)", fontStyle: "italic" }}>永不凋零</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 300,
            }}
          >
            无需浇水，无需日照，四季常青。
            <br />
            为您的家居与商业空间注入永恒的自然生命力。
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="text-white px-8 py-3 text-base font-medium shadow-xl"
              style={{
                background: "oklch(0.30 0.09 150)",
                borderRadius: "32px",
                boxShadow: "0 8px 32px rgba(48,90,60,0.4)",
              }}
              onClick={onShopClick}
            >
              立即选购
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base font-medium"
              style={{
                borderRadius: "32px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.92)",
              }}
              onClick={() => {
                const el = document.querySelector("#scenes");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              场景方案
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="absolute bottom-20 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 max-w-7xl"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.4s",
          }}
        >
          <div
            className="inline-flex gap-8 md:gap-12 px-6 py-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {[
              { value: "50,000+", label: "满意客户" },
              { value: "200+", label: "精品款式" },
              { value: "98%", label: "好评率" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: "oklch(0.82 0.14 145)", fontFamily: "'DM Mono', monospace" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Noto Sans SC', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
