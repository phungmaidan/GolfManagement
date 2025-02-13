import { queryBuilder } from '~/utils/dbUtils'

// Hàm tìm kiếm người dùng theo tài khoản
const findOneByAccount = async (account) => {
  const fields = ['*']
  const where = 'ID = @ID'
  const params = { ID: account }

  try {
    const result = await queryBuilder('sysOnUser', fields, where, params)
    return result[0] // Trả về bản ghi đầu tiên
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

// Hàm tìm kiếm module của người dùng
const findUserModule = async (account) => {
  const fields = ['ModuleID', 'ModuleName']
  const where = `
    ID = @ID 
    AND ModuleActive = 1 and ModuleActive = 1 Group By ModuleID, ModuleName, PictureKey, ModuleSequence Order By ModuleSequence
  `
  const params = { ID: account }

  try {
    return await queryBuilder('sysOnUserMenuView', fields, where, params)
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

export const userModel = {
  findOneByAccount,
  findUserModule
}
