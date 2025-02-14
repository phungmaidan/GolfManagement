// ~/utils/dbUtils.js
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { GET_DB } from '~/config/sqldb';


/**
 * Hàm thực thi query tổng quát
 * @param {string} sql - Câu lệnh SQL
 * @param {object} params - Các tham số (nếu có)
 * @param {string} errorMessage - Thông báo lỗi tùy chỉnh
 * @returns {Promise<Array>} - Kết quả truy vấn
 */
const executeQuery = async (sql, params = {}, errorMessage = 'Database query failed') => {
    try {
        const pool = GET_DB();
        const request = pool.request();
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
const executeTransaction = async (queries) => {
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
const executeBatch = async (queries) => {
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

/**
 * Build and execute a SELECT query
 * @param {Object} options - Query options
 * @param {string} options.tableName - Name of the table to query
 * @param {Array<string>} [options.fields=[]] - Fields to select (empty for all fields)
 * @param {string} [options.where=''] - WHERE clause without the 'WHERE' keyword
 * @param {Object} [options.params={}] - Query parameters
 * @param {boolean} [options.execute=true] - Whether to execute the query or return SQL string
 * @returns {Promise<Array>} Query results
 * 
 * @example
 * // Select all active users
 * const users = await queryBuilder({
 *   tableName: 'Users',
 *   fields: ['id', 'name', 'email'],
 *   where: 'isActive = @active',
 *   params: { active: true }
 * });
 * 
 * // Get SQL string without executing
 * const sql = await queryBuilder({
 *   tableName: 'Users',
 *   where: 'id = @userId',
 *   params: { userId: 1 },
 *   execute: false
 * });
 */
const queryBuilder = async ({ 
    tableName, 
    fields = [], 
    where = '', 
    params = {}, 
    execute = true 
}) => {
    const selectedFields = fields.length > 0 ? fields.join(', ') : '*'
    const sqlQuery = `
    SELECT ${selectedFields}
    FROM ${tableName}
    ${where ? `WHERE ${where}` : ''}
  `
    if (!execute) {
        return convertToQuery(sqlQuery, params);
    }
    try {
        return await executeQuery(sqlQuery, params, `Error querying ${tableName}`)
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
    }
}

/**
 * Update records in a table
 * @param {Object} options - Update options
 * @param {string} options.tableName - Name of the table to update
 * @param {Object} options.updateFields - Fields and values to update
 * @param {string} [options.where=''] - WHERE clause without the 'WHERE' keyword
 * @param {Object} [options.params={}] - Additional parameters for WHERE clause
 * @param {boolean} [options.returnUpdated=false] - Whether to return updated records
 * @param {boolean} [options.execute=true] - Whether to execute the query or return SQL string
 * @returns {Promise<Object>} Update result or updated records
 * 
 * @example
 * // Update user status
 * const result = await updateRecord({
 *   tableName: 'Users',
 *   updateFields: { status: 'active', lastLoginDate: new Date() },
 *   where: 'id = @userId',
 *   params: { userId: 1 },
 *   returnUpdated: true
 * });
 */
const updateRecord = async ({
    tableName,
    updateFields = {},
    where = '',
    params = {},
    returnUpdated = false,
    execute = true
}) => {
    try {
        const updateSetClause = Object.keys(updateFields)
            .map(field => `${field} = @${field}`)
            .join(', ')

        const sqlQuery = `
            UPDATE ${tableName}
            SET ${updateSetClause}
            ${where ? `WHERE ${where}` : ''}
            ${returnUpdated ? 'OUTPUT Inserted.*' : ''}
        `

        const combinedParams = { ...params, ...updateFields }
        if (!execute) {
            return convertToQuery(sqlQuery, params);
        }
        const result = await executeQuery(
            sqlQuery,
            combinedParams,
            `Error updating record in ${tableName}`
        )

        return returnUpdated ? result : { success: true, affectedRows: result?.length || 0 }
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
    }
}

/**
 * Insert a new record into a table
 * @param {Object} options - Insert options
 * @param {string} options.tableName - Name of the table
 * @param {Object} options.data - Data to insert
 * @param {boolean} [options.returnInserted=false] - Whether to return inserted record
 * @param {boolean} [options.execute=true] - Whether to execute the query or return SQL string
 * @returns {Promise<Object>} Insert result or inserted record
 * 
 * @example
 * // Insert new user
 * const newUser = await insertRecord({
 *   tableName: 'Users',
 *   data: {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     createdAt: new Date()
 *   },
 *   returnInserted: true
 * });
 */
const insertRecord = async ({
    tableName,
    data = {},
    returnInserted = false,
    execute = true
}) => {
    try {
        const fields = Object.keys(data)
        const values = fields.map(field => `@${field}`).join(', ')

        const sqlQuery = `
            INSERT INTO ${tableName} 
            (${fields.join(', ')})
            VALUES (${values})
            ${returnInserted ? 'OUTPUT Inserted.*' : ''}
        `
        if (!execute) {
            return convertToQuery(sqlQuery, params);
        }
        const result = await executeQuery(
            sqlQuery,
            data,
            `Error inserting record into ${tableName}`
        )

        return returnInserted ? result : { success: true, affectedRows: result?.length || 0 }
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
    }
}

/**
 * Execute a stored procedure
 * @param {Object} options - Procedure options
 * @param {string} options.procedureName - Name of the stored procedure
 * @param {Object} [options.params={}] - Procedure parameters
 * @param {Object} [options.options={ returnRecordset: true }] - Additional options
 * @param {boolean} [options.execute=true] - Whether to execute or return SQL string
 * @returns {Promise<Array|Object>} Procedure results
 * 
 * @example
 * // Execute procedure with parameters
 * const result = await execProcedure({
 *   procedureName: 'sp_GetUserOrders',
 *   params: {
 *     userId: 1,
 *     startDate: '2024-01-01'
 *   }
 * });
 * 
 * // Get procedure SQL without executing
 * const sql = await execProcedure({
 *   procedureName: 'sp_UpdateUserStatus',
 *   params: { status: 'active' },
 *   execute: false
 * });
 */
const execProcedure = async ({
    procedureName,
    params = {},
    options = { returnRecordset: true },
    execute = true
}) => {
    try {
        const paramString = Object.keys(params)
            .map(param => `@${param}`)
            .join(', ')

        const sqlQuery = `
            EXEC ${procedureName}
            ${paramString ? paramString : ''}
        `
        if (!execute) {
            return convertToQuery(sqlQuery, params);
        }
        const result = await executeQuery(
            sqlQuery,
            params,
            `Error executing procedure ${procedureName}`
        )

        return options.returnRecordset ? result : { success: true }
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
    }
}

/**
 * Convert parameterized query to raw SQL string
 * @param {string} sql - SQL query with parameters (@param format)
 * @param {Object} params - Parameter values
 * @returns {string} Raw SQL query
 * 
 * @example
 * const sql = 'SELECT * FROM Users WHERE status = @status';
 * const rawSql = convertToQuery(sql, { status: 'active' });
 * // Results in: SELECT * FROM Users WHERE status = 'active'
 */
const convertToQuery = (sql, params = {}) => {
    let query = sql;
    console.log('Original SQL:', query);
    console.log('Parameters:', params);
    // Thay thế các tham số trong câu lệnh SQL
    Object.entries(params).forEach(([key, value]) => {
        const paramValue = typeof value === 'string' ? `'${value}'` : value;
        query = query.replace(new RegExp(`@${key}`, 'g'), paramValue);
    });
    console.log('Converted SQL:', query);
    return query;
};



export const sqlQueryUtils = {
    queryBuilder,
    updateRecord,
    insertRecord,
    execProcedure,
    convertToQuery,
    executeTransaction,
    executeBatch
}