'use client';
import { Alert, TextInput } from 'flowbite-react';

import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      {t('personalCenter')}
      <TextInput />
    </>
  );
}
