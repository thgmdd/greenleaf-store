// ============================================================
// OrderConfirmation.tsx - 订单确认页面\n// ============================================================

import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const orderNumber = new URLSearchParams(searchParams).get("orderNumber");

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getOrderQuery = trpc.payment.getOrder.useQuery(
    { orderNumber: orderNumber || "" },
    { enabled: !!orderNumber }
  );

  useEffect(() => {
    if (getOrderQuery.data) {
      setOrderData(getOrderQuery.data);
      setIsLoading(false);
    }
    if (getOrderQuery.error) {
      setError("无法加载订单信息");
      setIsLoading(false);
    }
  }, [getOrderQuery.data, getOrderQuery.error]);

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] flex items-center justify-center py-12">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-12 pb-12 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">订单号缺失</h2>
            <p className="text-gray-600 mb-6">无法找到订单信息</p>
            <Button onClick={() => setLocation("/")} className="bg-[#1a4d3e] hover:bg-[#0f3428]">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || getOrderQuery.isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] flex items-center justify-center py-12">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin text-[#1a4d3e]" />
            <p className="text-gray-600">加载订单信息中...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] flex items-center justify-center py-12">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-12 pb-12 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">出错了</h2>
            <p className="text-gray-600 mb-6">{error || "无法加载订单信息"}</p>
            <Button onClick={() => setLocation("/")} className="bg-[#1a4d3e] hover:bg-[#0f3428]">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const items = Array.isArray(orderData.items) ? orderData.items : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white mb-8">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-3xl font-bold mb-2">订单确认</h1>
              <p className="text-gray-600 mb-4">感谢您的购买！</p>
              <p className="text-xl font-semibold text-[#1a4d3e]">订单号: {orderData.orderNumber}</p>
            </CardContent>
          </Card>

          {/* 订单详情 */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle>订单详情</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">订单状态</p>
                  <p className="font-semibold capitalize">{orderData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">支付方式</p>
                  <p className="font-semibold">PayPal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">订单日期</p>
                  <p className="font-semibold">
                    {new Date(orderData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">订单总额</p>
                  <p className="font-semibold text-lg text-[#1a4d3e]">
                    ${parseFloat(orderData.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 订单项目 */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle>订单项目</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">数量: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">${parseFloat(item.price).toFixed(2)}/件</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 收货地址 */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle>收货地址</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{orderData.shippingAddress?.name}</p>
                <p>{orderData.shippingAddress?.address}</p>
                <p>
                  {orderData.shippingAddress?.city}, {orderData.shippingAddress?.state}{" "}
                  {orderData.shippingAddress?.postalCode}
                </p>
                <p>{orderData.shippingAddress?.country}</p>
                <p className="text-sm text-gray-600">电话: {orderData.shippingAddress?.phone}</p>
                <p className="text-sm text-gray-600">邮箱: {orderData.shippingAddress?.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* 后续步骤 */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle>后续步骤</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-gray-700">
                  我们已收到您的订单，将在 24 小时内确认。
                </li>
                <li className="text-gray-700">
                  您将通过邮件收到订单确认和追踪信息。
                </li>
                <li className="text-gray-700">
                  商品将在 3-7 个工作日内发货。
                </li>
                <li className="text-gray-700">
                  如有任何问题，请通过邮件或客服联系我们。
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <Button
              onClick={() => setLocation("/")}
              className="flex-1 bg-[#1a4d3e] hover:bg-[#0f3428]"
            >
              继续购物
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.print()}
            >
              打印订单
            </Button>
          </div>

          {/* 联系信息 */}
          <Card className="bg-[#f0f9f7] mt-8 border-[#1a4d3e]">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700">
                <strong>需要帮助？</strong> 请联系我们的客服团队：
                <br />
                邮件: support@greenleafstore.com
                <br />
                电话: +1-800-GREENLEAF
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
