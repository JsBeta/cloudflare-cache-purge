# 🧹 Cloudflare 缓存清除工具-使用说明

> 一个好用的 Cloudflare 缓存清理工具，支持清除当前页面链接缓存、图片/CSS/JS 资源缓存，以及自定义多个 URL 的缓存清除。

## 🔧 功能概览

-   ✅ 配置 Cloudflare API Token
-   ✅ 清除当前 url 链接缓存
-   ✅ 清除页面中引用的图片资源缓存
-   ✅ 清除页面中引用的 CSS 文件缓存
-   ✅ 清除页面中引用的 JS 文件缓存
-   ✅ 手动输入多个 URL 进行缓存清除
-   ✅ 瀑布流展示图片资源，支持多选清除

---

## 📦 安装方式

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或其他兼容的用户脚本管理器。
2. 下载或复制本脚本 `main.user.js`。
3. 在 Tampermonkey 中点击 **“创建新脚本”** 或 **“导入/导出” > “导入脚本”**。
4. 浏览并选择你的 `.user.js` 文件进行安装。

---

## ⚙️ 配置 API Token

在使用前必须配置 Cloudflare 的 API Token：

### 步骤：

1. 点击浏览器右上角 Tampermonkey 图标。
2. 找到 **Cloudflare 清除** 脚本 → 点击右侧菜单中的 **“配置 API Token”**。
3. 输入你从 Cloudflare 获取的全局或作用域 API Token（需有 Purge Cache 权限）。
4. 点击确认保存。

> 💡 提示：可以在 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) 创建具有 `Purge Cache` 权限的 Token。

---

## 🚀 使用教程

### 🧭 主要功能入口（浮动菜单）

脚本会在页面右侧显示一个浮动按钮（🔧），鼠标悬停后会展开功能菜单。
![入口](https://raw.githubusercontent.com/JsBeta/images-bed/main/img/vscode/20250715174006.png)

#### 1. 🖼️ 清除图片缓存

-   点击菜单中的 **“图片文件”**
-   弹出包含所有页面加载的图片链接列表（含背景图）
-   勾选需要清除缓存的图片
-   点击 **“清除”** 按钮即可批量清除
    ![清除图片](https://raw.githubusercontent.com/JsBeta/images-bed/main/img/vscode/20250715174643.png)

#### 2. 🎨 清除 CSS 缓存

-   点击菜单中的 **“CSS 文件”**
-   勾选需要清除缓存的 CSS 地址
-   点击 **“清除”**
    ![清除css](https://raw.githubusercontent.com/JsBeta/images-bed/main/img/vscode/20250715174940.png)

#### 3. 📜 清除 JS 缓存

-   点击菜单中的 **“JS 文件”**
-   勾选需要清除缓存的 JS 地址
-   点击 **“清除”**
    ![清除js](https://raw.githubusercontent.com/JsBeta/images-bed/main/img/vscode/20250715175156.png)

#### 4. 🔗 清除当前链接缓存

-   点击菜单中的 **“当前链接”**
-   将自动清除当前页面地址的缓存
-   该功能可以在某些资源没有在缓存列表中的情况下使用，使用浏览器的 **“开发者工具”** 找到对应资源，在新建页面打开，让后就可以直接点击这个按钮清除当前这个资源的缓存

#### 5. 📝 清除多个 URL 缓存

-   点击菜单中的 **“多个链接”**
-   在弹出窗口的文本框中逐行输入多个 URL
-   点击 **“清除”**

---

## 📷 瀑布流图片展示（可选布局）

当你选择 **“图片文件”** 时，脚本会以瀑布流形式展示所有图片资源，方便快速浏览和选择。

---

## 📌 注意事项

| 项目                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| ✅ 页面完全加载后生效 | 脚本监听了 `window.onload`，确保页面资源加载完成后才注入界面 |
| 🔐 API Token 权限要求 | 必须拥有 `Purge Cache` 权限                                  |
| 🌐 支持任意网站       | `@include *` 表示该脚本适用于所有网页                        |
| 📊 自动识别域名       | 脚本会自动提取当前页面域名并查询对应的 Zone ID               |
| 🔄 清除成功后刷新页面 | 清除缓存后会自动刷新当前页面                                 |

---

## ❓ 常见问题

### Q: 清除失败怎么办？

A: 检查是否正确配置了 API Token，并确保其具备 `Purge Cache` 权限。

### Q: 为什么找不到某些图片或资源？

A: 页面可能使用懒加载或其他异步加载方式。建议直接使用审查元素功能，找到对应的资源，在新的页面打开，这样在新页面中就能使用功能菜单中的“当前链接”进行缓存清除。也可以尝试使用浏览器的“网络”功能，将页面加载到浏览器中，然后查看资源请求的 URL，并手动输入该 URL 进行缓存清除。

### Q: 可否用于子路径缓存清除？

A: 当前只清除了完整的 URL 缓存，如需更细粒度控制，请手动输入完整路径。

---

## 🛡️ 版权与作者

-   **作者**: Xuwei
-   **项目名称**: Cloudflare 清除工具
-   **项目地址**: [https://github.com/JsBeta/cloudflare-cache-purge/](https://github.com/JsBeta/cloudflare-cache-purge/)
-   **许可证**: MIT

---

## 📬 贡献建议

欢迎提交 PR、Issue
