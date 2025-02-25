import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
  selectSelectedDate,
  selectSelectedCourse,
  selectHoleDescriptions
} from '~/redux/booking/bookingSlice'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'

const CourseInfo = () => {
  const { register } = useFormContext()
  const bookingFlight = useSelector(selectSelectedBooking)
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const HoleDescriptions = useSelector(selectHoleDescriptions)

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Course Information</h3>
      <div className="grid grid-cols-3 gap-2 animation-show">
        <div>
          <label className="block text-xs text-gray-600">Course ID</label>
          <input
            {...register('CourseInfo.courseId')}
            type="text"
            defaultValue={selectedCourse}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-600">Tee Box</label>
          <input
            {...register('CourseInfo.teeBox')}
            type="text"
            defaultValue={bookingFlight?.TeeBox || ''}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            readOnly
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Tee Time</label>
          <input
            {...register('CourseInfo.teeTime')}
            type="time"
            defaultValue={bookingFlight?.teeTime || ''}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            readOnly
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Play Date</label>
          <input
            {...register('CourseInfo.playDate')}
            type="date"
            defaultValue={selectedDate}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            readOnly
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Group</label>
          <input
            {...register('CourseInfo.group')}
            type="text"
            defaultValue={bookingFlight?.bookMap?.[bookingFlight?.bookingIndex || 0]?.GroupName || ''}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600">Hole</label>
          <select
            {...register('CourseInfo.hole')}
            defaultValue={bookingFlight?.bookMap?.[bookingFlight?.bookingIndex || 0]?.Hole || HoleDescriptions[0]}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          >
            {HoleDescriptions.map((hole) => (
              <option key={hole} value={hole}>
                {hole}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CourseInfo)