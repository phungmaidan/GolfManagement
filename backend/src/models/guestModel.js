import { sqlQueryUtils } from '~/utils/sqlQueryUtils'

const findOneByAccount = async ({ account, fields = ['*'], execute = true }) => {
  try {
    const result = await sqlQueryUtils.queryBuilder({
      tableName: 'ComGuestAccount',
      fields,
      where: 'Username = @account',
      params: { account },
      execute
    })
    // Return the first matching record or null if none found
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}

export const guestModel = {
  findOneByAccount
}
