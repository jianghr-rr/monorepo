import type { ReactNode } from 'react';
import initTranslations from '~/app/i18n';
import TranslationsProvider from '~/components/translations-provider';

const i18nNamespaces = ['about', 'test'];

async function About({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}

export default About;
