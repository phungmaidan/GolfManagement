import Joi from 'joi'
import ApiError from '../../utils/apiError.utils.js'
import { StatusCodes } from 'http-status-codes'

export const upsertBooking = async (req, res, next) => {
    const upsertBookingSchema = Joi.object({
        BookingID: Joi.string(),
        BookingMaster: Joi.object({
            entryDate: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
            bookingDate: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
            courseId: Joi.string().required(),
            session: Joi.string().valid("Morning", "Afternoon", "Evening"),
            teeBox: Joi.string().required(),
            hole: Joi.number().integer().valid(9, 18).required(),
            flight: Joi.string().required(),
            teeTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(), // HH:mm:ss
            guestType: Joi.string().valid("Member", "Guest", "Visitor").required(),
            memberNo: Joi.string().allow(""),
            name: Joi.string().required(),
            contactNo: Joi.string().pattern(/^[0-9]{10,11}$/),
            pax: Joi.number().integer().min(1).max(4).required(),
            remark: Joi.string().allow(""),
            recordStatus: Joi.string().allow(null ,""),
            userId: Joi.string().required(),
            authorisedBy: Joi.string().allow(null,""),
            cancelledDate: Joi.date().iso().allow(null),
            cancelledId: Joi.string().allow(null, ""),
            cancelledReason: Joi.string().allow(null, ""),
            cancelledUserId: Joi.string().allow(null, ""),
            contactPerson: Joi.string().allow(""),
            fax: Joi.string().allow(null, "").optional(),
            creditCardNumber: Joi.string().creditCard().allow(null,""),
            creditCardExpiry: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).allow(null, ""), // MM/YY
            email: Joi.string().email().allow(null, ""),
            groupId: Joi.string().allow(null, ""),
            groupName: Joi.string().allow(null, ""),
            salesPerson: Joi.string().allow(null, ""),
            referenceId: Joi.string().allow(null, "")
        }).required(),

        BookingDetails: Joi.array().items(
            Joi.object({
                counter: Joi.number().integer().min(1).max(4).required(),
                guestType: Joi.string().valid("Member", "Guest", "Visitor").required(),
                memberNo: Joi.string().allow(""),
                name: Joi.string().required(),
                handicap: Joi.string().allow(null, ""),
                contactNo: Joi.string().pattern(/^[0-9]{10,11}$/).allow(null, ""),
                guestId: Joi.string(),
                bagTag: Joi.string().allow(""),
                caddyNo: Joi.string().allow(null, ""),
                folioId: Joi.string().allow(null, ""),
                lockerNo: Joi.string().allow(null, ""),
                buggyNo: Joi.string().allow(null, "")
            })
        ).min(1).max(4).required().custom((value, helpers) => {
            // Kiểm tra xem các counter có trùng nhau không
            const counterValues = value.map(item => item.counter);
            const uniqueCounterValues = [...new Set(counterValues)];

            if (counterValues.length !== uniqueCounterValues.length) {
                return helpers.message('counter values must be unique');
            }
            return value;
        })
    });
    try {
        const validatedData = await upsertBookingSchema.validateAsync(
            req.body, 
            { abortEarly: false }
        )
        Object.assign(req, validatedData)
        next()
    } catch (error) {
        const errorMessage = error.details
            ? error.details.map(detail => detail.message).join(', ')
            : error.message
        next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
        
    }
}