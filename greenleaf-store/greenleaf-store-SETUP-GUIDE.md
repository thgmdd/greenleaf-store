# 绿意家居 - 仿真绿植独立站 | 完整项目运行指南

## 📦 项目概览

这是一个完整的全栈电商平台，包含：
- **前端**：React 19 + TypeScript + Tailwind CSS 4
- **后端**：Express 4 + tRPC 11 + MySQL/TiDB
- **支付**：PayPal 集成（需配置 API 密钥）
- **数据库**：Drizzle ORM + MySQL
- **认证**：Manus OAuth（可选）

**产品库**：100+ 款仿真绿植产品，8 大分类，40+ 款小型盆栽配备多角度照片和视频

---

## 🚀 快速开始

### 前置要求
- **Node.js** 18+ 或 **pnpm** 10+
- **MySQL** 8.0+ 或 **TiDB** 兼容的数据库
- **Git**（可选）

### 1️⃣ 解压项目

```bash
tar -xzf greenleaf-store-complete.tar.gz
cd greenleaf-store
```

### 2️⃣ 安装依赖

```bash
# 使用 pnpm（推荐，已包含在项目中）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 3️⃣ 配置数据库

#### 方案 A：使用本地 MySQL（推荐用于开发）

```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE greenleaf_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# 配置连接字符串
# 编辑项目根目录的 .env 文件（如果不存在则创建）
DATABASE_URL="mysql://root:password@localhost:3306/greenleaf_store"
```

#### 方案 B：使用云数据库（如 TiDB Cloud、AWS RDS）

```bash
# 在 .env 中配置远程数据库连接
DATABASE_URL="mysql://username:password@host:port/database_name"
```

### 4️⃣ 初始化数据库 Schema

```bash
# 生成迁移文件并推送到数据库
pnpm db:push

# 验证数据库连接
mysql -u root -p greenleaf_store -e "SHOW TABLES;"
```

### 5️⃣ 配置环境变量

创建 `.env` 文件（项目根目录），包含以下变量：

```env
# 数据库
DATABASE_URL="mysql://root:password@localhost:3306/greenleaf_store"

# JWT 密钥（用于会话加密，可随意生成）
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# PayPal 配置（可选，需要真实的 PayPal 账户）
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_MODE="sandbox"  # 开发环境使用 sandbox，生产环境改为 live

# Manus OAuth（可选，仅在使用 Manus 认证时需要）
VITE_APP_ID="your-manus-app-id"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://manus.im/login"

# 其他配置
VITE_APP_TITLE="绿意家居"
NODE_ENV="development"
```

### 6️⃣ 启动开发服务器

```bash
# 启动 Express 后端 + Vite 前端（热重载）
pnpm dev

# 服务器将运行在 http://localhost:3000
```

### 7️⃣ 构建生产版本

```bash
# 编译前端和后端
pnpm build

# 启动生产服务器
pnpm start
```

---

## 📁 项目结构

```
greenleaf-store/
├── client/                          # 前端代码（React）
│   ├── src/
│   │   ├── components/              # React 组件
│   │   │   ├── MiniPottedSection.tsx    # 小型盆栽专区（100+ 款产品）
│   │   │   ├── ProductDetailModal.tsx   # 产品详情模态框（多角度照片+视频）
│   │   │   ├── CartDrawer.tsx           # 购物车侧边栏
│   │   │   ├── Navbar.tsx               # 导航栏
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx             # 主页
│   │   │   ├── Checkout.tsx         # 结账页面
│   │   │   ├── OrderConfirmation.tsx # 订单确认页面
│   │   │   └── ...
│   │   ├── lib/
│   │   │   ├── mini-potted-plants.ts    # 100+ 款小型盆栽产品数据
│   │   │   ├── data.ts              # 其他产品数据
│   │   │   └── trpc.ts              # tRPC 客户端
│   │   ├── App.tsx                  # 主应用入口
│   │   ├── main.tsx                 # 应用启动文件
│   │   └── index.css                # 全局样式
│   ├── public/                      # 静态资源
│   └── index.html
│
├── server/                          # 后端代码（Express + tRPC）
│   ├── routers.ts                   # tRPC 路由定义
│   ├── db.ts                        # 数据库查询助手
│   ├── payment.ts                   # PayPal 支付服务
│   ├── orders.ts                    # 订单管理
│   ├── paymentRouter.ts             # 支付相关 API
│   ├── _core/
│   │   ├── index.ts                 # Express 服务器入口
│   │   ├── context.ts               # tRPC 上下文
│   │   ├── trpc.ts                  # tRPC 配置
│   │   ├── oauth.ts                 # OAuth 认证
│   │   ├── llm.ts                   # LLM 集成
│   │   ├── imageGeneration.ts        # 图片生成
│   │   └── ...
│   └── *.test.ts                    # 单元测试
│
├── drizzle/                         # 数据库 Schema
│   ├── schema.ts                    # 数据库表定义
│   ├── migrations/                  # 数据库迁移文件
│   └── meta/
│
├── shared/                          # 共享代码
│   ├── const.ts                     # 常量定义
│   └── types.ts                     # 类型定义
│
├── storage/                         # 文件存储（S3）
│   └── index.ts                     # S3 上传/下载助手
│
├── package.json                     # 项目依赖配置
├── pnpm-lock.yaml                   # 依赖锁定文件
├── tsconfig.json                    # TypeScript 配置
├── vite.config.ts                   # Vite 构建配置
├── vitest.config.ts                 # 单元测试配置
├── drizzle.config.ts                # Drizzle ORM 配置
├── .env                             # 环境变量（需手动创建）
└── README.md                        # 项目说明
```

---

## 🗄️ 数据库表结构

### users（用户表）
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### orders（订单表）
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderNumber VARCHAR(50) UNIQUE NOT NULL,
  userId INT,
  items JSON NOT NULL,
  totalAmount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  paymentMethod VARCHAR(50),
  paymentId VARCHAR(255),
  shippingAddress TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### carts（购物车表）
```sql
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT UNIQUE,
  items JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

---

## 🔧 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（热重载）
pnpm check            # TypeScript 类型检查
pnpm format           # 代码格式化

# 数据库
pnpm db:push          # 推送 Schema 更改到数据库
pnpm db:studio        # 打开 Drizzle Studio（数据库 GUI）

# 测试
pnpm test             # 运行所有单元测试
pnpm test:watch       # 监听模式运行测试

# 构建
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 其他
pnpm install          # 安装依赖
pnpm update           # 更新依赖
```

---

## 💳 PayPal 支付配置

### 获取 PayPal API 密钥

1. 访问 [PayPal Developer Dashboard](https://developer.paypal.com)
2. 登录或注册 PayPal 开发者账户
3. 创建应用（Sandbox 用于测试，Live 用于生产）
4. 获取 **Client ID** 和 **Secret**
5. 在 `.env` 中配置：

```env
PAYPAL_CLIENT_ID="your-client-id"
PAYPAL_CLIENT_SECRET="your-client-secret"
PAYPAL_MODE="sandbox"  # 开发环境
```

### 测试支付流程

1. 启动开发服务器：`pnpm dev`
2. 打开 http://localhost:3000
3. 添加产品到购物车
4. 点击"结账"进入支付页面
5. 使用 PayPal Sandbox 测试账户完成支付
6. 查看订单确认页面

---

## 🔐 安全建议

### 生产环境部署前

1. **更改 JWT_SECRET**
   ```bash
   # 生成强随机密钥
   openssl rand -base64 32
   ```

2. **配置 HTTPS**
   - 使用 SSL 证书
   - 配置 CORS 白名单
   - 设置安全的 Cookie 选项

3. **数据库安全**
   - 使用强密码
   - 启用数据库备份
   - 限制数据库访问 IP

4. **API 密钥管理**
   - 使用密钥管理服务（如 AWS Secrets Manager）
   - 定期轮换密钥
   - 不要在代码中硬编码密钥

5. **环境变量**
   - 在生产环境使用环境变量管理所有敏感信息
   - 不要提交 `.env` 文件到 Git

---

## 🐛 故障排除

### 问题 1：数据库连接失败

```bash
# 检查 MySQL 服务是否运行
mysql -u root -p -e "SELECT 1;"

# 验证连接字符串
echo $DATABASE_URL

# 查看错误日志
pnpm dev 2>&1 | grep -i error
```

### 问题 2：端口 3000 已被占用

```bash
# 更改端口（编辑 server/_core/index.ts）
# 或使用环境变量
PORT=3001 pnpm dev
```

### 问题 3：前端无法连接到后端

```bash
# 检查后端是否运行
curl http://localhost:3000/api/trpc

# 检查 CORS 配置（server/_core/index.ts）
# 确保前端 URL 在白名单中
```

### 问题 4：PayPal 支付失败

```bash
# 检查 PayPal 凭证是否正确
# 确保使用的是 Sandbox 还是 Live 模式
# 查看后端日志获取详细错误信息
```

---

## 📱 响应式设计

项目使用 Tailwind CSS 4 实现完全响应式设计：
- **移动设备**：320px+
- **平板**：768px+
- **桌面**：1024px+
- **大屏**：1280px+

---

## 🎨 自定义品牌

### 修改品牌色

编辑 `client/src/index.css`：

```css
@theme {
  --color-primary: oklch(0.52 0.16 142);  /* 深苔绿 */
  --color-secondary: oklch(0.95 0.01 145); /* 暖白 */
  /* 更多颜色配置... */
}
```

### 修改网站标题和 Logo

编辑 `client/index.html`：

```html
<title>绿意家居 - 仿真绿植专卖店</title>
<link rel="icon" href="/favicon.ico" />
```

---

## 📊 产品数据管理

### 添加新产品

编辑 `client/src/lib/mini-potted-plants.ts`：

```typescript
{
  id: "new-001",
  sku: "new-001",
  name: "新产品名称",
  subtitle: "产品副标题",
  variety: "多肉",  // 品种分类
  price: 99,
  originalPrice: 149,
  image: "https://cdn-url.com/image.jpg",
  images: ["url1", "url2", "url3"],  // 多角度照片
  video: "https://cdn-url.com/video.mp4",  // 产品视频
  rating: 4.8,
  reviews: 123,
  description: "产品描述...",
  features: ["特性1", "特性2"],
  placement: ["床头", "窗台"],
  isHot: true,  // 热销标签
  isNew: false,  // 新品标签
  inStock: true,
}
```

### 修改产品图片 URL

所有产品图片存储在 CDN 上，修改 `image` 和 `images` 字段即可。

---

## 🚀 部署到生产环境

### 推荐的部署平台

1. **Vercel**（前端）+ **Railway/Render**（后端）
2. **AWS**（EC2 + RDS）
3. **DigitalOcean**（App Platform）
4. **Heroku**（简单快速）

### 部署步骤

```bash
# 1. 构建项目
pnpm build

# 2. 上传到部署平台
# 3. 配置环境变量
# 4. 配置数据库
# 5. 启动服务
pnpm start
```

---

## 📞 技术支持

- **前端框架**：[React 文档](https://react.dev)
- **后端框架**：[tRPC 文档](https://trpc.io)
- **数据库**：[Drizzle ORM 文档](https://orm.drizzle.team)
- **样式**：[Tailwind CSS 文档](https://tailwindcss.com)
- **支付**：[PayPal 开发者文档](https://developer.paypal.com)

---

## 📝 许可证

MIT License - 可自由使用和修改

---

**祝您使用愉快！如有任何问题，欢迎反馈。** 🌿
