// ============================================================
// CartDrawer - 购物车侧边栏
// Design: Urban Oasis - slide-in drawer from right
// ============================================================
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocation } from "wouter";
import type { Product } from "@/lib/data";
import type { MiniPottedPlant } from "@/lib/mini-potted-plants";

export interface CartItem {
  product: Product | MiniPottedPlant;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const [, setLocation] = useLocation();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    // 保存购物车到 localStorage
    localStorage.setItem(
      "cart",
      JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        }))
      )
    );
    // 关闭抽屉并跳转到结账页面
    onClose();
    setLocation("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col transition-transform duration-400"
        style={{
          background: "oklch(0.98 0.008 95)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "oklch(0.88 0.02 145)" }}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: "oklch(0.30 0.09 150)" }} />
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Noto Sans SC', sans-serif", color: "oklch(0.18 0.015 150)" }}>
              购物车
            </h2>
            {items.length > 0 && (
              <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                style={{ background: "oklch(0.30 0.09 150)" }}>
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <X className="w-4 h-4" style={{ color: "oklch(0.52 0.02 150)" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="text-6xl">🛒</div>
              <p className="text-base font-medium" style={{ color: "oklch(0.35 0.06 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                购物车还是空的
              </p>
              <p className="text-sm" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                去挑选您喜欢的仿真绿植吧
              </p>
              <Button
                className="text-white mt-2"
                style={{ background: "oklch(0.30 0.09 150)", borderRadius: "24px" }}
                onClick={onClose}
              >
                继续购物
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 rounded-xl"
                  style={{ background: "white", border: "1px solid oklch(0.88 0.02 145)" }}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate"
                      style={{ color: "oklch(0.18 0.015 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {item.product.name}
                    </p>
                    <p className="text-xs mt-0.5 truncate"
                      style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {item.product.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold"
                        style={{ color: "oklch(0.30 0.09 150)", fontFamily: "'DM Mono', monospace" }}>
                        ¥{item.product.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                          style={{ border: "1px solid oklch(0.88 0.02 145)" }}
                        >
                          <Minus className="w-3 h-3" style={{ color: "oklch(0.52 0.02 150)" }} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium"
                          style={{ color: "oklch(0.18 0.015 150)", fontFamily: "'DM Mono', monospace" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                          style={{ border: "1px solid oklch(0.88 0.02 145)" }}
                        >
                          <Plus className="w-3 h-3" style={{ color: "oklch(0.52 0.02 150)" }} />
                        </button>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: "oklch(0.88 0.02 145)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: "oklch(0.52 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                合计（含运费）
              </span>
              <span className="text-2xl font-bold" style={{ color: "oklch(0.30 0.09 150)", fontFamily: "'DM Mono', monospace" }}>
                ¥{total.toLocaleString()}
              </span>
            </div>
            <Button
              className="w-full text-white text-base font-medium py-3"
              style={{ background: "oklch(0.30 0.09 150)", borderRadius: "14px" }}
              onClick={handleCheckout}
            >
              立即结算
            </Button>
            <p className="text-center text-xs mt-3" style={{ color: "oklch(0.65 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
              支持微信支付 · 支付宝 · 银行卡
            </p>
          </div>
        )}
      </div>
    </>
  );
}
