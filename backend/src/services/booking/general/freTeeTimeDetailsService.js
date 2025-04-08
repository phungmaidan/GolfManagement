import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreTeeTimeDetails, sequelize } = db;

const getDetailsByDateCourseSession = async (date, courseId, session, transaction) => {
    try {
        // Create cache key
        const cacheKey = `teeTimeDetails:${date}:${courseId}:${session}`;
        // Check cache
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (cacheError) {
            console.error('Error accessing Redis cache:', cacheError);
        }

        // Query tee time details from database
        const teeTimeDetails = await FreTeeTimeDetails.findAll({
            attributes: [
                'TeeTime',
                'TeeBox',
                'Flight',
                'Status',
                'Squeenze'
            ],
            where: {
                TxnDate: sequelize.literal(`[FreTeeTimeDetails].[TxnDate] = CAST('${date}' AS VARCHAR)`),
                CourseID: courseId,
                Session: session
            },
            order: [['TeeTime', 'ASC'], ['TeeBox', 'ASC']],
            transaction: transaction,
            raw: true
        });
        // Store in cache
        try {
            if (teeTimeDetails.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(teeTimeDetails), 'EX', CACHE_TTL.SHORT_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }
        return teeTimeDetails;
    } catch (error) {
        console.error('Error in TeeTimeDetailsService.getDetailsByDateCourseSession:', error)
        throw error
    }
}

/**
 * Invalidate tee time details cache for a specific date, course and session
 */
const invalidateCache = async (date, courseId, session) => {
    try {
        await redisClient.del(`teeTimeDetails:${date}:${courseId}:${session}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};


export const FreTeeTimeDetailsService = {
    getDetailsByDateCourseSession,
    invalidateCache
}