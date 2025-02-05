import { GET_DB } from '~/config/sqldb'

const findOneByAccount = async (account) => {
  try {
    const pool = GET_DB()
    const result = await pool.request()
      .input('ID', account)
      .query('SELECT * FROM sysOnUser WHERE ID = @ID')
    return result.recordset[0]
  } catch (error) {
    throw new Error('Database query failed')
  }
}

export const userModel = {
  findOneByAccount
}
