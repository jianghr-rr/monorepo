'use server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '~/db';
import { task } from '~/db/schema';

interface FormData {
  get(key: string): FormDataEntryValue | null;
}
interface PrevState {
  message: string;
}

export const getAllTasks = async () => {
  return await db.select().from(task);
};

export const createTask = async (formData: FormData) => {
  const content = formData.get('content');
  if (typeof content !== 'string') {
    return;
  }
  await db.insert(task).values({
    id: createId(),
    content: content,
  });
  revalidatePath('/tasks');
};

export const createTaskCustom = async (prevState: void, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const content = formData.get('content');
  const Task = z.object({
    content: z.string().min(5),
  });

  if (typeof content !== 'string') {
    return;
  }

  try {
    Task.parse({ content });
    await db.insert(task).values({
      id: createId(),
      content: content,
    });
    revalidatePath('/tasks');
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (formData: FormData) => {
  const id = formData.get('id');
  if (typeof id !== 'string' || id.length === 0) {
    return;
  }
  await db.delete(task).where(eq(task.id, id));
  revalidatePath('/tasks');
};

export const getTaskById = async (id: string) => {
  const data = await db
    .select({
      id: task.id,
      content: task.content,
      completed: task.completed,
      createdAt: task.createdAt,
    })
    .from(task)
    .where(eq(task.id, id))
    .limit(1);

  return data[0];
};

export const editTask = async (formData: FormData) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');
  if (typeof id !== 'string' || typeof content !== 'string') {
    return;
  }
  await db
    .update(task)
    .set({
      content,
      completed: completed === 'on' ? true : false,
    })
    .where(eq(task.id, id));
  redirect('/tasks');
};
