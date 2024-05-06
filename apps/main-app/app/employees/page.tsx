import Link from 'next/link';
import { getAll, type IEmployeesRow } from '~/db/employees/index';

export default async function Page() {
  const req = await getAll();
  console.log('req:::', req);
  return (
    <>
      {req?.map((item: IEmployeesRow | undefined) => {
        return (
          <Link key={item?.id} href={`/employees/${item?.id}`}>
            {item?.name}
          </Link>
        );
      })}
    </>
  );
}
