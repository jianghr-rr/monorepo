import type { RowDataPacket } from 'mysql2/promise';

export interface IEmployeesRow extends RowDataPacket {
  id: number;
  name: string;
  salary: number;
}
