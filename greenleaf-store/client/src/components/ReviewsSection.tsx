// ============================================================
// ReviewsSection - 用户评价区块
// Design: Urban Oasis - dark background section with card grid
// ============================================================
import { useEffect, useRef, useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { reviews } from "@/lib/data";

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-2xl flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star key={s} className="w-4 h-4"
            style={{ fill: s <= review.rating ? "oklch(0.78 0.12 80)" : "transparent",
              color: "oklch(0.78 0.12 80)" }} />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed flex-1"
        style={{ color: "rgba(255,255,255,0.82)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
        "{review.content}"
      </p>

      {/* Product tag */}
      <div className="text-xs px-2 py-1 rounded-full self-start"
        style={{ background: "rgba(255,255,255,0.1)", color: "oklch(0.72 0.10 145)", fontFamily: "'Noto Sans SC', sans-serif" }}>
        购买了：{review.product}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <img
          src={review.avatar}
          alt={review.author}
          className="w-9 h-9 rounded-full"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <div>
          <div className="text-sm font-medium flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Noto Sans SC', sans-serif" }}>
            {review.author}
            {review.verified && (
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "oklch(0.72 0.10 145)" }} />
            )}
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace" }}>
            {review.date}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32"
      style={{ background: "oklch(0.15 0.03 150)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div>
            <p className="text-sm font-medium tracking-widest mb-3"
              style={{ color: "oklch(0.72 0.10 145)", fontFamily: "'DM Mono', monospace" }}>
              CUSTOMER REVIEWS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}>
              客户真实评价
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: "oklch(0.72 0.10 145)", fontFamily: "'DM Mono', monospace" }}>
                4.8
              </div>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5"
                    style={{ fill: "oklch(0.78 0.12 80)", color: "oklch(0.78 0.12 80)" }} />
                ))}
              </div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                综合评分
              </div>
            </div>
            <div className="w-px h-12" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: "oklch(0.72 0.10 145)", fontFamily: "'DM Mono', monospace" }}>
                50K+
              </div>
              <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                累计评价
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
