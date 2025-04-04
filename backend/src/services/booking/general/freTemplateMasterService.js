import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreTemplateMaster } = db;

const getTemplateMasterByTemplateID = async (templateID) => {
    try {
        // Create cache key
        const cacheKey = `templateMaster:${templateID}`;
        // Check cache
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (cacheError) {
            console.error('Error accessing Redis cache:', cacheError);
        }

        // Query template master from database
        const templateMaster = await FreTemplateMaster.findOne({
            where: {
                TemplateID: templateID
            },
            raw: true
        });

        // Store in cache
        try {
            if (templateMaster) {
                await redisClient.set(cacheKey, JSON.stringify(templateMaster), 'EX', CACHE_TTL.LONG_TERM);
            }
        } catch (cacheError) {
            console.error('Error setting Redis cache:', cacheError);
        }

        return templateMaster;
    } catch (error) {
        console.error('Error in TemplateMasterService.getTemplateMasterByTemplateID:', error)
        throw error
    }
}

const invalidateCache = async (templateID) => {
    try {
        await redisClient.del(`templateMaster:${templateID}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreTemplateMasterService = {
    getTemplateMasterByTemplateID,
    invalidateCache
}