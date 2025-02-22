import React, { useEffect, useCallback, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedCourse,
  getCouseAPI,
  setSelectedDate,
  selectCourseList,
  selectSelectedDate,
  selectSelectedCourse,
  selectTodayDate,
  selectBookingStatus
} from '~/redux/booking/bookingSlice'
import { useDebounce } from '~/hooks/useDebounce'
function FlightInfo() {
  const today = useSelector(selectTodayDate)
  const selectedDate = useSelector(selectSelectedDate)
  const courses = useSelector(selectCourseList)
  const selectedCourse = useSelector(selectSelectedCourse)
  const status = useSelector(selectBookingStatus)
  const dispatch = useDispatch()
  const debounceDate = useDebounce(selectedDate, 500)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCouseAPI())
    }
  }, [dispatch, status])

  // Memoize các handler functions
  const handleChangeDate = useCallback((event) => {
    const newSetDate = event.target.value
    dispatch(setSelectedDate(newSetDate))
    if (newSetDate !== selectedDate) {
      dispatch(getCouseAPI(newSetDate))
    }
  }, [dispatch, selectedDate])

  const handleChangeCourse = useCallback((event) => {
    const newCourseId = event.target.value
    if (newCourseId !== selectedCourse) {
      dispatch(setSelectedCourse(newCourseId))
    }
  }, [dispatch, selectedCourse])

  const renderCourseSelector = () => {
    const hasCourses = courses?.length > 0

    if (!hasCourses) {
      return (
        <div className="p-2 text-gray-500 border cursor-default border-golf-green-700 rounded-md bg-white">
          Không có sân golf nào
        </div>
      )
    }

    return (
      <select
        className="border outline-0 border-golf-green-700 rounded-md p-2"
        value={selectedCourse ?? ''}
        onChange={handleChangeCourse}
      >
        {courses.map(course => (
          <option key={course.CourseID} value={course.CourseID}>
            {course.Name}
          </option>
        ))}
      </select>
    )
  }

  return (
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
        {renderCourseSelector()}
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
  )
}

export default FlightInfo
