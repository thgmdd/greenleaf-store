// ============================================================
// FeaturesSection - 产品优势区块
// Design: Urban Oasis - 3-column grid with icon cards
// ============================================================
import { useEffect, useRef, useState } from "react";
import { advantages } from "@/lib/data";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32"
      style={{ background: "oklch(0.98 0.008 95)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <p className="text-sm font-medium tracking-widest mb-3"
            style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
            WHY CHOOSE US
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.015 150)" }}>
            为什么选择
            <br />
            <span style={{ color: "oklch(0.30 0.09 150)" }}>仿真绿植</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, index) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl cursor-default"
              style={{
                background: "white",
                borderColor: "oklch(0.88 0.02 145)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease-out ${index * 0.1}s, transform 0.7s ease-out ${index * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.42 0.10 148)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.88 0.02 145)";
              }}
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Noto Sans SC', sans-serif", color: "oklch(0.18 0.015 150)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed"
                style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
