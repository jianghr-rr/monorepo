/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { RowDataPacket } from 'mysql2/promise';
import { SelectQuery } from '../query-utils';

export interface IEmployeesRow extends RowDataPacket {
  id: number;
  name: string;
  salary: number;
}

export function getAll() {
  return SelectQuery<IEmployeesRow>('SELECT * FROM employees;');
}

export function getOne(id: number) {
  const queryString = 'SELECT * FROM employees WHERE id = ?;';
  return SelectQuery<IEmployeesRow>(queryString, [id]);
}
