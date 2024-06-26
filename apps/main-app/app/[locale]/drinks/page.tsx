/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DrinksList from '~/components/drinks-list';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

const fetchDrinks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  // throw error

  if (!response.ok) {
    throw new Error('Failed to fetch drinks');
  }
  return await response.json();
};

const DrinksPage = async () => {
  const data: { drinks: any[] } = await fetchDrinks();
  console.log(data);
  return (
    <div>
      <DrinksList drinks={data?.drinks} />
    </div>
  );
};
export default DrinksPage;
