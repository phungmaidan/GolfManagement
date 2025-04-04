import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreFlightStatus } = db

/**
 * Get all flight statuses
 */
const getAllFlightStatuses = async () => {
    // Create cache key
    const cacheKey = 'flightStatuses:all';

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
        const flightStatuses = await FreFlightStatus.findAll({
            raw: true
        });

        // Store in cache
        try {
            if (flightStatuses.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(flightStatuses), 'EX', CACHE_TTL.LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return flightStatuses;
    } catch (error) {
        console.error('Error in FreFlightStatusService.getAllFlightStatuses:', error);
        throw error;
    }
};

/**
 * Invalidate flight status cache
 */
const invalidateCache = async () => {
    try {
        await redisClient.del('flightStatuses:all');
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreFlightStatusService = {
    getAllFlightStatuses,
    invalidateCache
}