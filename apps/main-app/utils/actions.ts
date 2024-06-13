'use server';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '~/db';
import { task } from '~/db/schema';

interface FormData {
  get(key: string): string;
}
interface PrevState {
  message: string;
}

export const getAllTasks = async () => {
  return await db.select().from(task);
};

export const createTask = async (formData: FormData) => {
  const content: string = formData.get('content');

  await db.insert(task).values({
    id: createId(),
    content: content,
  });
  revalidatePath('/tasks');
};

export const createTaskCustom = async (
  prevState: PrevState,
  formData: FormData
) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const content = formData.get('content');
  const Task = z.object({
    content: z.string().min(5),
  });
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

  await db.delete(task).where(eq(task.id, id));
  revalidatePath('/tasks');
};

export const getTaskById = async (id: string) => {
  return db.select().from(task).where(eq(task.id, id));
};

export const editTask = async (formData: FormData) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await db
    .update(task)
    .set({
      content,
      completed: completed === 'on' ? true : false,
    })
    .where(eq(task.id, id));
  redirect('/tasks');
};
