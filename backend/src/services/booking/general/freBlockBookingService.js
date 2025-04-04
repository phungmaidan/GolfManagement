import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreBlockBooking } = db

const getBlockBookingByDate = async (date) => {
    // Create cache key
    const cacheKey = `blockBooking:${new Date(date).toISOString().split('T')[0]}`;

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
        const freBlockBookings = await FreBlockBooking.findAll({
            where: {
                TransactionDate: date
            },
            raw: true
        })

        // Store in cache
        try {
            if (freBlockBookings.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(freBlockBookings), 'EX', CACHE_TTL.LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return freBlockBookings
    } catch (error) {
        console.error('Error in FreBlockBookingService.getBlockBookingByDate:', error)
        throw error
    }
}

/**
 * Invalidate block booking cache for a specific date
 */
const invalidateCache = async (date) => {
    try {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        await redisClient.del(`blockBooking:${formattedDate}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreBlockBookingService = {
    getBlockBookingByDate,
    invalidateCache
}