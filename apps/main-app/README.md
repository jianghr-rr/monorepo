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
## Nested Layouts 嵌套布局
create app/drinks/layout.tsx  
``` javaScript
import type { ReactNode } from 'react';
export default function DrinksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-xl ">
      <div className="mockup-code mb-8">
        <pre data-prefix="$">
          <code>npx create-next-app@latest nextjs-tutorial</code>
        </pre>
      </div>
      {children}
    </div>
  );
}
```  
## Dynamic Routes 动态路由
app/drinks/[id]/page.js  
``` javaScript
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import Link from 'next/link';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
// import drinkImg from './drink.jpg';
const getSingleDrink = async (id: string) => {
  const res = await fetch(`${url}${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch a drink...');
  }
  return res.json();
};

const SingleDrinkPage = async ({ params }: { params: { id: string } }) => {
  const data: any = await getSingleDrink(params.id);
  const title = data?.drinks[0]?.strDrink;
  const imgSrc = data?.drinks[0]?.strDrinkThumb;

  return (
    <div>
      <Link href="/drinks" className="btn btn-primary mb-12 mt-8">
        back to drinks
      </Link>

      <Image
        src={imgSrc}
        width={300}
        height={300}
        className="mb-4 size-48 rounded-lg shadow-lg"
        priority
        alt={title}
      />
      {/* <Image src={drinkImg} className='w-48 h-48 rounded-lg' alt='drink' /> */}
      <h1 className="mb-8 text-4xl">{title}</h1>
    </div>
  );
};
export default SingleDrinkPage;

```
## Next Image Component 图像组件
Next.js Image 组件扩展了 HTML  元素，具有自动图像优化功能：
- 大小优化：使用 WebP 和 AVIF 等现代图像格式，自动为每个设备提供正确大小的图像。
- 视觉稳定性：防止在加载图像时自动切换布局。
- 更快的页面加载：图像只有在使用本机浏览器延迟加载进入视口时才会加载，并带有可选的模糊占位符。
- 灵活性：按需调整图像大小，即使对于存储在远程服务器上的图像也是如此
### Remote Images 远程图像
- 若要使用远程图像，src 属性应为 URL 字符串。
- 由于Next.js在构建过程中无法访问远程文件，因此您需要手动提供宽度、高度和可选的 blurDataURL。
- width 和 height 属性用于推断图像的正确纵横比，并避免图像加载时出现布局偏移。宽度和高度不决定图像文件的呈现大小。
- 要安全地允许优化图像，请在 next.config.js 中定义支持的 URL 模式列表。尽可能具体，以防止恶意使用。
- priority 属性，确定要加载的图像的优先级
### Remote Images - Responsive 远程图像 - 响应式
- fill属性允许您按其父元素调整图像大小
- sizes 属性可帮助浏览器根据用户的设备和屏幕尺寸选择最合适的图像大小进行加载，从而提高网站性能和用户体验。
## More Routing 更多路由
- Private Folders _folder 私人文件夹 _folder
- Route Groups (dashboard) 路由组（仪表板）
- Dynamic Routes 动态路由
  - [...folder] - Catch-all route segment
  - [[...folder]] Optional catch-all route segment (used by Clerk)
create app/(dashboard)/auth/[sign-in]  
``` javaScript
const SignInPage = () => {
  //   console.log(params);
  return <h1 className="text-7xl">SignInPage</h1>;
};
export default SignInPage;
```
## mysql
连接mysql数据库
``` bash
npm install mysql2 --save-dev
npm install drizzle-orm --save-dev
npm install drizzle-kit --save-dev
```
db/index.ts
``` javaScript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

if (
  !process.env.MYSQL_HOST ||
  !process.env.MYSQL_POST ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASSWORD ||
  !process.env.MYSQL_DATABASE
) {
  throw new Error('no mysql config');
}

// 创建数据库连接池
const poolConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_POST),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(poolConnection);
```
.env
``` bash
MYSQL_HOST=xxx
MYSQL_POST=xxx
MYSQL_USER=xxx
MYSQL_PASSWORD=xxx
MYSQL_DATABASE=xxx
```
创建表及更新
``` bash
  "migrations:generate": "drizzle-kit generate:mysql --config=drizzle.config.ts",
  "migrations:drop": "drizzle-kit drop --config=drizzle.config.ts",
  "db:push": "drizzle-kit push:mysql --config=drizzle.config.ts"
```
``` bash
npm run db:push
npm run migrations:generate
```