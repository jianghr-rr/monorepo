'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function PatternsPageSideBar({
  direction,
}: {
  direction: string;
}) {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        href: '',
        label: 'javascript',
        children: [
          { href: '/patterns/singleton', label: t('SingletonPattern') },
          { href: '/patterns/prototype', label: t('prototype.title') },
          { href: '/patterns/proxy-pattern', label: t('proxy.title') },
          { href: '/patterns/observer-pattern', label: t('observer.title') },
          { href: '/patterns/module-pattern', label: t('module.title') },
          { href: '/patterns/mixin-pattern', label: t('mixin.title') },
          {
            href: '/patterns/middleware-pattern',
            label: t('middleware.title'),
          },
          { href: '/patterns/flyweight-pattern', label: t('flyweight.title') },
          { href: '/patterns/factory-pattern', label: t('factory.title') },
          {
            href: '/patterns/animating-view-transitions',
            label: t('AnimatingViewTransitions.title'),
          },
          {
            href: '/patterns/optimize-your-loading-sequence',
            label: t('OptimizeYourLoadingSequence.title'),
          },
          {
            href: '/patterns/static-import',
            label: t('StaticImport.title'),
          },
          {
            href: '/patterns/dynamic-import',
            label: t('DynamicImport.title'),
          },
          {
            href: '/patterns/import-on-visibility',
            label: t('ImportOnVisibility.title'),
          },
          {
            href: '/patterns/import-on-interaction',
            label: t('ImportOnInteraction.title'),
          },
          {
            href: '/patterns/route-based-splitting',
            label: t('RouteBasedSplitting.title'),
          },
          {
            href: '/patterns/bundle-splitting',
            label: t('BundleSplitting.title'),
          },
          {
            href: '/patterns/prpl-pattern',
            label: t('PRPLPattern.title'),
          },
          {
            href: '/patterns/tree-shaking',
            label: t('TreeShaking.title'),
          },
          {
            href: '/patterns/preload',
            label: t('preload.title'),
          },
          {
            href: '/patterns/prefetch',
            label: t('prefetch.title'),
          },
          {
            href: '/patterns/optimize-loading-third-parties',
            label: t('OptimizeLoadingThirdParties.title'),
          },
          {
            href: '/patterns/list-virtualization',
            label: t('ListVirtualization.title'),
          },
          {
            href: '/patterns/compressing-javascript',
            label: t('CompressingJavaScript.title'),
          },
        ],
      },
      {
        href: '',
        label: 'react',
        children: [
          { href: '/patterns/container-pattern', label: t('container.title') },
          { href: '/patterns/hoc-pattern', label: t('HOC.title') },
          {
            href: '/patterns/render-props-pattern',
            label: t('renderProps.title'),
          },
          { href: '/patterns/hooks-patterns', label: t('hooks.title') },
          { href: '/patterns/compound-pattern', label: t('compound.title') },
          { href: '/patterns/client-side-rendering', label: t('CSR.title') },
          { href: '/patterns/server-side-rendering', label: t('SSR.title') },
          { href: '/patterns/react-server-component', label: t('RSC.title') },
          {
            href: '/patterns/static-rendering',
            label: t('staticRendering.title'),
          },
          {
            href: '/patterns/incremental-static-rendering',
            label: t('iStaticRendering.title'),
          },
          {
            href: '/patterns/streamServer-side-rendering',
            label: t('streamServerSideRendering.title'),
          },
          {
            href: '/patterns/progressive-hydration',
            label: t('progressiveHydration.title'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
