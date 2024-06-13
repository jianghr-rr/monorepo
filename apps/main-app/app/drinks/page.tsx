/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

const fetchDrinks = async () => {
  // just for demo purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  return await response.json();
};
const DrinksPage = async () => {
  const data = await fetchDrinks();
  console.log(data);
  return (
    <div>
      <h1 className="text-7xl">DrinksPage</h1>
    </div>
  );
};
export default DrinksPage;
