import { env } from '~/config/environment'
// Những domain được phép truy cập tới tài nguyên của Server
export const WHITELIST_DOMAINS = [
  'http://192.168.1.125:5173',
  'http://localhost:5173/',
  'http://192.168.0.182:5173',
  'http://192.168.1.250:5173'
]


export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const SESSION = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon'
}

export const BOOKING_ITEM_FIELDS = {
  TEE_TIME_DETAILS: ['TeeBox', 'TeeTime', 'Flight', 'Status'],
  BOOKING_INFO: ['BookingID', 'TeeBox', 'Hole', 'Flight', 'TeeTime', 'GuestType', 'MemberNo', 'Name', 'ContactNo', 'Remark', 'RecordStatus', 'UserID', 'ContactPerson', 'Fax', 'Email', 'CreditCardNumber', 'CreditCardExpiry', 'GroupID', 'GroupName', 'SalesPerson', 'ReferenceID'],
  BLOCK_BOOKING: ['TeeTime', 'Remark', 'Color'],
  PROCESSED_BOOKING: ['BookingID', 'Counter', 'GuestType', 'MemberNo', 'Name', 'ContactNo', 'GuestID', 'BagTag', 'CaddyNo', 'FolioID', 'LockerNo', 'BuggyNo']
}

export const ACCOUNT_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  SUSPENDED: 2,
  DELETED: 3,
  EXPIRED: 4
}