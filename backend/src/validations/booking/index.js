import { getModuleItemsByType } from "./get-module-items-by-type.js"
import { getCoursesByDate } from "./get-courses-by-date.js"
import { upsertBooking } from "./upsert-booking.js"
import { getSchedules } from "./get-shedules.js"
export const bookingValidation = {
    getModuleItemsByType,
    getCoursesByDate,
    upsertBooking,
    getSchedules
}
