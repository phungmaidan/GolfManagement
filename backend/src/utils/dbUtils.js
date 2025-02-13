// ~/utils/dbUtils.js
import { executeQuery } from '~/config/sqldb'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

/**
 * Builds and executes a SELECT query with flexible parameters
 * 
 * @example
 * // Simple select all
 * const allUsers = await queryBuilder('Users')
 * 
 * @example
 * // Select specific fields with conditions
 * const activeUsers = await queryBuilder(
 *   'Users',
 *   ['id', 'name', 'email'],
 *   'isActive = @active AND role = @role',
 *   { active: true, role: 'admin' }
 * )
 * 
 * @example
 * // Complex query with JOIN condition
 * const userOrders = await queryBuilder(
 *   'Users u',
 *   ['u.id', 'u.name', 'COUNT(o.id) as orderCount'],
 *   'u.isActive = @active AND EXISTS (SELECT 1 FROM Orders o WHERE o.userId = u.id)',
 *   { active: true }
 * )
 */
export const queryBuilder = async (tableName, fields = [], where = '', params = {}) => {
    const selectedFields = fields.length > 0 ? fields.join(', ') : '*'
    const sqlQuery = `
    SELECT ${selectedFields}
    FROM ${tableName}
    ${where ? `WHERE ${where}` : ''}
  `
    try {
        return await executeQuery(sqlQuery, params, `Error querying ${tableName}`)
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
    }
}

/**
 * Updates records in a table with specified conditions
 * 
 * @example
 * // Simple update without return
 * const result = await updateRecord(
 *   'Users',
 *   { status: 'inactive', lastModified: new Date() },
 *   'id = @id',
 *   { id: 123 }
 * )
 * 
 * @example
 * // Update with return updated record
 * const updated = await updateRecord(
 *   'Products',
 *   { 
 *     price: 99.99,
 *     stock: 50,
 *     updatedAt: new Date()
 *   },
 *   'categoryId = @catId AND price < @minPrice',
 *   { catId: 5, minPrice: 50 },
 *   true // return updated records
 * )
 * 
 * @example
 * // Bulk update with complex condition
 * const bulkUpdate = await updateRecord(
 *   'Orders',
 *   { status: 'processed', processedAt: new Date() },
 *   'status = @oldStatus AND createdAt < @date',
 *   { oldStatus: 'pending', date: '2024-01-01' }
 * )
 */
export const updateRecord = async (
    tableName,
    updateFields = {},
    where = '',
    params = {},
    returnUpdated = false
) => {
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
 * Inserts a new record into the specified table
 * 
 * @example
 * // Simple insert without return
 * const result = await insertRecord(
 *   'Users',
 *   {
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     createdAt: new Date()
 *   }
 * )
 * 
 * @example
 * // Insert with return inserted record
 * const newProduct = await insertRecord(
 *   'Products',
 *   {
 *     name: 'New Product',
 *     price: 29.99,
 *     categoryId: 1,
 *     stock: 100,
 *     createdAt: new Date(),
 *     isActive: true
 *   },
 *   true // return inserted record
 * )
 * 
 * @example
 * // Insert with multiple date fields
 * const newOrder = await insertRecord(
 *   'Orders',
 *   {
 *     userId: 123,
 *     totalAmount: 599.99,
 *     status: 'pending',
 *     orderDate: new Date(),
 *     expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
 *   },
 *   true
 * )
 */
export const insertRecord = async (
    tableName,
    data = {},
    returnInserted = false
) => {
    try {
        const fields = Object.keys(data)
        const values = fields.map(field => `@${field}`).join(', ')

        const sqlQuery = `
            INSERT INTO ${tableName} 
            (${fields.join(', ')})
            VALUES (${values})
            ${returnInserted ? 'OUTPUT Inserted.*' : ''}
        `

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
 * Executes a stored procedure with parameters
 * 
 * @example
 * // Execute procedure without parameters
 * const users = await execProcedure('GetAllActiveUsers')
 * 
 * @example
 * // Execute procedure with parameters
 * const userOrders = await execProcedure(
 *   'GetUserOrderHistory',
 *   {
 *     userId: 123,
 *     startDate: '2024-01-01',
 *     endDate: '2024-12-31'
 *   }
 * )
 * 
 * @example
 * // Execute procedure without returning recordset
 * const result = await execProcedure(
 *   'ProcessPendingOrders',
 *   {
 *     batchSize: 100,
 *     processedBy: 'system'
 *   },
 *   { returnRecordset: false }
 * )
 * 
 * @example
 * // Execute complex procedure with multiple parameters
 * const report = await execProcedure(
 *   'GenerateSalesReport',
 *   {
 *     departmentId: 5,
 *     startDate: '2024-01-01',
 *     endDate: '2024-03-31',
 *     includeInactive: false,
 *     groupBy: 'category'
 *   }
 * )
 */
export const execProcedure = async (
    procedureName,
    params = {},
    options = { returnRecordset: true }
) => {
    try {
        const paramString = Object.keys(params)
            .map(param => `@${param}`)
            .join(', ')

        const sqlQuery = `
            EXEC ${procedureName}
            ${paramString ? paramString : ''}
        `

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
 * Chuyển đổi tham số của executeQuery thành câu lệnh SQL
 * @param {string} sql - Câu lệnh SQL
 * @param {object} params - Các tham số (nếu có)
 * @returns {string} - Câu lệnh SQL đã được chuyển đổi
 */
export const convertToQuery = (sql, params = {}) => {
    let query = sql;

    // Thay thế các tham số trong câu lệnh SQL
    Object.entries(params).forEach(([key, value]) => {
        const paramValue = typeof value === 'string' ? `'${value}'` : value;
        query = query.replace(new RegExp(`@${key}`, 'g'), paramValue);
    });

    return query;
};
