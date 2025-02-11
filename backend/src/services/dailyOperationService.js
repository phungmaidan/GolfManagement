import { dailyOperationModel } from "~/models/dailyOperationModel"


const getInfo = async () => {
  const getFreFlightStatus = await dailyOperationModel.getFreFlightStatus()
  const getComGuestType = await dailyOperationModel.getComGuestType()
  return { getFreFlightStatus, getComGuestType }
}

export const dailyOperationService = {
  getInfo
}
