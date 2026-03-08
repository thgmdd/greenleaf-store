import { describe, it, expect } from "vitest";
import { generateOrderNumber } from "./orders";

describe("Order Service", () => {
  describe("generateOrderNumber", () => {
    it("should generate a unique order number", () => {
      const orderNumber1 = generateOrderNumber();
      const orderNumber2 = generateOrderNumber();

      expect(orderNumber1).toMatch(/^ORD-/);
      expect(orderNumber2).toMatch(/^ORD-/);
      expect(orderNumber1).not.toBe(orderNumber2);
    });

    it("should generate order number with correct format", () => {
      const orderNumber = generateOrderNumber();
      // Format: ORD-{timestamp}-{random}
      // timestamp is in base36 (alphanumeric), random is uppercase alphanumeric from nanoid
      expect(orderNumber).toMatch(/^ORD-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it("should generate valid order numbers for multiple calls", () => {
      const orderNumbers = Array.from({ length: 10 }, () => generateOrderNumber());
      const uniqueNumbers = new Set(orderNumbers);

      expect(uniqueNumbers.size).toBe(10);
      orderNumbers.forEach((num) => {
        expect(num).toMatch(/^ORD-/);
      });
    });
  });
});
