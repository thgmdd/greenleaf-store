// ============================================================
// AboutSection - 品牌故事区块
// Design: Urban Oasis - asymmetric layout with stats
// ============================================================
import { useEffect, useRef, useState } from "react";

const MONSTERA_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392852100/CD7tjTbceR5unCtzt9q9hX/product-monstera-eGzsi5GCaR9vwG6uNQVs7a.webp";

const milestones = [
  { year: "2019", event: "绿意家居成立，专注高品质仿真绿植研发" },
  { year: "2021", event: "推出商业定制服务，服务500+企业客户" },
  { year: "2023", event: "荣获中国家居行业年度优秀品牌奖" },
  { year: "2025", event: "累计服务超50,000名满意客户" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32"
      style={{ background: "oklch(0.96 0.012 95)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with decorative elements */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
              <img
                src={MONSTERA_IMAGE}
                alt="绿意家居品牌故事"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl"
                style={{
                  background: "rgba(24,40,28,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p className="text-xs tracking-widest mb-1"
                  style={{ color: "oklch(0.72 0.10 145)", fontFamily: "'DM Mono', monospace" }}>
                  OUR MISSION
                </p>
                <p className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                  让每个人都能拥有永不凋谢的绿意，
                  <br />无需妥协，无需担忧。
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
              style={{ background: "oklch(0.42 0.10 148)" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-15"
              style={{ background: "oklch(0.30 0.09 150)" }}
            />
          </div>

          {/* Right: Content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
            }}
          >
            <p className="text-sm font-medium tracking-widest mb-4"
              style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
              OUR STORY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.015 150)" }}>
              源于热爱，
              <br />
              <span style={{ color: "oklch(0.30 0.09 150)" }}>精于工艺</span>
            </h2>
            <p className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.45 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              绿意家居创立于2019年，由一群热爱自然与设计的创业者共同创办。我们深知现代都市生活的节奏，许多人渴望绿意却苦于没有时间和精力打理真实植物。
            </p>
            <p className="text-base leading-relaxed mb-10"
              style={{ color: "oklch(0.45 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
              我们与顶级材料供应商合作，采用高分子仿真技术，将每一片叶脉、每一处纹理都还原得栩栩如生。我们相信，好的仿真绿植不是妥协，而是一种更智慧的生活选择。
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4 items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.6s ease-out ${0.4 + i * 0.1}s`,
                  }}>
                  <div className="flex-shrink-0 w-12 text-right">
                    <span className="text-sm font-bold"
                      style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full mt-1.5"
                      style={{ background: "oklch(0.42 0.10 148)" }} />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 mt-1 mb-1 min-h-[20px]"
                        style={{ background: "oklch(0.88 0.02 145)" }} />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.45 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
