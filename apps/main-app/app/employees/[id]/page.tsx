import { getOne } from '~lib/employees';

export default async function Page({ params }: { params: { id: string } }) {
  const req = await getOne(params.id);

  return (
    <>
      <p>{req?.name}</p>
      <p>{req?.salary}</p>
    </>
  );
}
