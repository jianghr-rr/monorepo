/**
 * @file 主导航模块的布局
 */
import type { ReactNode } from 'react';

function PageLayout({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="hidden h-full lg:block">
        <div className="flex h-full justify-between overflow-hidden">
          <div className="flex-1 shrink-0 grow-0 p-4">{sidebar}</div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
      <div className="lg:hidden">
        {sidebar}
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
