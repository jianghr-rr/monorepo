import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { employees } from '~/db/schema';

export const getAll = async () => {
  return await db
    .select({
      id: employees.id,
      name: employees.name,
      salary: employees.salary,
    })
    .from(employees);
};

export const getOne = async (id: string) => {
  const [currentUser] = await db
    .select({
      id: employees.id,
      name: employees.name,
      salary: employees.salary,
    })
    .from(employees)
    .where(eq(employees.id, id));

  return currentUser;
};
