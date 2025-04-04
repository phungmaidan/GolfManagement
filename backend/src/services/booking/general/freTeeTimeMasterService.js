import db from '../../../models/index.js'
import { Op } from 'sequelize'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreTeeTimeMaster } = db

const getTeeTimeMasterByDateCoureTemplateID = async (date, courseID, templateID) => {
    // Tạo khóa cache
    const cacheKey = `teeTimeMaster:${courseID}:${new Date(date).toISOString().split('T')[0]}:${templateID}`;

    // Kiểm tra cache
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (cacheError) {
        console.error('Lỗi khi truy cập Redis cache:', cacheError);
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();

        // Kiểm tra xem đã có dữ liệu trong FreTeeTimeMaster chưa
        const teeTimeMasterResult = await FreTeeTimeMaster.findAll({
            where: {
                CourseID: courseID,
                TxnDate: date,
                [Op.or]: [
                    { TemplateID: templateID },
                    { TemplateID: null }
                ]
            },
            transaction,
            raw: true
        });

        if (teeTimeMasterResult.length > 0) {
            await redisClient.set(cacheKey, JSON.stringify(teeTimeMasterResult), 'EX', CACHE_TTL.LONG_TERM);
            await transaction.commit();
            return teeTimeMasterResult;
        }

        console.info(`Không tìm thấy dữ liệu TeeTimeMaster. Đang khởi tạo...`);

        // Gọi stored procedure
        const createdData = await releaseTeeTime(date, courseID, templateID, transaction);

        if (createdData.length > 0) {
            await redisClient.set(cacheKey, JSON.stringify(createdData), 'EX', cacheTTL);
        }

        await transaction.commit();
        return createdData;

    } catch (error) {
        console.error('Error in TeeTimeMasterService.getTeeTimeMasterByDateCoureTemplateID:', error)
        throw error
    }
}

const releaseTeeTime = async (date, courseID, templateID, transaction) => {
    try {
        const result = await sequelize.query(
            'EXEC sp_FreReleaseTeeTime @CourseID = :courseID, @TxnDate = :date, @TemplateID = :templateID',
            {
                replacements: { courseID, date, templateID },
                type: sequelize.QueryTypes.SELECT,
                transaction
            }
        );

        return result || [] // Trả về mảng rỗng nếu không có dữ liệu;
    } catch (error) {
        console.error('Error in releaseTeeTime:', error)
        throw error
    }
}

/**
 * Xóa cache của FreTeeTimeMaster cho courseID, date, (templateID nếu có) cụ thể
 */
const invalidateCache = async (courseID, date, templateID = null) => {
    try {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        if (templateID === null) {
            const keys = await redisClient.keys(`teeTimeMaster:${courseID}:${formattedDate}:*`);
            if (keys.length > 0) await redisClient.del(keys);
        } else {
            await redisClient.del(`teeTimeMaster:${courseID}:${formattedDate}:${templateID}`);
        }
    } catch (error) {
        console.error('Lỗi khi xóa Redis cache:', error);
    }
};

export const FreTeeTimeMasterService = {
    getTeeTimeMasterByDateCoureTemplateID,
    invalidateCache
}