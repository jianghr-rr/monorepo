import Link from 'next/link';
import { getAll } from '~lib/employees';

export default async function Page() {
  const req = await getAll();
  console.log('req:::', req);
  return (
    <>
      {req?.map((item) => {
        return (
          <Link key={item?.id} href={`/employees/${item?.id}`}>
            {item?.name}
          </Link>
        );
      })}
    </>
  );
}
