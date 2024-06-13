import Image from 'next/image';
import Link from 'next/link';
const DrinksList = ({
  drinks,
}: {
  drinks: { idDrink: string; strDrink: string; strDrinkThumb: string }[];
}) => {
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2">
      {drinks.map((drink) => {
        return (
          <li key={drink.idDrink}>
            <Link
              href={`/drinks/${drink.idDrink}`}
              className="text-xl font-medium"
            >
              <div className="relative mb-4 h-48">
                <Image
                  src={drink.strDrinkThumb}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw"
                  alt={drink.strDrink}
                  className="rounded-md object-cover"
                />
              </div>
              {drink.strDrink}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default DrinksList;
