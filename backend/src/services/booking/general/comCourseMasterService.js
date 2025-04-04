import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { ComCourseMaster, ComCourseMaintenance } = db

const getCoursesByDate = async (date) => {
    // Create cache key
    const cacheKey = `coursesByDate:${date}`;

    // Check cache
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (cacheError) {
        console.error('Error accessing Redis cache:', cacheError);
    }

    try {
        // Truy vấn courses active từ ComCourseMaintenance
        const activeCourses = await ComCourseMaintenance.findAll({
            attributes: ['CourseID'],
            where: {
                Active: 1,
                TxnDate: db.sequelize.literal(`CONVERT(VARCHAR(10), TxnDate, 111) = '${date}'`)
            },
            raw: true
        })

        // Truy vấn các courses inactive từ ComCourseMaintenance
        const inactiveCourses = await ComCourseMaintenance.findAll({
            attributes: ['CourseID'],
            where: {
                Active: 0,
                TxnDate: db.sequelize.literal(`CONVERT(VARCHAR(10), TxnDate, 111) = '${date}'`)
            },
            raw: true
        })

        // Lấy danh sách các CourseID
        const activeCourseIDs = activeCourses.map(course => course.CourseID)
        const inactiveCourseIDs = inactiveCourses.map(course => course.CourseID)

        // Truy vấn ComCourseMaster dựa trên điều kiện
        const courses = await ComCourseMaster.findAll({
            attributes: ['CourseID', 'Name', 'HomeCourse'],
            where: {
                [db.Sequelize.Op.or]: [
                    {
                        HomeCourse: 1,
                        CourseID: { [db.Sequelize.Op.notIn]: inactiveCourseIDs }
                    },
                    {
                        HomeCourse: 0,
                        CourseID: { [db.Sequelize.Op.in]: activeCourseIDs }
                    }
                ]
            },
            raw: true,
            order: [['CourseID', 'ASC']]
        })

        // Store in cache
        try {
            if (courses.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(courses), 'EX', CACHE_TTL.SHORT_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return courses
    } catch (error) {
        console.error('Error in ComCourseMasterService.getCoursesByDate:', error)
        throw error
    }
}

const invalidateCache = async (date) => {
    try {
        await redisClient.del(`coursesByDate:${date}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const ComCourseMasterService = {
    getCoursesByDate,
    invalidateCache
}