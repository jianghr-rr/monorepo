/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResultSetHeader } from 'mysql2/promise';
import pool from './connection';

export async function SelectQuery<T>(
  queryString: string,
  params?: any[]
): Promise<Partial<T[]>> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(queryString, params);
    return results as T[];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function ModifyQuery(
  queryString: string,
  params?: any[]
): Promise<ResultSetHeader> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(queryString, params);
    return result as ResultSetHeader;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
