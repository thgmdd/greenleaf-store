import { describe, it, expect } from "vitest";
import { miniPottedPlants, MINI_POTTED_PLANTS_COUNT } from "./mini-potted-plants";

describe("Mini Potted Plants Data", () => {
  it("should have 40 products in the collection", () => {
    expect(miniPottedPlants.length).toBe(40);
  });

  it("should export correct count constant", () => {
    expect(MINI_POTTED_PLANTS_COUNT).toBe(40);
  });

  it("should have all required fields for each product", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(product.sku).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.subtitle).toBeDefined();
      expect(product.nameEn).toBeDefined();
      expect(product.variety).toBeDefined();
      expect(product.price).toBeGreaterThan(0);
      expect(product.image).toBeDefined();
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(product.reviews).toBeGreaterThanOrEqual(0);
      expect(product.description).toBeDefined();
      expect(product.features).toBeDefined();
      expect(Array.isArray(product.features)).toBe(true);
      expect(product.size).toBeDefined();
      expect(product.height).toBeDefined();
      expect(product.material).toBeDefined();
      expect(product.color).toBeDefined();
      expect(product.placement).toBeDefined();
      expect(Array.isArray(product.placement)).toBe(true);
    });
  });

  it("should have valid variety values", () => {
    const validVarieties = ["多肉", "仙人掌", "蝴蝶兰", "仙客来", "水仙", "郁金香", "玫瑰", "向日葵", "康乃馨", "绣球花", "牡丹", "百合", "菊花", "樱花", "梅花", "兰花", "花卉组合"];
    
    miniPottedPlants.forEach((product) => {
      expect(validVarieties).toContain(product.variety);
    });
  });

  it("should have unique product IDs", () => {
    const ids = miniPottedPlants.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have unique SKUs", () => {
    const skus = miniPottedPlants.map((p) => p.sku);
    const uniqueSkus = new Set(skus);
    expect(uniqueSkus.size).toBe(skus.length);
  });

  it("should have valid price ranges", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
      expect(product.price).toBeLessThan(10000);
      
      if (product.originalPrice) {
        expect(product.originalPrice).toBeGreaterThan(product.price);
      }
    });
  });

  it("should have valid image URLs", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.image).toMatch(/^https:\/\//);
      expect(product.image).toContain("cloudfront.net");
    });
  });

  it("should have products with placement options", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.placement.length).toBeGreaterThan(0);
      product.placement.forEach((place) => {
        expect(["床头", "窗台", "办公桌", "书架", "客厅", "卧室", "办公室"]).toContain(place);
      });
    });
  });

  it("should have variety distribution", () => {
    const varietyCount = miniPottedPlants.reduce((acc, product) => {
      acc[product.variety] = (acc[product.variety] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Should have multiple varieties
    expect(Object.keys(varietyCount).length).toBeGreaterThan(1);
    
    // Check that major varieties have products
    expect(varietyCount["多肉"]).toBeGreaterThan(0);
    expect(varietyCount["仙人掌"]).toBeGreaterThan(0);
    expect(varietyCount["蝴蝶兰"]).toBeGreaterThan(0);
  });

  it("should have hot and new products marked", () => {
    const hotProducts = miniPottedPlants.filter((p) => p.isHot);
    const newProducts = miniPottedPlants.filter((p) => p.isNew);
    
    expect(hotProducts.length).toBeGreaterThan(0);
    expect(newProducts.length).toBeGreaterThan(0);
  });

  it("should have in-stock products", () => {
    const inStockProducts = miniPottedPlants.filter((p) => p.inStock);
    expect(inStockProducts.length).toBeGreaterThan(0);
  });

  it("should have valid rating and review counts", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(4);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(product.reviews).toBeGreaterThan(0);
    });
  });

  it("should have descriptive features", () => {
    miniPottedPlants.forEach((product) => {
      expect(product.features.length).toBeGreaterThan(0);
      product.features.forEach((feature) => {
        expect(feature.length).toBeGreaterThan(0);
      });
    });
  });
});
