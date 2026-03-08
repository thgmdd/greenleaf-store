// ============================================================
// AnnouncementBanner - 顶部公告横幅
// Design: Urban Oasis - forest green strip with scrolling text
// ============================================================
import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative z-50 flex items-center justify-center px-10 py-2.5 text-center"
      style={{ background: "oklch(0.30 0.09 150)" }}
    >
      <p className="text-xs text-white/90 tracking-wide"
        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
        🌿 &nbsp; 新用户首单立减 <strong>50元</strong> &nbsp;·&nbsp; 满 <strong>599</strong> 元包邮 &nbsp;·&nbsp; 企业采购享 <strong>8折</strong> 优惠 &nbsp; 🌿
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-3 h-3 text-white/70" />
      </button>
    </div>
  );
}
