// ============================================================
// PayPalButton.tsx - PayPal 支付按钮组件
// ============================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface PayPalButtonProps {
  amount: string;
  currency?: string;
  description: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: string;
  }>;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onSuccess?: (orderNumber: string) => void;
  onError?: (error: string) => void;
}

export default function PayPalButton({
  amount,
  currency = "USD",
  description,
  items,
  shippingAddress,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createPayPalOrderMutation = trpc.payment.createPayPalOrder.useMutation();
  const capturePayPalOrderMutation = trpc.payment.capturePayPalOrder.useMutation();

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // 1. 创建 PayPal 订单
      const returnUrl = `${window.location.origin}/payment/success`;
      const cancelUrl = `${window.location.origin}/payment/cancel`;

      const paypalOrderResult = await createPayPalOrderMutation.mutateAsync({
        amount,
        currency,
        description,
        returnUrl,
        cancelUrl,
      });

      if (!paypalOrderResult.success || !paypalOrderResult.orderId) {
        throw new Error("Failed to create PayPal order");
      }

      // 2. 重定向到 PayPal 批准页面
      const approvalUrl = `https://www.${
        process.env.NODE_ENV === "production" ? "paypal.com" : "sandbox.paypal.com"
      }/checkoutnow?token=${paypalOrderResult.orderId}`;

      // 在新标签页打开 PayPal 支付页面
      const paypalWindow = window.open(approvalUrl, "paypal_payment", "width=800,height=600");

      if (!paypalWindow) {
        throw new Error("Failed to open PayPal payment window");
      }

      // 3. 监听支付完成（这是简化版本，实际应该使用 PayPal 的回调）
      // 在实际应用中，应该使用 PayPal 的 onApprove 回调
      const checkPaymentInterval = setInterval(async () => {
        if (paypalWindow.closed) {
          clearInterval(checkPaymentInterval);

          // 尝试捕获订单
          try {
            const captureResult = await capturePayPalOrderMutation.mutateAsync({
              paypalOrderId: paypalOrderResult.orderId,
              items,
              shippingAddress,
              totalAmount: amount,
              currency,
            });

            if (captureResult.success) {
              toast.success("支付成功！订单已创建。");
              onSuccess?.(captureResult.orderNumber);
            }
          } catch (error) {
            console.error("Payment capture failed:", error);
            toast.error("支付确认失败，请联系客服。");
            onError?.("Payment capture failed");
          }
        }
      }, 1000);

      // 30秒后停止检查
      setTimeout(() => clearInterval(checkPaymentInterval), 30000);
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "支付失败，请重试。";
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || createPayPalOrderMutation.isPending || capturePayPalOrderMutation.isPending}
      className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white"
      size="lg"
    >
      {isLoading || createPayPalOrderMutation.isPending || capturePayPalOrderMutation.isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          处理中...
        </>
      ) : (
        "用 PayPal 支付"
      )}
    </Button>
  );
}
