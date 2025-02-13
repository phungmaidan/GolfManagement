/* eslint-disable no-console */
import sql from 'mssql';
import { env } from './environment.js';
import { convertToQuery } from '~/utils/dbUtils.js';
const config = {
  user: env.SQL_USER,
  password: env.SQL_PASSWORD,
  server: env.SQL_SERVER,
  database: env.SQL_DATABASE,
  port: parseInt(env.SQL_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let sqlDatabaseInstance = null;

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('2. Connected to SQL Server!');
    sqlDatabaseInstance = pool;
    return pool;
  })
  .catch((err) => {
    console.error('--Database Connection Failed: ', err);
    throw err;
  });

export const CONNECT_DB = async () => {
  await poolPromise;
};

export const GET_DB = () => {
  if (!sqlDatabaseInstance) throw new Error('--Must connect to Database first');
  return sqlDatabaseInstance;
};

export const CLOSE_DB = async () => {
  if (sqlDatabaseInstance) {
    await sqlDatabaseInstance.close();
    sqlDatabaseInstance = null;
  }
};

/**
 * Hàm thực thi query tổng quát
 * @param {string} sql - Câu lệnh SQL
 * @param {object} params - Các tham số (nếu có)
 * @param {string} errorMessage - Thông báo lỗi tùy chỉnh
 * @returns {Promise<Array>} - Kết quả truy vấn
 */
export const executeQuery = async (sql, params = {}, errorMessage = 'Database query failed') => {
  try {
    const pool = GET_DB();
    const request = pool.request();
    console.log(sql)
    // Thêm các parameter vào request
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.query(sql);
    return result.recordset;
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

/**
 * Hàm thực thi nhiều truy vấn trong một transaction
 * @param {Array<string>} queries - Danh sách các câu lệnh SQL
 * @returns {Promise<void>}
 */
export const executeTransaction = async (queries) => {
  const pool = GET_DB();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();
    const request = new sql.Request(transaction);

    // Chuyển đổi các queries thành câu lệnh SQL và thực thi
    for (const { sql, params } of queries) {
      const query = convertToQuery(sql, params);
      await request.query(query);
    }

    await transaction.commit();
    console.log('Transaction committed successfully');
  } catch (error) {
    await transaction.rollback();
    console.error('Transaction rolled back due to error:', error);
    throw error;
  }
};
/**
  const queries = [
  { sql: 'INSERT INTO Orders (userId, totalAmount) VALUES (@userId, @totalAmount)', params: { userId: 1, totalAmount: 100 } },
  { sql: 'UPDATE Users SET lastOrderDate = @lastOrderDate WHERE id = @userId', params: { lastOrderDate: new Date(), userId: 1 } },
];

  await executeTransaction(queries);
 */

/**
 * Hàm thực thi batch query (nhiều truy vấn cùng lúc)
 * @param {Array<string>} queries - Danh sách các câu lệnh SQL
 * @returns {Promise<Array>} - Kết quả của các truy vấn
 */
export const executeBatch = async (queries) => {
  try {
    const pool = GET_DB();
    const request = pool.request();

    // Chuyển đổi các queries thành câu lệnh SQL
    const batch = queries.map(({ sql, params }) => convertToQuery(sql, params)).join('; ');

    const result = await request.query(batch);

    return result.recordset;
  } catch (error) {
    throw new Error(`Batch query failed: ${error.message}`);
  }
};
/** Ví dụ 1:
    const queries = [
  { sql: 'INSERT INTO Users (name, email) VALUES (@name, @email)', params: { name: 'John Doe', email: 'john@example.com' } },
  { sql: 'UPDATE Users SET status = @status WHERE id = @id', params: { status: 'active', id: 1 } },
];
    const results = await executeBatch(queries);
    console.log(results);
 */
/** Ví dụ 2:
    import { queryBuilder, updateRecord, insertRecord } from '~/utils/dbUtils';
    const queries = [
    { sql: await queryBuilder('Users', ['id', 'name'], 'isActive = @active', { active: true }) },
    { sql: await updateRecord('Products', { price: 99.99 }, 'categoryId = @catId', { catId: 5 }) },
    { sql: await insertRecord('Orders', { userId: 1, totalAmount: 100 }, true) },
    ];

    const results = await executeBatch(queries);
    console.log(results);
 */