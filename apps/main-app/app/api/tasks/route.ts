/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createId } from '@paralleldrive/cuid2';
import { NextResponse } from 'next/server';
import { db } from '~/db';
import { task } from '~/db/schema';

export const GET = async () => {
  const tasks = await db.select().from(task);
  return NextResponse.json({ data: tasks });
};
export const POST = async (request: Request) => {
  const data = await request.json();

  if (typeof data !== 'string') {
    return;
  }
  await db.insert(task).values({
    id: createId(),
    content: data,
  });
  return Response.json({ data: task });
};
