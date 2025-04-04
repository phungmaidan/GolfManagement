import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { ComGuestType } = db

const getAll = async () => {
    // Create cache key
    const cacheKey = 'guestTypes:all';

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
        // Query all active guest types
        const guestTypes = await ComGuestType.findAll({
            raw: true
        });

        // Store in cache
        try {
            if (guestTypes.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(guestTypes), 'EX', CACHE_TTL.EXTREMELY_LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return guestTypes;
    } catch (error) {
        console.error('Error in ComGuestTypeService.getAll:', error);
        throw error;
    }
}

const invalidateCache = async () => {
    try {
        await redisClient.del('guestTypes:all');
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
}

export const ComGuestTypeService = {
    getAll,
    invalidateCache
}