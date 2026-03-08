// ProductDetailModal - 产品详情模态框
// 展示多角度照片、视频、详细规格等信息
// ============================================================

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MiniPottedPlant } from "@/lib/mini-potted-plants";

interface ProductDetailModalProps {
  product: MiniPottedPlant;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: MiniPottedPlant) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const images = product.images || [product.image];
  const currentImage = images[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Image Gallery & Video */}
          <div className="space-y-4">
            {/* Main Image / Video */}
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden aspect-square">
              {showVideo && product.video ? (
                <video
                  src={product.video}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={currentImage}
                    alt={`${product.name} - 图片 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </>
              )}

              {/* Video Button */}
              {product.video && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-emerald-500 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-600 transition-colors"
                >
                  <Play size={16} />
                  {showVideo ? "关闭视频" : "看视频"}
                </button>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setShowVideo(false);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-emerald-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`缩略图 ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Subtitle */}
            <div>
              <p className="text-gray-600 text-sm">{product.subtitle}</p>
              <p className="text-gray-500 text-xs mt-1">{product.nameEn}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} 评价)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-emerald-600">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ¥{product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded">
                      省 ¥{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">尺寸：</span>
                  <span className="font-semibold">{product.size}</span>
                </div>
                <div>
                  <span className="text-gray-600">高度：</span>
                  <span className="font-semibold">{product.height}</span>
                </div>
                <div>
                  <span className="text-gray-600">材质：</span>
                  <span className="font-semibold">{product.material}</span>
                </div>
                <div>
                  <span className="text-gray-600">颜色：</span>
                  <span className="font-semibold">{product.color}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">产品特性</p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Placement */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">适合摆放位置</p>
              <div className="flex flex-wrap gap-2">
                {product.placement.map((place, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">产品描述</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <Button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                加入购物车
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
