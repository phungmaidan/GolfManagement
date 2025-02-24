import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedCourse,
  getScheduleAPI,
  getCouseAPI,
  selectCourseList,
  selectSelectedDate,
  selectSelectedCourse,
  selectStatusGetCourse
} from '~/redux/booking/bookingSlice'
import { joinRoom } from '~/redux/socket/socketSlice'

function CourseSelector() {
  const courses = useSelector(selectCourseList)
  const hasCourses = courses?.length > 0
  const dispatch = useDispatch()
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)
  const statusGetCourse = useSelector(selectStatusGetCourse)

  useEffect(() => {
    if (statusGetCourse === 'idle') {
      dispatch(getCouseAPI(selectedDate))
    }
  }, [dispatch, statusGetCourse, selectedDate])
  const handleChangeCourse = useCallback((event) => {
    const newCourseId = event.target.value
    if (newCourseId !== selectedCourse) {
      dispatch(setSelectedCourse(newCourseId))
      dispatch(getScheduleAPI({ date: selectedDate, course: newCourseId }))
      // Join new room when course changes
      dispatch(joinRoom({ date: selectedDate, courseId: newCourseId }))
    }
  }, [selectedCourse, dispatch, selectedDate])

  let context
  if (hasCourses) {
    context =
      <select
        className="border outline-0 border-golf-green-700 text-golf-green-700 rounded-md p-2"
        value={selectedCourse ?? ''}
        onChange={handleChangeCourse}
      >
        {courses.map(course => (
          <option key={course.CourseID} value={course.CourseID}>
            {course.Name}
          </option>
        ))}
      </select>
  }
  else {
    context =
      <div className="p-2 text-gray-500 border cursor-default border-golf-green-700 rounded-md">
        Không có sân golf nào
      </div>

  }
  return (
    <div className="bg-luxury-gold-50 p-4 rounded-lg shadow-gold animate-fadeIn flex flex-col">
      <h3 className="font-semibold text-lg mb-3 text-luxury-gold-700">Chọn sân golf</h3>
      {context}
    </div>
  )
}

export default CourseSelector
