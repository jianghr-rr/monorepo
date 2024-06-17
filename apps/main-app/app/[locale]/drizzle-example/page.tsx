import { getAllTasks } from '~/utils/actions';
const DrizzleExamplePage = async () => {
  const data = await getAllTasks();
  console.log('page::', data);
  return (
    <div>
      <h1 className="text-7xl">DrizzleExamplePage</h1>
    </div>
  );
};
export default DrizzleExamplePage;
