import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'

const { MrmCommonCode } = db

/**
 * Get all hole descriptions from MrmCommonCode
 */
const getAllHoleDescriptions = async () => {
    // Create cache key
    const cacheKey = 'MrmCommonCode:hole:descriptions';

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
        // Query hole descriptions from MrmCommonCode
        const holeDescriptions = await MrmCommonCode.findAll({
            where: {
                id: 'HOLE'
            },
            attributes: [
                'description',
            ],
            raw: true,
            order: [['description', 'ASC']]
        });

        // Store in cache
        try {
            if (holeDescriptions.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(holeDescriptions), 'EX', CACHE_TTL.EXTREMELY_LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return holeDescriptions;
    } catch (error) {
        console.error('Error in MrmCommonCodeService.getAllHoleDescriptions:', error);
        throw error;
    }
};

/**
 * Invalidate hole descriptions cache
 */
const invalidateCache = async () => {
    try {
        // Delete the main cache
        await redisClient.del('MrmCommonCode:hole:descriptions');
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const MrmCommonCodeService = {
    getAllHoleDescriptions,
    invalidateCache
};

