import { sqlQueryUtils } from '~/utils/sqlQueryUtils'

// Hàm tìm kiếm người dùng theo tài khoản
const findOneByAccount = async (account, fields = ['*']) => {
  try {
    const result = await sqlQueryUtils.queryBuilder({
      tableName: 'sysOnUser',
      fields: fields,
      where: 'ID = @ID',
      params: { ID: account }
    })
    return result[0] // Trả về bản ghi đầu tiên
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

// Hàm tìm kiếm module của người dùng
const findUserModule = async (account, fields = ['ModuleID', 'ModuleName', 'PictureKey', 'ModuleSequence']) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'sysOnUserMenuView',
      fields: fields,
      where: `ID = @ID AND ModuleActive = 1 
              GROUP BY ModuleID, ModuleName, PictureKey, ModuleSequence 
              ORDER BY ModuleSequence`,
      params: { ID: account }
    })
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

export const userModel = {
  findOneByAccount,
  findUserModule
}
