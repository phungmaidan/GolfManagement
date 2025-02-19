import { pick } from 'lodash'
import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const formatDate = (date) => moment(date, DATE_FORMAT)
export const getDayOfWeek = (date) => formatDate(date).format('dddd')
/**
 * Simple method to Convert a String to Slug
 * Có thể tham khảo thêm kiến thức liên quan ở đây: https://byby.dev/js-slugify-string
 */
export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

// Lấy một vài dữ liệu cụ thể trong User để tránh việc trả về các dữ liệu nhạy cảm như hash password
export const pickUser = (user) => {
  if (!user) return {}
  return pick(user, [
    'ID',
    'Name',
    'UserGroup',
    'Level',
    'Active'
  ])
}

export const TeeTimeUtils = {
  formatTime: (isoString) => {
    const date = new Date(isoString)
    return date.toISOString().split('T')[1].split('.')[0]
  },
  formatTeeTimes: (teeTimes) => {
    return teeTimes.map(item => ({
      ...item,
      TeeTime: TeeTimeUtils.formatTime(item.TeeTime)
    }))
  }
}

