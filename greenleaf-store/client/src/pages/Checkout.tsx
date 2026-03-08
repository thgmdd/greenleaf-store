// ============================================================
// Checkout.tsx - 结账页面
// ============================================================

import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import PayPalButton from "@/components/PayPalButton";
import { ArrowLeft, ShoppingBag } from "lucide-react";

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // 从 localStorage 获取购物车数据
  const cartData = localStorage.getItem("cart");
  const cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSuccess = (orderNumber: string) => {
    // 清空购物车
    localStorage.removeItem("cart");
    // 重定向到订单确认页面
    setLocation(`/order-confirmation?orderNumber=${orderNumber}`);
  };

  const handlePaymentError = (error: string) => {
    toast.error(`支付失败: ${error}`);
  };

  // 验证表单
  const isFormValid = formData.name && formData.email && formData.phone && formData.address;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white mb-8"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Button>

          <Card className="max-w-2xl mx-auto bg-white">
            <CardContent className="pt-12 pb-12 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">购物车为空</h2>
              <p className="text-gray-600 mb-6">请先添加商品到购物车</p>
              <Button onClick={() => setLocation("/")} className="bg-[#1a4d3e] hover:bg-[#0f3428]">
                继续购物
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a4d3e] to-[#0f3428] py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="text-white mb-8"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回购物
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 订单摘要 */}
          <div className="lg:col-span-2">
            <Card className="bg-white mb-8">
              <CardHeader>
                <CardTitle>订单摘要</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center pb-4 border-b">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">数量: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}/件</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 收货地址 */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>收货地址</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名 *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="请输入姓名"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">电话 *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="请输入电话号码"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">邮箱 *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="请输入邮箱"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">地址 *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="请输入详细地址"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">城市</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="城市"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">州/省</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="州/省"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">邮编</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="邮编"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">国家</Label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a4d3e]"
                      >
                        <option value="US">美国</option>
                        <option value="CN">中国</option>
                        <option value="GB">英国</option>
                        <option value="CA">加拿大</option>
                        <option value="AU">澳大利亚</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 支付摘要 */}
          <div>
            <Card className="bg-white sticky top-4">
              <CardHeader>
                <CardTitle>支付摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>小计</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>运费</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>税费</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>总计</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <PayPalButton
                    amount={totalAmount.toFixed(2)}
                    currency="USD"
                    description={`Green Leaf Store Order - ${totalQuantity} items`}
                    items={cartItems.map((item) => ({
                      productId: item.productId,
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price.toFixed(2),
                    }))}
                    shippingAddress={formData}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setLocation("/")}
                  >
                    继续购物
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  * 必填项。请确保地址信息准确无误。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
