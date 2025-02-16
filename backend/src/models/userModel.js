import { sqlQueryUtils } from '~/utils/sqlQueryUtils'

const findOneByAccount = async ({ account, fields = ['*'], execute = true }) => {
  try {
    const result = await sqlQueryUtils.queryBuilder({
      tableName: 'sysOnUser',
      fields: fields,
      where: 'ID = @ID',
      params: { ID: account },
      execute: execute
    })
    return result[0]
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

const findUserModule = async ({ account, fields = ['ModuleID', 'ModuleName', 'PictureKey', 'ModuleSequence'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'sysOnUserMenuView',
      fields: fields,
      where: `ID = @ID AND ModuleActive = 1 
              GROUP BY ModuleID, ModuleName, PictureKey, ModuleSequence 
              ORDER BY ModuleSequence`,
      params: { ID: account },
      execute: execute
    })
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

export const userModel = {
  findOneByAccount,
  findUserModule
}
