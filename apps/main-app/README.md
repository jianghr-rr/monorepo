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