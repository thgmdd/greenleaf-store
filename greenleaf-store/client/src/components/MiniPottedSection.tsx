// ============================================================
// MiniPottedSection - 小型花卉盆栽专区
// Design: 精品展示 + 高级感 + 视觉冲击力
// 包含：多肉、仙人掌、蝴蝶兰、仙客来、水仙等 100+ 款产品
// ============================================================

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Star, Heart, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { miniPottedPlants, type MiniPottedPlant } from "@/lib/mini-potted-plants";
import ProductDetailModal from "./ProductDetailModal";

interface MiniPottedSectionProps {
  onAddToCart: (product: MiniPottedPlant) => void;
}

type VarietyFilter = "全部" | "多肉" | "仙人掌" | "蝴蝶兰" | "仙客来" | "水仙" | "其他";

function MiniPottedCard({ 
  product, 
  index, 
  onAddToCart,
  onViewDetails
}: {
  product: MiniPottedPlant;
  index: number;
  onAddToCart: (product: MiniPottedPlant) => void;
  onViewDetails: (product: MiniPottedPlant) => void;
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
      className="mini-potted-card bg-white rounded-xl overflow-hidden border group shadow-sm hover:shadow-lg transition-all duration-300"
      style={{
        borderColor: "oklch(0.88 0.02 145)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease-out ${(index % 6) * 0.08}s, transform 0.5s ease-out ${(index % 6) * 0.08}s`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-green-50 to-emerald-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badge - Hot/New */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isHot && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              热销
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
              新品
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            -¥{Math.round(product.originalPrice! - product.price)}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          {/* View Details Button */}
          {(product.images?.length || 0) > 1 || product.video ? (
            <button
              onClick={() => onViewDetails(product)}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-emerald-50"
              title="查看详情"
            >
              <Eye size={18} className="text-emerald-600" />
            </button>
          ) : null}
          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Heart
              size={18}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Variety Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
            {product.variety}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-gray-600 line-clamp-1 mb-2">
          {product.subtitle}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-emerald-600">
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ¥{product.originalPrice}
            </span>
          )}
        </div>

        {/* Size/Height */}
        <p className="text-xs text-gray-600 mb-3">
          高度: {product.height}
        </p>

        {/* Add to Cart Button */}
        <Button
          onClick={() => {
            onAddToCart(product);
            toast.success(`已将「${product.name}」加入购物车`, {
              action: {
                label: "查看购物车",
                onClick: () => {
                  // Trigger cart drawer
                  window.dispatchEvent(new CustomEvent("openCart"));
                },
              },
            });
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <ShoppingCart size={14} className="mr-1" />
          加入购物车
        </Button>
      </div>
    </div>
  );
}

export default function MiniPottedSection({ onAddToCart }: MiniPottedSectionProps) {
  const [selectedVariety, setSelectedVariety] = useState<VarietyFilter>("全部");
  const [displayProducts, setDisplayProducts] = useState<MiniPottedPlant[]>(miniPottedPlants);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "new">("new");
  const [selectedProduct, setSelectedProduct] = useState<MiniPottedPlant | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const varieties: VarietyFilter[] = ["全部", "多肉", "仙人掌", "蝴蝶兰", "仙客来", "水仙", "其他"];

  const handleViewDetails = (product: MiniPottedPlant) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = miniPottedPlants;

    // Filter by variety
    if (selectedVariety !== "全部") {
      filtered = filtered.filter((p: MiniPottedPlant) => p.variety === selectedVariety);
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        sorted.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }

    setDisplayProducts(sorted);
  }, [selectedVariety, sortBy]);

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            🌿 精品小型盆栽
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            100+ 款精选小型盆栽
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            多肉、仙人掌、蝴蝶兰、仙客来、水仙等品种应有尽有，
            每一款都精心挑选，为您的床头、窗台、办公桌增添生机与美感
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Variety Filter */}
          <div className="flex gap-2 flex-wrap">
            {varieties.map((variety) => (
              <button
                key={variety}
                onClick={() => setSelectedVariety(variety)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedVariety === variety
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-300"
                }`}
              >
                {variety}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-emerald-500"
            >
              <option value="new">最新产品</option>
              <option value="price-asc">价格低到高</option>
              <option value="price-desc">价格高到低</option>
              <option value="rating">评分最高</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <p className="text-sm text-gray-600 mb-6">
          共 <span className="font-bold text-emerald-600">{displayProducts.length}</span> 款产品
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product, index) => (
            <MiniPottedCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">暂无该品种的产品</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            找不到心仪的产品？
          </h3>
          <p className="text-lg mb-6 opacity-90">
            我们还有更多品种和定制方案，欢迎咨询我们的客服团队
          </p>
          <Button
            className="bg-white text-emerald-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg"
          >
            联系客服
          </Button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
