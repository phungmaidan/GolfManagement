// This file is part of the booking service module.
// General Tasks
import { ComCourseMasterService } from "./general/comCourseMasterService.js"
import { ComGuestService } from "./general/comGuestService.js"
import { ComGuestTypeService } from "./general/comGuestTypeService.js"
import { FreBlockBookingService } from "./general/freBlockBookingService.js"
import { FreBookingDetailsService } from "./general/freBookingDetailsService.js"
import { FreBookingMasterService } from "./general/freBookingMasterService.js"
import { FreBookingNumberService } from "./general/freBookingNumberService.js"
import { FreFlightStatusService } from "./general/freFlightStatusService.js"
import { FreTeeTimeDetailsService } from "./general/freTeeTimeDetailsService.js"
import { FreTeeTimeMasterService } from "./general/freTeeTimeMasterService.js"
import { FreTemplateMasterService } from "./general/freTemplateMasterService.js"
import { FreTemplateOfDayService } from "./general/freTemplateOfDayService.js"
import { MrmCommonCodeService } from "./general/mrmCommonCodeService.js"
// Staff
import { SysOnItemService } from "./staff/sysOnItemService.js"
// Guest

// Decleare all services in this module
export const bookingService = {
    // General Tasks
    ComCourseMasterService,
    ComGuestService,
    ComGuestTypeService,
    FreBlockBookingService,
    FreBookingDetailsService,
    FreBookingMasterService,
    FreBookingNumberService,
    FreFlightStatusService,
    FreTeeTimeDetailsService,
    FreTeeTimeMasterService,
    FreTemplateMasterService,
    FreTemplateOfDayService,
    MrmCommonCodeService,
    // Staff
    SysOnItemService
    // Guest
}