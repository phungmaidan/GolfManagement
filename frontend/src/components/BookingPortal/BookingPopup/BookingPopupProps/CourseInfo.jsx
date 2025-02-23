import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectSelectedDate,
  selectSelectedCourse,
  selectHoleDescriptions
} from '~/redux/booking/bookingSlice'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'

const CourseInfo = () => {
  const bookingFlight = useSelector(selectSelectedBooking)
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const HoleDescriptions = useSelector(selectHoleDescriptions)
  const [selectedHole, setSelectedHole] = useState(bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.Hole || HoleDescriptions[0])

  const fields = [
    { label: 'Course ID', type: 'text', value: selectedCourse, readOnly: true },
    { label: 'Tee Box', type: 'text', value: bookingFlight?.TeeBox || '', readOnly: true },
    { label: 'Tee Time', type: 'time', value: bookingFlight?.teeTime || '', readOnly: true },
    { label: 'Play Date', type: 'date', value: selectedDate, readOnly: true },
    { label: 'Group', type: 'text', value: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.GroupName || '', readOnly: false }
  ]

  const handleHoleChange = (e) => {
    setSelectedHole(e.target.value)
    // You can add additional logic here to update bookingFlight.Hole if needed
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Course Information</h3>
      <div className="grid grid-cols-3 gap-2 animation-show">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="block text-xs text-gray-600">{field.label}</label>
            <input
              type={field.type}
              className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
              defaultValue={field.value}
              readOnly={field.readOnly}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs text-gray-600">Hole</label>
          <select
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            value={selectedHole}
            onChange={handleHoleChange}
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

export default CourseInfo