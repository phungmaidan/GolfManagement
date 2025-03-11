import React, { useState } from 'react'
import DatePicker from './DatePicker'
import CoursePicker from './CoursePicker'
import Title from './Title'

function Booking() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null) // Reset time slot when date changes
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setSelectedTimeSlot(null) // Reset time slot when course changes
  }

  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto p-4 space-y-8">
      <Title />

      {/* Course Selection Section */}
      <section className="booking-section">
        <h2 className="text-xl font-semibold mb-4 text-white">1. Select Your Course</h2>
        <div className="w-full flex justify-center">
          <CoursePicker onSelect={handleCourseSelect} />
        </div>
      </section>

      {/* Date Selection Section */}
      <section className="booking-section">
        <h2 className="text-xl font-semibold mb-4 text-white">2. Choose Your Date</h2>
        <div className="w-full flex justify-center">
          <DatePicker onSelect={handleDateSelect} />
        </div>
      </section>

      {/* Selection Summary */}
      {selectedCourse && selectedDate && (
        <section className="booking-section">
          <h2 className="text-xl font-semibold mb-4 text-white">3. Review Your Selection</h2>
          <div className="bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Selected Course</span>
                <p className="font-bold text-golf-green-700">{selectedCourse.name}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">Selected Date</span>
                <p className="font-bold text-golf-green-700">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Placeholder for future Time Slot selection */}
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-500">Tee Time</span>
              <p className="font-bold text-golf-green-700">
                {selectedTimeSlot ? selectedTimeSlot : 'Please select a time slot'}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="bg-luxury-gold-500 hover:bg-luxury-gold-600 text-white px-8 py-3 rounded-lg font-semibold shadow transition-colors"
                disabled={!selectedTimeSlot}
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Booking