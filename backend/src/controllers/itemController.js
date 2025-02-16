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


const getCourse = async (req, res, next) => {
  try {
    const { date } = req.validatedData; // Lấy giá trị từ req.query
    // Gọi service lấy dữ liệu
    const data = await itemService.getCourse(date);

    res.status(StatusCodes.OK).json(data);
  } catch (error) { next(error) }
}

const getSchedule = async (req, res, next) => {
  try {
    const { CourseID, date } = req.validatedData; // Lấy giá trị từ req.query
    // Gọi service lấy dữ liệu
    const data = await itemService.getSchedule(CourseID, date);

    res.status(StatusCodes.OK).json(data);
  } catch (error) { next(error) }
}

export const itemController = {
  getTemplateSchedule,
  getCourse,
  getSchedule
};
