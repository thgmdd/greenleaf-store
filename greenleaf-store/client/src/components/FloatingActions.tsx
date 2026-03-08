// ============================================================
// FloatingActions - 浮动操作按钮（客服 + 回到顶部）
// Design: Urban Oasis - forest green floating buttons
// ============================================================
import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-6 z-40 flex flex-col gap-3">
      {/* Customer Service */}
      <button
        onClick={() => toast.info("微信客服：greenleaf2024，欢迎咨询！")}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "oklch(0.30 0.09 150)",
          boxShadow: "0 4px 20px rgba(48,90,60,0.35)",
        }}
        title="联系客服"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </button>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "white",
          border: "1.5px solid oklch(0.88 0.02 145)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(20px)",
          pointerEvents: showTop ? "auto" : "none",
        }}
        title="回到顶部"
      >
        <ArrowUp className="w-4 h-4" style={{ color: "oklch(0.30 0.09 150)" }} />
      </button>
    </div>
  );
}
