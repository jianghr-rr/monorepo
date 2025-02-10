import { NotFound } from '~/components/not-found';

export default function NotFoundPage(params: { locale: string }) {
  return <NotFound locale={params.locale} />;
}
