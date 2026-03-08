import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  isPaymentSuccessful,
  getPaymentAmount,
  getPayerEmail,
} from "./payment";

describe("Payment Service", () => {
  describe("isPaymentSuccessful", () => {
    it("should return true for COMPLETED status", () => {
      const order = {
        id: "test-123",
        status: "COMPLETED",
      };
      expect(isPaymentSuccessful(order as any)).toBe(true);
    });

    it("should return true for APPROVED status", () => {
      const order = {
        id: "test-123",
        status: "APPROVED",
      };
      expect(isPaymentSuccessful(order as any)).toBe(true);
    });

    it("should return false for other statuses", () => {
      const order = {
        id: "test-123",
        status: "PENDING",
      };
      expect(isPaymentSuccessful(order as any)).toBe(false);
    });
  });

  describe("getPaymentAmount", () => {
    it("should return the payment amount", () => {
      const order = {
        id: "test-123",
        purchase_units: [
          {
            amount: {
              value: "99.99",
              currency_code: "USD",
            },
          },
        ],
      };
      expect(getPaymentAmount(order as any)).toBe("99.99");
    });

    it("should return null if amount is not available", () => {
      const order = {
        id: "test-123",
        purchase_units: [],
      };
      expect(getPaymentAmount(order as any)).toBeNull();
    });
  });

  describe("getPayerEmail", () => {
    it("should return the payer email", () => {
      const order = {
        id: "test-123",
        payer: {
          email_address: "test@example.com",
        },
      };
      expect(getPayerEmail(order as any)).toBe("test@example.com");
    });

    it("should return null if email is not available", () => {
      const order = {
        id: "test-123",
        payer: {},
      };
      expect(getPayerEmail(order as any)).toBeNull();
    });
  });
});
