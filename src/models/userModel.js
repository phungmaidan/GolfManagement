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

const findUserModule = async (account) => {
  try {
    const pool = GET_DB()
    const result = await pool.request()
      .input('ID', account)
      .query('Select ModuleID, ModuleName from sysOnUserMenuView where ID = @ID and ModuleActive = 1 Group By ModuleID, ModuleName, PictureKey, ModuleSequence Order By ModuleSequence')
    return result.recordset
  } catch (error) {
    throw new Error('Database query failed')
  }
}

export const userModel = {
  findOneByAccount,
  findUserModule
}
