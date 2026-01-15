# 后端部署方案指南

## 方案对比

### 1. Vercel Serverless Functions（推荐用于简单 API）

**适用场景**：
- REST API
- 简单的数据库操作
- 文件上传处理
- 第三方 API 集成

**优点**：
- ✅ 与前端同平台，部署简单
- ✅ 自动扩缩容
- ✅ 按使用量付费（免费额度：100 GB-小时/月）
- ✅ 支持 Node.js、Python、Go 等

**缺点**：
- ❌ 执行时间限制（10 秒，Pro 版 60 秒）
- ❌ 冷启动延迟
- ❌ 不适合长时间运行的任务

**示例结构**：
```
project/
├── index.html          # 前端
├── api/                # Serverless Functions
│   ├── hello.js        # /api/hello
│   └── users.js        # /api/users
└── vercel.json
```

**部署**：直接 `git push`，Vercel 自动识别 `api/` 目录

---

### 2. Cloudflare Workers（推荐用于边缘计算）

**适用场景**：
- 边缘 API（全球低延迟）
- 请求转发/代理
- 简单的数据处理
- 与 Cloudflare Pages 集成

**优点**：
- ✅ 全球边缘网络（极低延迟）
- ✅ 免费额度大（10 万请求/天）
- ✅ 与 Cloudflare Pages 无缝集成
- ✅ 支持 WebAssembly

**缺点**：
- ❌ CPU 时间限制（10ms 免费版，50ms Pro）
- ❌ 不适合复杂计算
- ❌ 不支持传统数据库连接（需用 D1/KV）

**示例**：
```javascript
// functions/api/hello.js
export async function onRequest(context) {
  return new Response(JSON.stringify({ message: "Hello" }), {
    headers: { "Content-Type": "application/json" }
  });
}
```

---

### 3. Railway / Render（推荐用于传统后端）

**适用场景**：
- Node.js/Express 后端
- Python/Django/Flask
- 需要持久连接（WebSocket）
- 传统数据库（PostgreSQL、MySQL）

**优点**：
- ✅ 支持完整后端框架
- ✅ 数据库托管
- ✅ WebSocket 支持
- ✅ 无执行时间限制
- ✅ 环境变量管理

**缺点**：
- ❌ 需要单独部署（与前端分离）
- ❌ 免费额度有限（Railway $5/月，Render 有免费但会休眠）

**部署步骤**：
1. 创建后端项目（如 Express）
2. 连接 GitHub 仓库
3. 配置环境变量
4. 自动部署

---

### 4. Supabase / Firebase（BaaS - Backend as a Service）

**适用场景**：
- 实时数据库
- 用户认证
- 文件存储
- 实时订阅

**优点**：
- ✅ 开箱即用的后端服务
- ✅ 免费额度充足
- ✅ 实时功能强大
- ✅ 无需管理服务器

**缺点**：
- ❌ 供应商锁定
- ❌ 自定义逻辑受限

---

## 推荐方案选择

| 需求 | 推荐方案 |
|------|---------|
| **简单 API（CRUD）** | Vercel Functions |
| **边缘 API（低延迟）** | Cloudflare Workers |
| **完整后端（Express/Django）** | Railway / Render |
| **实时数据库 + 认证** | Supabase / Firebase |
| **静态站 + 少量 API** | Vercel Functions（最简单） |

---

## 实际部署示例

### 示例 1：Vercel + Serverless Functions

**项目结构**：
```
GamePg/
├── index.html
├── api/
│   └── contact.js      # 处理联系表单
└── vercel.json
```

**`api/contact.js`**：
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, email, message } = req.body;
  
  // 发送邮件或保存到数据库
  // ...
  
  return res.status(200).json({ success: true });
}
```

**访问**：`https://yourdomain.com/api/contact`

---

### 示例 2：Cloudflare Pages + Workers

**项目结构**：
```
GamePg/
├── index.html
└── functions/
    └── api/
        └── hello.js
```

**`functions/api/hello.js`**：
```javascript
export async function onRequest() {
  return new Response(JSON.stringify({ message: "Hello from Worker" }), {
    headers: { "Content-Type": "application/json" }
  });
}
```

**访问**：`https://yourdomain.pages.dev/api/hello`

---

### 示例 3：前后端分离（推荐用于复杂项目）

**前端**：部署到 Vercel/Cloudflare Pages
**后端**：部署到 Railway/Render

**配置 CORS**：
```javascript
// 后端（Express 示例）
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

---

## 总结建议

**对于你的 Tai Chi Walking 项目**：

1. **当前阶段（纯静态）**：Cloudflare Pages ✅
2. **如果需要添加联系表单**：Vercel Functions（最简单）
3. **如果需要用户系统/数据库**：Railway + PostgreSQL 或 Supabase
4. **如果需要实时功能**：Supabase

**成本考虑**：
- 免费：Cloudflare Workers、Vercel Functions（小规模）
- 付费：Railway $5/月起、Render 有免费但会休眠
