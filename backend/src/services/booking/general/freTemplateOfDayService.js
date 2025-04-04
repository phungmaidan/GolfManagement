import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreTemplateOfDay } = db;

const getTemplateOfDayByCourseId = async (courseId) => {
    try {
        // Create cache key
        const cacheKey = `templateOfDay:${courseId}`;

        // Check cache
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (cacheError) {
            console.error('Error accessing Redis cache:', cacheError);
        }

        // Query template of day from database
        const templateOfDay = await FreTemplateOfDay.findOne({
            where: {
                CourseID: courseId
            },
            order: [['id', 'DESC']],
            raw: true
        });

        // Store in cache
        try {
            if (templateOfDay) {
                await redisClient.set(cacheKey, JSON.stringify(templateOfDay), 'EX', CACHE_TTL.LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return templateOfDay;
    } catch (error) {
        console.error('Error in TemplateOfDayService.getTemplateOfDayByCourseId:', error)
        throw error
    }
}


const invalidateCache = async (courseId) => {
    try {
        await redisClient.del(`templateOfDay:${courseId}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreTemplateOfDayService = {
    getTemplateOfDayByCourseId,
    invalidateCache
}