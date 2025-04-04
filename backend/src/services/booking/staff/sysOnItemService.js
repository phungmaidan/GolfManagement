import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { SysOnItem } = db

export const getModuleItemsByType = async (moduleId, type) => {
    // Create cache key
    const cacheKey = `moduleItems:${moduleId}:${type}`;

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
        const items = await SysOnItem.findAll({
            attributes: ['ID', 'Name'],
            where: {
                ModuleID: moduleId,
                OptionType: type,
                Active: true
            },
            order: [['Sequence', 'ASC']]
        });

        // Store in cache
        try {
            if (items.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(items), 'EX', CACHE_TTL.EXTREMELY_LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return items;
    } catch (error) {
        console.error('Error in getModuleItemsByType:', error);
        throw error;
    }
}

/**
 * Invalidate module items cache for specific module and type
 */
export const invalidateCache = async (moduleId, type) => {
    try {
        await redisClient.del(`moduleItems:${moduleId}:${type}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

// Export as a service object similar to CoursesService
export const SysOnItemService = {
    getModuleItemsByType,
    invalidateCache
}