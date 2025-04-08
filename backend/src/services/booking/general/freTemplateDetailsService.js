import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreTemplateDetails } = db;

const getTemplateDetailsByTemplateIdSession = async (templateId, session) => {
    try {
        // Create cache key
        const cacheKey = `templateDetails:${templateId}:${session}`;

        // Check cache
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (cacheError) {
            console.error('Error accessing Redis cache:', cacheError);
        }

        // Query template details from database
        const templateDetails = await FreTemplateDetails.findAll({
            where: {
                TemplateID: templateId,
                Session: session
            },
            order: [['TeeBox', 'ASC'], ['Flight', 'ASC'], ['TeeTime', 'ASC']],
            raw: true
        });

        // Store in cache
        try {
            if (templateDetails.length > 0) {
                await redisClient.set(cacheKey, JSON.stringify(templateDetails), 'EX', CACHE_TTL.LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return templateDetails;
    } catch (error) {
        console.error('Error in TemplateDetailsService.getTemplateDetailsByTemplateIdSession:', error)
        throw error
    }
}

const invalidateCache = async (templateId, session) => {
    try {
        await redisClient.del(`templateDetails:${templateId}:${session}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
}

export const FreTemplateDetailsService = {
    getTemplateDetailsByTemplateIdSession,
    invalidateCache
}