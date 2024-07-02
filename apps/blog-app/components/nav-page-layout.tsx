/**
 * @file 主导航模块的布局
 */
import type { ReactNode } from 'react';
import initTranslations from '~/app/i18n';
import PagePorgress from '~/components/nav-page-progress';
import PageTransition from '~/components/nav-page-transition';
import TranslationsProvider from '~/components/translations-provider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';

async function PatternsLayout({
  params: { locale },
  i18nNamespaces,
  sidebar,
  children,
}: {
  params: { locale: string };
  i18nNamespaces: string[];
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel defaultSize={18}>
          <div className="bg-muted text-muted-foreground flex h-screen flex-col p-2">
            <div className="flex-auto overflow-y-auto pb-8">{sidebar}</div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
          <PageTransition>
            <PagePorgress>{children}</PagePorgress>
          </PageTransition>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TranslationsProvider>
  );
}

export default PatternsLayout;
