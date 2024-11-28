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
        href: '/react/16',
        label: t('16.title'),
        children: [
          {
            href: '/react/16/interview',
            label: t('16.interview'),
          },
        ],
      },
      {
        href: '/react/18',
        label: t('18.title'),
        children: [
          {
            href: '/react/18/interview',
            label: t('18.interview'),
            children: [
              {
                href: '/react/18/hooks',
                label: t('18.hooks'),
                children: [
                  {
                    href: '/react/18/hooks/useState',
                    label: t('useState'),
                  },
                  {
                    href: '/react/18/hooks/useReducer',
                    label: t('useReducer'),
                  },
                  {
                    href: '/react/18/hooks/useCallback',
                    label: t('useCallback'),
                  },
                  {
                    href: '/react/18/hooks/useMemo',
                    label: t('useMemo'),
                  },
                  {
                    href: '/react/18/hooks/useContext',
                    label: t('useContext'),
                  },
                  {
                    href: '/react/18/hooks/useRef',
                    label: t('useRef'),
                  },
                  {
                    href: '/react/18/hooks/useEffect',
                    label: t('useEffect'),
                  },
                  {
                    href: '/react/18/hooks/useLayoutEffect',
                    label: t('useLayoutEffect'),
                  },
                  {
                    href: '/react/18/hooks/useInsertionEffect',
                    label: t('useInsertionEffect'),
                  },
                  {
                    href: '/react/18/hooks/useActionState',
                    label: t('useActionState'),
                  },
                  {
                    href: '/react/18/hooks/useDeferredValue',
                    label: t('useDeferredValue'),
                  },
                  {
                    href: '/react/18/hooks/useId',
                    label: t('useId'),
                  },
                  {
                    href: '/react/18/hooks/useImperativeHandle',
                    label: t('useImperativeHandle'),
                  },
                  {
                    href: '/react/18/hooks/useSyncExternalStore',
                    label: t('useSyncExternalStore'),
                  },
                  {
                    href: '/react/18/hooks/useDebugValue',
                    label: t('useDebugValue'),
                  },
                ],
              },
              {
                href: '/react/18/components',
                label: t('18.components'),
              },
              {
                href: '/react/18/api',
                label: t('18.api'),
              },
            ],
          },
        ],
      },
      {
        href: '/react/ui-component',
        label: t('uiComponent.title'),
        children: [
          {
            href: '/react/ui-component/interview',
            label: t('uiComponent.interview'),
          },
        ],
      },
      {
        href: '/react/hooks',
        label: t('hooks.title'),
        children: [
          {
            href: '/react/hooks/a-hooks',
            label: t('aHooks'),
            children: [
              {
                href: '/react/hooks/a-hooks/use-local-storage',
                label: t('useLocalStorageState'),
              },
              {
                href: '/react/hooks/a-hooks/use-raf-State ',
                label: t('useRafState'),
              },
            ],
          },
        ],
      },
      {
        href: '/react/ui-css-in-js',
        label: t('css-in-js'),
        children: [
          {
            href: '/react/ui-css-in-js',
            label: t('css-in-js'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
