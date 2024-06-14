import type { Metadata } from 'next';
import { inter, lexend } from '~/app/fonts';
import HomeNav from '~/components/home-nav';
import { AppProviders } from '~/providers/app-providers';
import './globals.css';

export const metadata: Metadata = {
  title: '智能知识库',
  description: 'knowledge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`h-full scroll-smooth ${inter.variable} ${inter.className} ${lexend.className}`}
    >
      <body className="flex h-full flex-col">
        <AppProviders>
          <HomeNav />
          <main className="mx-auto max-w-6xl px-8 py-24 ">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
