import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedCourse,
  getCouseAPI,
  setSelectedDate,
  selectCourseList,
  selectSelectedDate,
  selectSelectedCourse,
  getScheduleAPI,
  selectBookingStatus,
  selectBookingError,
  selectMorningDetail,
  selectAfternoonDetail,
  selectTeeTimeInfo
} from '~/redux/booking/bookingSlice'
import FlightTable from './FlightTable/FlightTable'

const DailyOperation = () => {
  const dispatch = useDispatch()
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)
  const courses = useSelector(selectCourseList)
  const status = useSelector(selectBookingStatus)
  const error = useSelector(selectBookingError)
  const teeTimeInfo = useSelector(selectTeeTimeInfo)
  const MorningDetail = useSelector(selectMorningDetail)
  const AfternoonDetail = useSelector(selectAfternoonDetail)

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getCouseAPI())
    }
  }, [dispatch, courses])

  useEffect(() => {
    if (selectedDate && selectedCourse) {
      dispatch(getScheduleAPI({ selectedDate, selectedCourse }))
    }
  }, [dispatch, selectedDate, selectedCourse])

  const handleChangeDate = (event) => {
    const newSetDate = event.target.value
    if (newSetDate !== selectedDate) {
      dispatch(setSelectedDate(newSetDate))
      dispatch(getCouseAPI())
      dispatch(getScheduleAPI({ selectedCourse, selectedDate: newSetDate }))
    }
  }

  const handleChangeCourse = (event) => {
    const newCourseId = event.target.value
    if (newCourseId !== selectedCourse) {
      dispatch(setSelectedCourse(newCourseId))
      dispatch(getScheduleAPI({ selectedCourse: newCourseId, selectedDate }))
    }
  }

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf animate-fadeIn flex flex-col">
          <h3 className="font-semibold text-lg mb-3 text-golf-green-700">Chọn thời gian</h3>
          <input
            type="date"
            className="p-2 border outline-0 border-golf-green-700 rounded-md"
            value={selectedDate !== 'null' ? selectedDate : today}
            onChange={handleChangeDate}
          />
          <input
            type="time"
            className="p-2 border outline-0 border-golf-green-700 rounded-md mt-2"
          />
        </div>

        <div className="bg-luxury-gold-50 p-4 rounded-lg shadow-gold animate-fadeIn flex flex-col">
          <h3 className="font-semibold text-lg mb-3 text-luxury-gold-700">Chọn sân golf</h3>
          {courses.length > 0 ? (
            <select
              className="border outline-0 border-golf-green-700 rounded-md p-2"
              value={selectedCourse}
              onChange={handleChangeCourse}
            >
              {courses.map(course => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.Name}
                </option>
              ))}
            </select>
          ) : (
            <div className="p-2 text-gray-500 border cursor-default border-golf-green-700 rounded-md bg-white">
              Không có sân golf nào
            </div>
          )}
        </div>

        <div className="bg-gradient-golf p-4 rounded-lg shadow-golf animate-fadeIn text-white flex flex-col">
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div>
              <p className="text-sm">Slot hiện tại</p>
              <p className="text-2xl font-bold">18/72</p>
            </div>
            <div>
              <p className="text-sm">Đã đăng ký</p>
              <p className="text-2xl font-bold">54</p>
            </div>
            <div>
              <p className="text-sm">Tổng book</p>
              <p className="text-2xl font-bold">126</p>
            </div>
            <div>
              <p className="text-sm">Còn trống</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 md:col-span-3">
        {content}
      </div>
    </div>
  )
}

export default DailyOperation
