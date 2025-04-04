import db from '../../../models/index.js';
import { redisClient } from '../../../config/redis.config.js';
import { CACHE_TTL } from '../../../utils/constant.utils.js';
import { Op } from 'sequelize';
const { FreBookingNumber, sequelize } = db;
import moment from 'moment';
const generateBookingId = async (playDate, transaction) => {
    const bookingDate = moment(playDate, "YYYY-MM-DD HH:mm:ss").toDate();
    const day = bookingDate.getDate().toString().padStart(2, '0')
    const month = (bookingDate.getMonth() + 1).toString().padStart(2, '0')
    const year = bookingDate.getFullYear().toString().slice(2, 4)
    const dateFormatted = `${day}${month}${year}`
    const cacheKey = `bookingNumber:${playDate}`;

    // 🔍 Kiểm tra và lấy giá trị từ Redis nếu có
    let cachedCounter = await redisClient.get(cacheKey);
    if (cachedCounter) {
        cachedCounter = parseInt(cachedCounter, 10) + 1;
        // 🔥 Xóa cache ngay lập tức để tránh dùng lại giá trị cũ
        await redisClient.del(cacheKey);
    }
    // 🔒 Bắt đầu transaction nếu chưa có
    const t = transaction || await sequelize.transaction();
    try {
        if (cachedCounter == null) {
            // Nếu không có cache, lấy từ DB
            const [record, created] = await FreBookingNumber.findOrCreate({
                where: sequelize.literal("CAST(ID AS DATETIME) = CAST(:playDate AS VARCHAR)"),
                defaults: { counter: 1 },
                lock: t.LOCK.UPDATE, // 🔒 Chặn ghi đồng thời
                transaction: t,
                replacements: { playDate }
            })
            cachedCounter = created ? 1 : (record?.dataValues?.counter);
        }
        const counterToUpdate = cachedCounter + 1
        await FreBookingNumber.update(
            { counter: counterToUpdate },
            {
                where: sequelize.literal(`CAST(ID AS DATETIME) = CAST('${playDate}' AS VARCHAR)`),
                transaction: t
            }
        )
        // Lưu giá trị mới vào cache sau khi upsert thành công
        await redisClient.set(cacheKey, cachedCounter.toString(), 'EX', CACHE_TTL.SHORT_TERM); // Lưu vào cache và đặt thời gian sống cho cache

        const counterToGenerateBookingId = cachedCounter.toString().padStart(3, '0');
        return `${dateFormatted}-${counterToGenerateBookingId}`;
    } catch (error) {
        console.error('Error generating booking ID:', error);
        throw error;
    }
}

const invalidateCache = async (date) => {
    try {
        await redisClient.del(`bookingNumber:${date}`);
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
}

export const FreBookingNumberService = {
    generateBookingId,
    invalidateCache
};