import { GET_DB } from '~/config/sqldb'

const getTeeTimeTemplate = async (CourseID) => {
  try {
    const pool = GET_DB()
    const FreTemplateofDayResult = await pool.request()
      .input('CourseID', CourseID)
      .query('Select Top 1 * From FreTemplateofDay Where CourseID=@CourseID')
    const FreTemplateMasterResult = await pool.request()
      .query('Select * From FreTemplateMaster')
    return {
      FreTemplateofDay: FreTemplateofDayResult.recordset,
      FreTemplateMaster: FreTemplateMasterResult.recordset
    }
  } catch (error) {
    throw new Error('Database query failed')
  }
}

export const moduleItemModel = {
  getTeeTimeTemplate
}
