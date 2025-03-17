import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectSelectedCourse,
  selectSelectedDate,
  selectSelectedTimeSlot
} from '~/redux/guest/guestSlice'

const SelectionSummary = () => {
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const selectedTimeSlot = useSelector(selectSelectedTimeSlot)

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
      <div className="bg-[linear-gradient(135deg,var(--luxury-gold-500)_0%,var(--luxury-gold-600)_100%)] h-15 text-white p-4">
        <h2 className="text-xl font-semibold text-center">Booking Summary</h2>
      </div>
      <div className="p-4 h-75 flex flex-col justify-between gap-2">
        <div className="p-2 h-20 bg-golf-green-50 rounded-lg border border-green-500 shadow-md">
          <span className="text-sm text-gray-500">Selected Date</span>
          <p className="font-bold text-golf-green-700">
            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Please select a date'}
          </p>
        </div>
        <div className="p-2 h-20 bg-golf-green-50 rounded-lg border border-green-500 shadow-md">
          <span className="text-sm text-gray-500">Selected Course</span>
          <p className="font-bold text-golf-green-700">{selectedCourse ? selectedCourse?.name : 'Please select a course'}</p>
        </div>

        {/* Time Slot selection */}
        <div className="p-2 h-20 bg-golf-green-50 rounded-lg border border-green-500 shadow-md">
          <span className="text-sm text-gray-500">Tee Time</span>
          <p className="font-bold text-golf-green-700">
            {selectedTimeSlot ? `${selectedTimeSlot?.time} - ${selectedTimeSlot?.category.toUpperCase()}` : 'Please select a time slot below'}
          </p>
        </div>

        {!selectedTimeSlot && (
          <div className="flex items-center justify-center p-2 bg-amber-50 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-amber-700">Please select a tee time below to continue</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectionSummary