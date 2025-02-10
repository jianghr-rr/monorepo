import Link from 'next/link';
import initTranslations from '~/app/i18n';
const NotFound = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, ['home']);

  return (
    <div className="hero h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-4 text-5xl font-bold">{t('not_found.title')}</h1>
          <Link className="btn btn-primary" href="/">
            {t('not_found.go_back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
export { NotFound };
