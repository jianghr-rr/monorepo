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
        href: '/algorithm',
        label: t('algorithm'),
        children: [
          {
            href: '/algorithm/two-sum',
            label: t('twoSum'),
          },
          {
            href: '/algorithm/group-anagrams',
            label: t('groupAnagrams'),
          },
          {
            href: '/algorithm/move-zeroes',
            label: t('moveZeroes'),
          },
          {
            href: '/algorithm/max-area',
            label: t('maxArea'),
          },
          {
            href: '/algorithm/three-sum',
            label: t('threeSum'),
          },
          {
            href: '/algorithm/rainwater-trap',
            label: t('rainwaterTrap'),
          },
          {
            href: '/algorithm/length-of-longest-substring',
            label: t('lengthOfLongestSubstring'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
