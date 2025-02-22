import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectCourseList,
  selectSelectedDate,
  selectSelectedCourse,
  selectBookingStatus,
  selectBookingError,
  selectMorningDetail,
  selectAfternoonDetail,
  selectTeeTimeInfo
} from '~/redux/booking/bookingSlice'
import FlightTable from './FlightTable/FlightTable'
import FlightInfo from './FlightInfo/FlightInfo'

const DailyOperation = () => {
  // Log selector values
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)
  const courses = useSelector(selectCourseList)
  const status = useSelector(selectBookingStatus)
  const error = useSelector(selectBookingError)
  const teeTimeInfo = useSelector(selectTeeTimeInfo)
  const MorningDetail = useSelector(selectMorningDetail)
  const AfternoonDetail = useSelector(selectAfternoonDetail)
  let content
  if (!selectedDate || !selectedCourse) {
    content = <div className="py-2 text-luxury-gold-100 text-center font-sans">
      <p>Đang tải thông tin sân...</p>
    </div>
  } else if (status === 'failed' || error || !teeTimeInfo) {
    content = <div className="py-2 text-luxury-gold-100 text-center font-sans" style={{ fontSize: '18px' }}>
      <p>Không thể tải dữ liệu, vui lòng thử lại sau:</p>
      {error?.message && <p>{error?.message}</p>}
    </div>
  } else {
    content = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
        <FlightTable
          title="Morning"
          schedule={MorningDetail}
        />
        <FlightTable
          title="Afternoon"
          schedule={AfternoonDetail}
        />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-6">
      <FlightInfo />
      <div className="col-span-1 md:col-span-3">
        {content}
      </div>
    </div>
  )
}

export default DailyOperation
