import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCouseAPI, selectSelectedDate, selectStatusGetCourse } from '~/redux/booking/bookingSlice'
import CourseSelector from './CourseSelector/CourseSelector'
import DateSelector from './DateSelector/DateSelector'
import Stats from './Stats/Stats'

function FlightInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DateSelector />
      <CourseSelector />
      <Stats />
    </div>
  )
}

export default FlightInfo
