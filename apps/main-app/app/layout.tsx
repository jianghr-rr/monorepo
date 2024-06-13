import type { Metadata } from 'next';
import { inter, lexend } from '~/app/fonts';
import { ThemeProvider } from '~/components/theme-provider';
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
