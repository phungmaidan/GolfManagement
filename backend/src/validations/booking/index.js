import { getModuleItemsByType } from "./get-module-items-by-type.js"
import { getCoursesByDate } from "./get-courses-by-date.js"
import { upsertBooking } from "./upsert-booking.js"

export const bookingValidation = {
    getModuleItemsByType,
    getCoursesByDate,
    upsertBooking
}
