import TaskForm from '~/components/task/task-form';
import TaskFormCustom from '~/components/task/form-custom';
import TaskList from '~/components/task/list';
export const dynamic = 'force-dynamic';
const TasksPage = () => {
  return (
    <div className='max-w-lg'>
      <TaskFormCustom />
      <TaskList />
    </div>
  );
};
export default TasksPage;