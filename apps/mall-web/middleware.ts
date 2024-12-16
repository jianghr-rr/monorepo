/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

export function middleware(request: NextRequest) {
  const response = i18nRouter(request as any, i18nConfig);
  // 获取当前路径
  const { pathname } = request.nextUrl;

  // 检查是否访问受保护路由
  if (pathname.startsWith('/user-info')) {
    const isAuthenticated = request.cookies.get('authToken'); // 替换为实际的认证逻辑
    console.log('isAuthenticated', isAuthenticated);
    console.log('isAuthenticated2', isAuthenticated);
    if (!isAuthenticated) {
      // 未认证，重定向到登录页面
      return NextResponse.redirect(new URL('http://localhost:4001/'));
    }
  }

  // 返回处理后的响应
  return response;
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
