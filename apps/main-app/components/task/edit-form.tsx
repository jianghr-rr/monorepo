'use client';
import { editTask } from '~/utils/actions';

const EditForm = ({
  task,
}: {
  task: {
    id: string;
    completed: boolean | null;
    content: string | null;
    createdAt: Date;
  };
}) => {
  const { id, completed, content } = task;

  return (
    <form
      action={editTask}
      className="max-w-sm rounded-lg border border-base-300 p-12"
    >
      <input type="hidden" name="id" value={id} />
      {/* content */}
      <input
        type="text"
        required
        defaultValue={content ?? ''}
        name="content"
        className="input input-bordered w-full"
      />
      {/* completed */}
      <div className="form-control my-4">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">completed</span>
          <input
            type="checkbox"
            defaultChecked={completed ?? false}
            id="completed"
            name="completed"
            className="checkbox-primary checkbox checkbox-sm"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-sm btn-block">
        edit
      </button>
    </form>
  );
};
export default EditForm;
