import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import initTranslations from '~/app/i18n';
import TranslationsProvider from '~/components/translations-provider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';

const i18nNamespaces = ['interview'];

const DynamicSidebar = dynamic<{
  children: ReactNode;
}>(() => import('./@sidebar/page'), {
  ssr: false,
});

async function InterviewLayout({
  params: { locale },
  sidebar,
  children,
}: {
  params: { locale: string };
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
            <div className="flex-auto overflow-y-auto">
              <DynamicSidebar>{sidebar}</DynamicSidebar>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
          <div className="relative box-border flex h-full flex-col overflow-auto p-4 px-10">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TranslationsProvider>
  );
}

export default InterviewLayout;
