/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file 主导航模块的布局
 */
import { AlignJustify } from 'lucide-react';
import type { ReactNode } from 'react';
import initTranslations from '~/app/i18n';
import PagePorgress from '~/components/nav-page-progress';
import PageTransition from '~/components/nav-page-transition';
import TranslationsProvider from '~/components/translations-provider';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';

async function PatternsLayout({
  params: { locale },
  i18nNamespaces,
  sidebar,
  breadcrumb,
  children,
}: {
  params: { locale: string };
  i18nNamespaces: string[];
  sidebar: ReactNode;
  breadcrumb: ReactNode;
  children: ReactNode;
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="hidden lg:block">
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
      </div>
      <div className="lg:hidden">
        <Drawer>
          <div className="flex items-center justify-start p-0">
            <DrawerTrigger>
              <AlignJustify className="fixed bottom-3 left-3 z-20 mr-3" />
            </DrawerTrigger>
          </div>
          <DrawerContent>
            <DrawerHeader>
              <DrawerDescription>{sidebar}</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>

        <PageTransition>
          <PagePorgress>{children}</PagePorgress>
        </PageTransition>
      </div>
    </TranslationsProvider>
  );
}

export default PatternsLayout;
