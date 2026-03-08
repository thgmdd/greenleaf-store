// ============================================================
// ProductsSection - 产品展示区
// Design: Urban Oasis - masonry-inspired grid with hover effects
// ============================================================
import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { products, categories, type Product } from "@/lib/data";

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, index, onAddToCart }: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      ref={cardRef}
      className="product-card bg-white rounded-2xl overflow-hidden border group"
      style={{
        borderColor: "oklch(0.88 0.02 145)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${(index % 4) * 0.1}s, transform 0.6s ease-out ${(index % 4) * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="product-img w-full h-full object-cover"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isHot && <span className="badge-hot">热销</span>}
          {product.isNew && <span className="badge-new">新品</span>}
          {discount > 0 && (
            <span className="text-white text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "oklch(0.577 0.245 27.325)", fontSize: "0.65rem" }}>
              -{discount}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: liked ? "oklch(0.30 0.09 150)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => {
            setLiked(!liked);
            toast.success(liked ? "已取消收藏" : "已加入收藏");
          }}
        >
          <Heart className="w-4 h-4" style={{ color: liked ? "white" : "oklch(0.52 0.02 150)", fill: liked ? "white" : "none" }} />
        </button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full text-white text-sm font-medium"
            style={{ background: "oklch(0.30 0.09 150)", borderRadius: "12px" }}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            加入购物车
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs mb-1" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'DM Mono', monospace" }}>
          {product.size}
        </p>
        <h3 className="font-bold text-base mb-0.5 leading-tight"
          style={{ color: "oklch(0.18 0.015 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
          {product.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
          {product.subtitle}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-3 h-3"
                style={{ fill: s <= Math.floor(product.rating) ? "oklch(0.78 0.12 80)" : "transparent",
                  color: "oklch(0.78 0.12 80)" }} />
            ))}
          </div>
          <span className="text-xs" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'DM Mono', monospace" }}>
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold" style={{ color: "oklch(0.30 0.09 150)", fontFamily: "'DM Mono', monospace" }}>
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through" style={{ color: "oklch(0.65 0.02 150)" }}>
              ¥{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 md:py-32"
      style={{ background: "oklch(0.96 0.012 95)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium tracking-widest mb-3"
              style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
              OUR COLLECTION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.015 150)" }}>
              精选产品
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
            每一款产品均经过严格品控，确保仿真度与耐用性达到最高标准。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat.id ? "oklch(0.30 0.09 150)" : "white",
                color: activeCategory === cat.id ? "white" : "oklch(0.42 0.10 148)",
                border: `1.5px solid ${activeCategory === cat.id ? "oklch(0.30 0.09 150)" : "oklch(0.88 0.02 145)"}`,
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
              <span className="text-xs opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-10"
            style={{
              borderColor: "oklch(0.42 0.10 148)",
              color: "oklch(0.30 0.09 150)",
              borderRadius: "32px",
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
            onClick={() => toast.info("更多产品即将上线，敬请期待！")}
          >
            查看更多产品
          </Button>
        </div>
      </div>
    </section>
  );
}
