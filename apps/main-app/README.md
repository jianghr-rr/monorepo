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
