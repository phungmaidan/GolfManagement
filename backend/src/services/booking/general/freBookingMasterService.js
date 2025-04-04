import db from '../../../models/index.js';
import { redisClient } from '../../../config/redis.config.js';
import { CACHE_TTL } from '../../../utils/constant.utils.js';
import { Op } from 'sequelize';

const { FreBookingMaster, sequelize } = db;
const RECORD_STATUS = {
    REGISTERED: 'Registered'
};

const getBookingMasterById = async (bookingId, transaction) => {
    const options = transaction ? { transaction } : {};
    try {
        return await FreBookingMaster.findByPk(bookingId, options);
    } catch (error) {
        console.error('Error in FreBookingMasterService.getBookingMasterById:', error);
        throw error;
    }
}

const getBookingMasterByDateCourseSession = async (date, course, session) => {
    const cacheKey = `bookingMaster:${date}:${course}:${session}`;
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (cacheError) {
        console.error('Error accessing Redis cache:', cacheError);
    }

    try {
        const freBookingMasters = await FreBookingMaster.findAll({
            where: {
                CourseID: course,
                BookingDate: date,
                Session: session,
                [Op.or]: [
                    { RecordStatus: null },
                    { RecordStatus: RECORD_STATUS.REGISTERED }
                ]
            },
            raw: true,
            order: [['Session', 'ASC'], ['TeeBox', 'ASC'], ['TeeTime', 'ASC'], ['BookingID', 'ASC']]
        });

        if (freBookingMasters.length > 0) {
            await redisClient.set(cacheKey, JSON.stringify(freBookingMasters), 'EX', CACHE_TTL.LONG_TERM);
        }

        return freBookingMasters;
    } catch (error) {
        console.error('Error in FreBookingMasterService.getBookingMasterByDateCourseSession:', error);
        throw error;
    }
};

const upsertBookingMaster = async (bookingId, bookingMasterData, transaction) => {
    const options = transaction ? { transaction } : {};
    try {
        console.log('Upserting BookingMaster with ID:', bookingId);
        let result;
        const existingBooking = await getBookingMasterById(bookingId, transaction);
        if (!existingBooking) {
            console.log('Booking not found, creating new booking master:', bookingId);
            // Tạo mới BookingMaster
            const creatingResult = await FreBookingMaster.create({
                ...bookingMasterData,
                bookingId: bookingId,
                entryDate: sequelize.literal(`CAST('${bookingMasterData.entryDate}' AS VARCHAR)`),
                bookingDate: sequelize.literal(`CAST('${bookingMasterData.bookingDate}' AS VARCHAR)`),
                teeTime: sequelize.literal(`CAST('${bookingMasterData.teeTime}' AS VARCHAR)`),

            }, options);

            result = creatingResult
        }
        else {
            const updatingResult = await FreBookingMaster.update(
                {
                    ...bookingMasterData,
                    entryDate: sequelize.literal(`CAST('${bookingMasterData.entryDate}' AS VARCHAR)`),
                    bookingDate: sequelize.literal(`CAST('${bookingMasterData.bookingDate}' AS VARCHAR)`),
                    teeTime: sequelize.literal(`CAST('${bookingMasterData.teeTime}' AS VARCHAR)`),
                }, 
                {
                    where: { BookingID: bookingId },
                    ...options
                }
            );
            if (updatingResult[0] > 0) { // Kiểm tra có bản ghi nào bị cập nhật hay không
                const updatedBookingMaster = await FreBookingMaster.findOne({
                    where: { BookingID: bookingId },
                    raw: true, // Trả về bản ghi dưới dạng object thuần
                    ...options
                });
                result = updatedBookingMaster; // Trả lại bookingMaster đã cập nhật
            } else {
                result = null; // Không có bản ghi nào bị thay đổi
            }
        }

        return result;
    } catch (error) {
        console.error('Error in FreBookingMasterService.upsertBookingMaster:', error);
        transaction && await transaction.rollback();
        throw error;
    }
}

const invalidateCache = async (date, course, session = null) => {
    try {
        if (session === null) {
            const keys = await redisClient.keys(`bookingMaster:${date}:${course}:*`);
            if (keys.length > 0) {
                await Promise.all(keys.map(key => redisClient.del(key)));
            }
        } else {
            await redisClient.del(`bookingMaster:${date}:${course}:${session}`);
        }
    } catch (error) {
        console.error('Error when deleting Redis cache:', error);
    }
};

export const FreBookingMasterService = {
    getBookingMasterById,
    upsertBookingMaster,
    getBookingMasterByDateCourseSession,
    // saveBookingMaster,
    invalidateCache
};

// const saveBookingMaster = async (bookingData) => {
//     let transaction;
//     try {
//         const { BookingInfo, CourseInfo, IDInfo, GuestList, OtherInfo } = bookingData;
//         // Khởi tạo transaction
//         transaction = await sequelize.transaction();

//         // Generate BookingID if not provided
//         let bookingId = BookingInfo.bookingId || await generateBookingId(CourseInfo.playDate, transaction);

//         // Tạo master data
//         const masterData = {
//             BookingID: bookingId,
//             EntryDate: new Date().toISOString().split('T')[0],
//             BookingDate: CourseInfo.playDate,
//             CourseID: CourseInfo.courseId,
//             Session: CourseInfo.Session,
//             TeeBox: CourseInfo.teeBox,
//             Hole: CourseInfo.hole,
//             Flight: CourseInfo.group,
//             TeeTime: CourseInfo.teeTime,
//             GuestType: GuestList[0]?.GuestType || '',
//             MemberNo: GuestList[0]?.MemberNo || '',
//             Name: GuestList[0]?.Name || '',
//             ContactNo: OtherInfo.ContactNo,
//             Pax: GuestList.filter(g => g.Name).length,
//             Remark: OtherInfo.Remark,
//             UserID: IDInfo.userId,
//             ContactPerson: OtherInfo.ContactPerson,
//             Fax: OtherInfo.Fax,
//             CreditCardNumber: OtherInfo.CreditCardNumber,
//             CreditCardExpiry: OtherInfo.CreditCardExpiry,
//             Email: OtherInfo.Email,
//             SalesPerson: OtherInfo.SalesPerson,
//             ReferenceID: OtherInfo.ReferenceID
//         };

//         // Xử lý create/update booking master
//         if (BookingInfo.bookingId) {
//             await FreBookingMaster.update(masterData, {
//                 where: { BookingID: bookingId },
//                 transaction
//             });
//             // Xóa details cũ
//             await FreBookingDetails.destroy({
//                 where: { BookingID: bookingId },
//                 transaction
//             });
//         } else {
//             await FreBookingMaster.create(masterData, { transaction });
//         }

//         // Tạo booking details
//         const detailsData = GuestList.filter(g => g.Name).map((guest, index) => ({
//             BookingID: bookingId,
//             Counter: index + 1,
//             GuestType: guest.GuestType,
//             MemberNo: guest.MemberNo,
//             Name: guest.Name,
//             ContactNo: OtherInfo.ContactNo,
//             GuestID: guest.GuestID,
//             BagTag: guest.DailyNo || '',
//             CaddyNo: guest.Caddy || IDInfo.caddy,
//             FolioID: '',
//             LockerNo: guest.LockerNo,
//             BuggyNo: guest.BuggyNo || IDInfo.buggy
//         }));

//         await FreBookingDetails.bulkCreate(detailsData, { transaction });

//         // Commit transaction
//         await transaction.commit();
//         return {
//             success: true,
//             bookingId,
//             message: `Booking ${BookingInfo.bookingId ? 'updated' : 'created'} successfully`
//         };
//     } catch (error) {
//         if (transaction) await transaction.rollback();
//         console.error('Error saving booking:', error);
//         throw error;
//     }
// };
