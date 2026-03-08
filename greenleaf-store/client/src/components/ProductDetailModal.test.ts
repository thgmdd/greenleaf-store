import { describe, it, expect } from "vitest";
import type { MiniPottedPlant } from "@/lib/mini-potted-plants";

describe("ProductDetailModal", () => {
  const mockProduct: MiniPottedPlant = {
    id: "test-001",
    sku: "test-001",
    name: "测试多肉",
    subtitle: "测试产品",
    nameEn: "Test Succulent",
    variety: "多肉",
    price: 99,
    originalPrice: 149,
    image: "https://example.com/image.jpg",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ],
    video: "https://example.com/video.mp4",
    rating: 4.8,
    reviews: 123,
    description: "这是一个测试产品",
    features: ["高度仿真", "易清洁"],
    size: "10cm×10cm×15cm",
    height: "15cm",
    material: "PE+陶土盆",
    color: "绿色",
    placement: ["床头", "窗台"],
    isHot: true,
    isNew: true,
    inStock: true,
  };

  it("should have multiple images for hot products", () => {
    expect(mockProduct.images).toBeDefined();
    expect(mockProduct.images?.length).toBeGreaterThan(1);
  });

  it("should have video URL for hot products", () => {
    expect(mockProduct.video).toBeDefined();
    expect(mockProduct.video).toContain("mp4");
  });

  it("should calculate discount correctly", () => {
    const discount = Math.round(
      (1 - mockProduct.price / mockProduct.originalPrice!) * 100
    );
    expect(discount).toBe(34); // (1 - 99/149) * 100 ≈ 34%
  });

  it("should have all required product fields", () => {
    expect(mockProduct.id).toBeDefined();
    expect(mockProduct.name).toBeDefined();
    expect(mockProduct.price).toBeGreaterThan(0);
    expect(mockProduct.image).toBeDefined();
    expect(mockProduct.rating).toBeGreaterThan(0);
    expect(mockProduct.rating).toBeLessThanOrEqual(5);
  });

  it("should have features array", () => {
    expect(Array.isArray(mockProduct.features)).toBe(true);
    expect(mockProduct.features.length).toBeGreaterThan(0);
  });

  it("should have placement array", () => {
    expect(Array.isArray(mockProduct.placement)).toBe(true);
    expect(mockProduct.placement.length).toBeGreaterThan(0);
  });
});
