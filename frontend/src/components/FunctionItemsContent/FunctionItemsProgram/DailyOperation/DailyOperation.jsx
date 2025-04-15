import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectStatusGetSchedule,
  selectErrorGetSchedule,
  selectSelectedDate,
  selectSelectedCourse,
  selectSelectedSession,
  selectTeeTimes
} from '~/redux/booking/bookingSlice'
import { selectLastBookingUpdate } from '~/redux/socket/socketSlice'
import FlightTable from './FlightTable/FlightTable'

const DailyOperation = () => {
  const dispatch = useDispatch()
  const statusGetSchedule = useSelector(selectStatusGetSchedule)
  const errorGetSchedule = useSelector(selectErrorGetSchedule)
  const lastBookingUpdate = useSelector(selectLastBookingUpdate)
  const selectedSession = useSelector(selectSelectedSession)
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)
  const teeTimes = useSelector(selectTeeTimes)

  // Effect to handle visual feedback on booking updates
  useEffect(() => {
    if (lastBookingUpdate &&
        lastBookingUpdate.date === selectedDate &&
        lastBookingUpdate.courseId === selectedCourse) {
      // Add any additional visual feedback here if needed
    }
  }, [lastBookingUpdate, selectedDate, selectedCourse])

  let content
  if (statusGetSchedule === 'success') {
    content = (
      <FlightTable
        title={selectedSession}
        schedule={teeTimes}
        Session={selectedSession}
      />
    )
  }
  else if (statusGetSchedule === 'loading') {
    content = <div className="py-2 text-luxury-gold-100 text-center font-sans">
      <p>Đang tải thông tin sân...</p>
    </div>
  } else {
    content = <div className="py-2 text-luxury-gold-100 text-center font-sans" style={{ fontSize: '18px' }}>
      <p>Không thể tải dữ liệu, vui lòng thử lại sau!</p>
      {errorGetSchedule?.message && <p>{errorGetSchedule?.message}</p>}
    </div>
  }

  return (
    <div className="mt-3 flex flex-col gap-6">
      <div className="col-span-1 md:col-span-3">
        {content}
      </div>
    </div>
  )
}

export default DailyOperation
