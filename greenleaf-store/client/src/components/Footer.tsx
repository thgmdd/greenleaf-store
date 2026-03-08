// ============================================================
// Footer - 页脚 + 联系我们
// Design: Urban Oasis - dark footer with contact form
// ============================================================
import { useState } from "react";
import { Leaf, Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Footer() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("请填写姓名和联系电话");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("消息已发送！我们将在24小时内联系您。");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32"
        style={{ background: "oklch(0.15 0.03 150)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="text-sm font-medium tracking-widest mb-4"
                style={{ color: "oklch(0.72 0.10 145)", fontFamily: "'DM Mono', monospace" }}>
                GET IN TOUCH
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.95)" }}>
                联系我们
              </h2>
              <p className="text-base leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
                无论是个人选购还是商业定制，我们的专业团队都将为您提供一对一的咨询服务，帮助您找到最适合的绿植方案。
              </p>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: "客服热线", value: "400-888-6688" },
                  { icon: Mail, label: "电子邮件", value: "hello@greenleaf.cn" },
                  { icon: MapPin, label: "公司地址", value: "上海市浦东新区张江高科技园区" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <item.icon className="w-4 h-4" style={{ color: "oklch(0.72 0.10 145)" }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WeChat QR placeholder */}
              <div className="mt-10 p-5 rounded-2xl flex items-center gap-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    微信扫码咨询
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    扫描二维码，添加专属客服微信，获取一对一服务
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-8 rounded-3xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-xl font-bold mb-6"
                style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                发送咨询
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    您的姓名 *
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="请输入您的姓名"
                    className="border-0 text-white placeholder:text-white/30"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      fontFamily: "'Noto Sans SC', sans-serif",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    联系电话 *
                  </label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="请输入您的联系电话"
                    className="border-0 text-white placeholder:text-white/30"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      fontFamily: "'Noto Sans SC', sans-serif",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                    咨询内容
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="请描述您的需求，例如：空间类型、面积、预算等"
                    rows={4}
                    className="border-0 resize-none placeholder:text-white/30"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      fontFamily: "'Noto Sans SC', sans-serif",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-white font-medium"
                  style={{ background: "oklch(0.30 0.09 150)", borderRadius: "12px" }}
                >
                  {submitting ? "发送中..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      发送咨询
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <footer style={{ background: "oklch(0.10 0.02 150)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.30 0.09 150)" }}>
                <Leaf className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Playfair Display', serif" }}>
                绿意家居
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {["关于我们", "产品目录", "场景方案", "售后服务", "隐私政策"].map((link) => (
                <a key={link} href="#"
                  onClick={(e) => { e.preventDefault(); toast.info("页面建设中，敬请期待"); }}
                  className="text-xs transition-colors hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {link}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>
              © 2026 绿意家居
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
