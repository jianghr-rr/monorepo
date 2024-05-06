import mysql from 'mysql2';

// 创建数据库连接池
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'knowledge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 导出连接池
export default pool.promise();
