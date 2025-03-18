import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import { itemModel } from './itemModel'

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

const getGuestDetail = async ({ guestId, fields = ['*'], execute = true }) => {
  try {
    const result = await sqlQueryUtils.queryBuilder({
      tableName: 'ComGuest',
      fields,
      where: 'GuestID = @guestId',
      params: { guestId },
      execute
    })
    // Return the first matching record or null if none found
    return result && result.length > 0 ? result[0] : null
  } catch (error) {
    throw new Error('Database query failed: ' + error.message)
  }
}


export const guestModel = {
  findOneByAccount,
  getGuestDetail
}
