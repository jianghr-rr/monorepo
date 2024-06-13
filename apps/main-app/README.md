# nextJs 14 入门
## Create Next App 创建应用  
```bash
npx create-next-app@latest appName
```
## Home Page 主页
- page.js在应用程序文件夹的根目录中
- React 组件（服务器组件）
``` javaScript
const HomePage = () => {
  return (
    <div>
      <h1 className='text-7xl'>HomePage</h1>
    </div>
  );
};
export default HomePage;
```
## Link Component 链接组件
- 在项目中导航
- 从“next/link”主页导入链接
``` javaScript
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 className='text-7xl'>HomePage</h1>
      <Link href='/about' className='text-2xl'>
        about page
      </Link>
    </div>
  );
};
export default HomePage;

```
## Nested Routes 嵌套路由
- app/about/info/page.tsx
- 如果一个URL中没有page.js将导致 404
``` javaScript
const AboutInfoPage = () => {
  return <h1 className='text-7xl'>AboutInfoPage</h1>;
};
export default AboutInfoPage;
```
## Challenge 挑战
创建以下页面
client, drinks, drizzle-example, query and tasks  
## Tailwind 和 DaisyUI
- 建议将样式名放在全局样式下
### 安装两个库
``` bash
npm i -D daisyui@latest
npm i -D @tailwindcss/typography
```
tailwind.config.js
``` javaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
```  
## 布局和模板
- layout.js
- template.js
layout.js在路由切换时不会重新加载，所以如果需要rerender功能，使用template.js
## 服务器组件与客户端组件
- 默认情况下，NEXT.JS 使用服务器组件!!!
- 要使用客户端组件，您可以添加 React “use client” 指令
### 服务器组件
好处:
- data fetching 数据获取
- security 安全
- caching 缓存
- bundle size 捆绑大小
### 客户端组件
好处:
- 交互性：客户端组件可以使用状态、效果和事件侦听器，这意味着它们可以向用户提供即时反馈并更新 UI。
- 浏览器 API：客户端组件可以访问浏览器 API，例如地理位置或 localStorage，允许您为特定用例构建 UI。
## 在服务器组件中获取数据
- 只需添加 Async 并开始使用 await 
- DB 也一样
- Next.js扩展了原生 Web fetch（） API，允许服务器上的每个请求设置自己的持久缓存语义。
## Loading Component 加载组件
特殊文件loading.js可帮助您使用 React Suspense 创建有意义的加载 UI。  
drinks/loading.tsx
``` javaScript
const loading = () => {
  return <span className="loading"></span>;
};
export default loading;
```
## Error Component 错误组件
error.js文件约定允许您在嵌套路由中正常处理意外的运行时错误。  
drinks/error.tsx
``` javaScript
'use client';

const error = (error: { error?: Error }) => {
  console.log(error);
  // return <div>there was an error...</div>;
  return <div>{error.error?.message}</div>;
};
export default error;

```