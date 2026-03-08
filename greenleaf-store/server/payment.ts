// ============================================================
// payment.ts - PayPal 支付集成服务
// ============================================================

import axios from "axios";
import { ENV } from "./_core/env";

const PAYPAL_API_BASE = process.env.NODE_ENV === "production"
  ? "https://api.paypal.com"
  : "https://api.sandbox.paypal.com";

interface PayPalAccessTokenResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
}

interface PayPalOrder {
  id: string;
  status: string;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  purchase_units?: Array<{
    amount?: {
      value: string;
      currency_code: string;
    };
  }>;
}

interface CreateOrderRequest {
  amount: string;
  currency: string;
  description: string;
  returnUrl: string;
  cancelUrl: string;
}

interface CaptureOrderRequest {
  orderId: string;
}

// 获取 PayPal 访问令牌
async function getAccessToken(): Promise<string> {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal credentials not configured");
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post<PayPalAccessTokenResponse>(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to get PayPal access token:", error);
    throw new Error("Failed to authenticate with PayPal");
  }
}

// 创建 PayPal 订单
export async function createPayPalOrder(
  request: CreateOrderRequest
): Promise<PayPalOrder> {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<PayPalOrder>(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: request.currency,
              value: request.amount,
            },
            description: request.description,
          },
        ],
        application_context: {
          brand_name: "Green Leaf Store",
          locale: "zh-CN",
          user_action: "PAY_NOW",
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create PayPal order:", error);
    throw new Error("Failed to create payment order");
  }
}

// 捕获 PayPal 订单（完成支付）
export async function capturePayPalOrder(
  orderId: string
): Promise<PayPalOrder> {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post<PayPalOrder>(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to capture PayPal order:", error);
    throw new Error("Failed to capture payment");
  }
}

// 获取 PayPal 订单详情
export async function getPayPalOrderDetails(
  orderId: string
): Promise<PayPalOrder> {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get<PayPalOrder>(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to get PayPal order details:", error);
    throw new Error("Failed to retrieve order details");
  }
}

// 验证支付是否成功
export function isPaymentSuccessful(order: PayPalOrder): boolean {
  return order.status === "COMPLETED" || order.status === "APPROVED";
}

// 获取支付金额
export function getPaymentAmount(order: PayPalOrder): string | null {
  return order.purchase_units?.[0]?.amount?.value ?? null;
}

// 获取支付者邮箱
export function getPayerEmail(order: PayPalOrder): string | null {
  return order.payer?.email_address ?? null;
}
