import { StatusCodes } from 'http-status-codes';
import { moduleItemService } from '~/services/moduleItemService';

const getTemplateSchedule = async (req, res, next) => {
  try {
    const { itemName, CourseID, selectedDate } = req; // Lấy giá trị từ req
    // Gọi service lấy dữ liệu
    const data = await moduleItemService.getTemplateSchedule(CourseID, itemName, selectedDate);

    res.status(StatusCodes.OK).json(data);
  } catch (error) { next(error) }
};

export const moduleItemController = {
  getTemplateSchedule
};
