import { StatusCodes } from 'http-status-codes';
import { itemService } from '~/services/itemService';

const getTemplateSchedule = async (req, res, next) => {
  try {
    const { itemName, CourseID, selectedDate } = req; // Lấy giá trị từ req
    // Gọi service lấy dữ liệu
    const data = await itemService.getTemplateSchedule(CourseID, itemName, selectedDate);

    res.status(StatusCodes.OK).json(data);
  } catch (error) { next(error) }
};

export const itemController = {
  getTemplateSchedule
};
