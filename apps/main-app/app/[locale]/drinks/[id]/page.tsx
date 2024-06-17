/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from 'next/image';
import Link from 'next/link';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
// import drinkImg from './drink.jpg';
const getSingleDrink = async (id: string) => {
  const res = await fetch(`${url}${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch a drink...');
  }
  return res.json();
};

const SingleDrinkPage = async ({ params }: { params: { id: string } }) => {
  const data: any = await getSingleDrink(params.id);
  const title = data?.drinks[0]?.strDrink;
  const imgSrc = data?.drinks[0]?.strDrinkThumb;

  return (
    <div>
      <Link href="/drinks" className="btn btn-primary mb-12 mt-8">
        back to drinks
      </Link>

      <Image
        src={imgSrc}
        width={300}
        height={300}
        className="mb-4 size-48 rounded-lg shadow-lg"
        priority
        alt={title}
      />
      {/* <Image src={drinkImg} className='w-48 h-48 rounded-lg' alt='drink' /> */}
      <h1 className="mb-8 text-4xl">{title}</h1>
    </div>
  );
};
export default SingleDrinkPage;
