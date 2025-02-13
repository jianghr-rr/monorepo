'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import i18nConfig from '~/i18nConfig';

const localeMap = {
  zh: '简体中文',
  en: 'English',
};

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as keyof typeof localeMap;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: string) => {
    const newLocale = value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      currentPathname &&
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        );
    }

    router.refresh();
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] bg-transparent">
        <SelectValue placeholder={localeMap[currentLocale]} />
      </SelectTrigger>
      <SelectContent className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <SelectItem value="zh">简体中文</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
