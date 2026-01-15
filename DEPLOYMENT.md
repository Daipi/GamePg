# 部署平台对比：Vercel vs Cloudflare Pages

## 主要区别

### Vercel
- **优势**：
  - 部署速度极快（全球 CDN）
  - 自动 HTTPS 和自定义域名
  - 与 Next.js 等框架深度集成
  - 提供 Serverless Functions（后端 API）
  - 预览部署（每个 PR 都有预览链接）
  - 分析工具（访问统计）
  
- **劣势**：
  - 免费额度相对较小
  - 主要面向前端开发者

### Cloudflare Pages
- **优势**：
  - **免费额度更大**（无限带宽，100,000 次构建/月）
  - 与 Cloudflare 生态集成（CDN、DDoS 防护、WAF）
  - 支持 Workers（边缘计算，类似 Serverless）
  - 全球边缘网络性能优秀
  - 免费 SSL 证书
  
- **劣势**：
  - 构建速度可能稍慢
  - 界面相对简单

## 收费对比（免费版）

| 功能 | Vercel Hobby | Cloudflare Pages Free |
|------|--------------|----------------------|
| **带宽** | 100 GB/月 | **无限** |
| **构建次数** | 100 次/天 | 500 次/月（约 16 次/天） |
| **Serverless Functions** | 100 GB-小时/月 | Workers（10 万请求/天） |
| **团队协作** | 1 个成员 | 无限制 |
| **自定义域名** | ✅ 免费 | ✅ 免费 |
| **HTTPS** | ✅ 自动 | ✅ 自动 |
| **预览部署** | ✅ 每个 PR | ✅ 每个 PR |

## 推荐选择

- **纯静态网站（如本项目）**：**Cloudflare Pages**（免费额度更大）
- **需要 Serverless API**：**Vercel**（更易用）
- **需要边缘计算**：**Cloudflare Pages + Workers**
- **Next.js/React 项目**：**Vercel**（原生支持）

---

## 对于本项目（Tai Chi Walking 静态站）

**推荐：Cloudflare Pages**
- 纯静态，不需要构建
- 免费带宽无限，适合流量增长
- 全球 CDN 性能好
