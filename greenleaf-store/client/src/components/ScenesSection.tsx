// ============================================================
// ScenesSection - 场景方案区块
// Design: Urban Oasis - alternating image+text layout
// ============================================================
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392852100/CD7tjTbceR5unCtzt9q9hX/hero-bg-evb8FWSHHnF5QdafQkmvs6.webp";
const OFFICE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663392852100/CD7tjTbceR5unCtzt9q9hX/office-scene-CTrfaDLtTmxXRerD8KfkKW.webp";

const scenes = [
  {
    id: "home",
    tag: "HOME LIVING",
    title: "家居空间",
    subtitle: "让每个角落都充满生机",
    description: "无论是客厅的角落、书房的书架，还是卧室的窗台，仿真绿植都能为您的家居空间增添自然气息。无需浇水，无需日照，永远保持最美的状态。",
    points: ["客厅落地大型绿植", "书房桌面小盆栽", "卧室床头装饰", "阳台挂篮绿植"],
    image: HERO_IMAGE,
    imageAlt: "家居仿真绿植场景",
    reverse: false,
  },
  {
    id: "commercial",
    tag: "COMMERCIAL SPACE",
    title: "商业空间",
    subtitle: "专业定制，提升空间价值",
    description: "为办公室、酒店大堂、餐厅、商场等商业场所提供专业的仿真绿植解决方案。我们提供现场勘测、方案设计、安装维护一站式服务，让您的商业空间焕然一新。",
    points: ["办公室前台绿植墙", "酒店大堂落地乔木", "餐厅隔断绿植屏风", "商场橱窗装饰"],
    image: OFFICE_IMAGE,
    imageAlt: "商业空间仿真绿植方案",
    reverse: true,
  },
];

function SceneBlock({ scene, index }: { scene: typeof scenes[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${scene.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 overflow-hidden rounded-3xl`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        background: "white",
        boxShadow: "0 4px 40px rgba(48,90,60,0.08)",
      }}
    >
      {/* Image */}
      <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden">
        <img
          src={scene.image}
          alt={scene.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <p className="text-xs font-medium tracking-widest mb-4"
          style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
          {scene.tag}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.015 150)" }}>
          {scene.title}
        </h3>
        <p className="text-base font-medium mb-4"
          style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'Noto Sans SC', sans-serif" }}>
          {scene.subtitle}
        </p>
        <p className="text-sm leading-relaxed mb-8"
          style={{ color: "oklch(0.45 0.02 150)", fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 300 }}>
          {scene.description}
        </p>

        {/* Points */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {scene.points.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "oklch(0.42 0.10 148)" }} />
              <span className="text-sm" style={{ color: "oklch(0.35 0.06 150)", fontFamily: "'Noto Sans SC', sans-serif" }}>
                {point}
              </span>
            </div>
          ))}
        </div>

        <Button
          className="self-start text-white px-6"
          style={{ background: "oklch(0.30 0.09 150)", borderRadius: "24px" }}
          onClick={() => toast.info("方案咨询功能即将上线，欢迎联系我们")}
        >
          了解方案
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ScenesSection() {
  return (
    <section id="scenes" className="py-24 md:py-32"
      style={{ background: "oklch(0.98 0.008 95)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest mb-3"
            style={{ color: "oklch(0.42 0.10 148)", fontFamily: "'DM Mono', monospace" }}>
            SCENE SOLUTIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.015 150)" }}>
            场景解决方案
          </h2>
        </div>

        {/* Scenes */}
        <div className="flex flex-col gap-8">
          {scenes.map((scene, index) => (
            <SceneBlock key={scene.id} scene={scene} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
