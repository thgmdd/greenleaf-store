// ============================================================
// paymentRouter.ts - 支付相关 tRPC 路由
// ============================================================

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createPayPalOrder,
  capturePayPalOrder,
  getPayPalOrderDetails,
  isPaymentSuccessful,
  getPaymentAmount,
  getPayerEmail,
} from "./payment";
import {
  createOrder,
  getOrderByNumber,
  updateOrderPayment,
  getUserOrders,
  getOrderStats,
} from "./orders";

export const paymentRouter = router({
  // 创建 PayPal 订单
  createPayPalOrder: publicProcedure
    .input(
      z.object({
        amount: z.string(),
        currency: z.string().default("USD"),
        description: z.string(),
        returnUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const paypalOrder = await createPayPalOrder(input);
        return {
          success: true,
          orderId: paypalOrder.id,
          status: paypalOrder.status,
        };
      } catch (error) {
        console.error("Failed to create PayPal order:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment order",
        });
      }
    }),

  // 捕获 PayPal 订单（完成支付）
  capturePayPalOrder: publicProcedure
    .input(
      z.object({
        paypalOrderId: z.string(),
        items: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            quantity: z.number(),
            price: z.string(),
          })
        ),
        shippingAddress: z.object({
          name: z.string(),
          email: z.string(),
          phone: z.string(),
          address: z.string(),
          city: z.string(),
          state: z.string(),
          postalCode: z.string(),
          country: z.string(),
        }),
        totalAmount: z.string(),
        currency: z.string().default("USD"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // 捕获 PayPal 订单
        const paypalOrder = await capturePayPalOrder(input.paypalOrderId);

        if (!isPaymentSuccessful(paypalOrder)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Payment was not completed",
          });
        }

        // 创建本地订单
        const order = await createOrder({
          userId: ctx.user?.id || 0, // 游客订单 userId 为 0
          status: "paid",
          paymentMethod: "paypal",
          totalAmount: input.totalAmount,
          currency: input.currency,
          items: input.items,
          shippingAddress: input.shippingAddress,
          customerEmail: input.shippingAddress.email,
          customerPhone: input.shippingAddress.phone,
          paypalTransactionId: input.paypalOrderId,
        });

        return {
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
        };
      } catch (error) {
        console.error("Failed to capture PayPal order:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to complete payment",
        });
      }
    }),

  // 获取订单详情
  getOrder: publicProcedure
    .input(z.object({ orderNumber: z.string() }))
    .query(async ({ input }) => {
      try {
        const order = await getOrderByNumber(input.orderNumber);
        if (!order) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }
        return order;
      } catch (error) {
        console.error("Failed to get order:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve order",
        });
      }
    }),

  // 获取用户订单列表（需要登录）
  getUserOrders: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userOrders = await getUserOrders(ctx.user.id);
      return userOrders;
    } catch (error) {
      console.error("Failed to get user orders:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve orders",
      });
    }
  }),

  // 获取订单统计（需要登录）
  getOrderStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const stats = await getOrderStats(ctx.user.id);
      return stats;
    } catch (error) {
      console.error("Failed to get order stats:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve order statistics",
      });
    }
  }),
});
