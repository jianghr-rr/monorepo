import { getOne } from '~/db/employees/index';

export default async function Page({ params }: { params: { id: string } }) {
  const req = await getOne(Number(params.id));
  console.log('req:::', req);
  return (
    <>
      <p>{req?.[0]?.name}</p>
      <p>{req?.[0]?.salary}</p>
    </>
  );
}
