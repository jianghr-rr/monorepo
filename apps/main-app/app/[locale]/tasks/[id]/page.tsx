import Link from 'next/link';
import EditForm from '~/components/task/edit-form';
import { getTaskById } from '~/utils/actions';

const SingleTaskPage = async ({ params }: { params: { id: string } }) => {
  const task = await getTaskById(params.id);
  if (!task) {
    return null;
  }
  return (
    <>
      <div className="mb-16">
        <Link href="/task" className="btn btn-accent">
          back to tasks
        </Link>
      </div>
      <EditForm task={task} />
    </>
  );
};
export default SingleTaskPage;
