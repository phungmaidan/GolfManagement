import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { moduleItemModel } from '~/models/moduleItemModel';

const getTemplateSchedule = async (courseId, itemName, selectedDate) => {
  if (itemName !== 'daily-operation') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid item name');
  }

  try {
    const result = await moduleItemModel.getTeeTimeTemplate(courseId, selectedDate);
    return result;
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    );
  }
};

export const moduleItemService = {
  getTemplateSchedule
}