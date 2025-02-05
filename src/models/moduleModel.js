import { GET_DB } from '~/config/sqldb'

const findModuleOptionType = async (moduleId, userId, optionType) => {
  try {
    const pool = GET_DB()
    const result = await pool.request()
      .input('ModuleID', moduleId)
      .input('ID', userId)
      .input('OptionType', optionType)
      .query('SELECT ItemID, ItemName, OptionType, ModuleID FROM sysOnUserMenuView WHERE ModuleID = @ModuleID AND OptionType = @OptionType AND ID = @ID AND PrimaryItemID IS NULL AND Active = 1 ORDER BY ItemSequence')
    return result.recordset
  } catch (error) {
    throw new Error('Database query failed')
  }
}

export const moduleModel = {
  findModuleOptionType
}
