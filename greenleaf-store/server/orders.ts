// ============================================================
// orders.ts - 订单数据库操作
// ============================================================

import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { orders, InsertOrder, Order } from "../drizzle/schema";
import { nanoid } from "nanoid";

// 生成唯一订单号
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = nanoid(8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// 创建订单
export async function createOrder(data: Omit<InsertOrder, "orderNumber" | "createdAt" | "updatedAt">): Promise<Order> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const orderNumber = generateOrderNumber();
  const result = await db.insert(orders).values({
    ...data,
    orderNumber,
  } as InsertOrder);

  const createdOrder = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  if (!createdOrder[0]) throw new Error("Failed to create order");
  return createdOrder[0];
}

// 获取订单
export async function getOrder(orderId: number): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  return result[0];
}

// 通过订单号获取订单
export async function getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  return result[0];
}

// 通过 PayPal 交易 ID 获取订单
export async function getOrderByPayPalTransactionId(transactionId: string): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.paypalTransactionId, transactionId))
    .limit(1);

  return result[0];
}

// 获取用户订单列表
export async function getUserOrders(userId: number, limit: number = 10): Promise<Order[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy((o) => [o.createdAt])
    .limit(limit);
}

// 更新订单状态
export async function updateOrderStatus(
  orderId: number,
  status: Order["status"]
): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, orderId));

  return getOrder(orderId);
}

// 更新订单支付信息
export async function updateOrderPayment(
  orderId: number,
  paypalTransactionId: string,
  status: Order["status"] = "paid"
): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db
    .update(orders)
    .set({ paypalTransactionId, status })
    .where(eq(orders.id, orderId));

  return getOrder(orderId);
}

// 取消订单
export async function cancelOrder(orderId: number): Promise<Order | undefined> {
  return updateOrderStatus(orderId, "cancelled");
}

// 获取订单统计
export async function getOrderStats(userId: number) {
  const db = await getDb();
  if (!db) return { totalOrders: 0, totalSpent: 0, completedOrders: 0 };

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId));

  const totalOrders = userOrders.length;
  const completedOrders = userOrders.filter((o) => o.status === "delivered").length;
  const totalSpent = userOrders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);

  return {
    totalOrders,
    totalSpent,
    completedOrders,
  };
}
