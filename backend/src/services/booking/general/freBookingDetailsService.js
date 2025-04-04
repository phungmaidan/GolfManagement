import db from '../../../models/index.js'
import { redisClient } from '../../../config/redis.config.js'
import { CACHE_TTL } from '../../../utils/constant.utils.js'
const { FreBookingDetails } = db

/**
 * Lấy tất cả bookingDetails của một bookingMaster
 * @param {string} bookingId - ID của booking
 * @param {Transaction} [transaction] - Transaction tùy chọn
 * @returns {Promise<Array>} Danh sách chi tiết booking
 */
const getDetailsByBookingID = async (bookingID, transaction = null) => {
    const options = transaction ? { transaction } : {};
    try {
        return await FreBookingDetails.findAll({
            where: {
                BookingID: bookingID
            },
            order: [['Counter', 'ASC']],
            raw: true,
            ...options
        })
    } catch (error) {
        console.error('Error in FreBookingDetailsService.getDetailsByBookingID:', error)
        throw error
    }
}

/**
 * Xử lý bookingDetails khi cập nhật bookingMaster
 * @param {string} bookingId - ID của booking
 * @param {number} pax - số Pax của bookingMaster (1 - 4)
 * @param {Object} detailData - Dữ liệu cập nhật
 * @param {Transaction} [transaction] - Transaction tùy chọn
 * @returns {Promise<boolean>} Kết quả cập nhật
 */
const handleBookingDetailsWhenUpdatingBookingMaster = async (bookingId, pax, detailsData, transaction = null) => {
    const options = transaction ? { transaction } : {};
    try {
      await FreBookingDetails.destroy({
        where: { bookingId: bookingId },
        ...options
      });

        detailsData.forEach((detail, index) => {
            detail.bookingId = bookingId;
        });
      const result = await FreBookingDetails.bulkCreate(detailsData.splice(0, pax), options);
      return result;
    } catch (error) {
        console.error('Error in FreBookingDetailsService.updateOneBookingDetail:', error);
        throw error;
    }
}

/**
 * Invalidate booking details cache for a specific booking ID
 */
const invalidateCache = async (bookingID) => {
    try {
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreBookingDetailsService = {
    getDetailsByBookingID,
    handleBookingDetailsWhenUpdatingBookingMaster,
    invalidateCache
}