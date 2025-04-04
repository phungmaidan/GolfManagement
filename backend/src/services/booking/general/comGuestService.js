import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
import { Op } from 'sequelize'
import { GUEST_ATTRIBUTES } from '../../../utils/constant.utils.js'
const { ComGuest } = db;

const getSuggestInfo = async ( search, limit = 5) => {
    try {
        // Create cache key
        const cacheKey = `guest:suggest:${search}`;

        // Check cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) return JSON.parse(cachedData);


        const suggestInfoRecords = await ComGuest.findAll({
            where: {
                FullName: { [Op.like]: `%${search}%` } 
            },
            attributes: GUEST_ATTRIBUTES,
            order: [['CardNumber', 'ASC'], ['FullName', 'ASC']],
            limit: limit,
            raw: true
        });

        // Store in cache
        if (suggestInfoRecords.length) {
            await redisClient.set(cacheKey, JSON.stringify(suggestInfoRecords), 'EX', CACHE_TTL.EXTREMELY_LONG_TERM);
        }

        return suggestInfoRecords;
    } catch (error) {
        console.log('Error in ComGuestService.etSuggestInfo:', error);
        throw error;
    }
}

const invalidateCache = async (search) => {
    try {
        // Delete the main cache
        await redisClient.del(`guest:suggest:${search}`);
    } catch (error) {
        console.error('Error invalidating cache:', error);
    }
}

export const ComGuestService = {
    getSuggestInfo,
    invalidateCache
}