import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedDate,
  setSelectedCourse,
  setSelectedTimeSlot,
  selectSelectedDate,
  selectSelectedCourse,
  selectSelectedTimeSlot
} from '~/redux/guest/guestSlice'
import DatePicker from './DatePicker'
import CoursePicker from './CoursePicker'
import SelectionSummary from './SelectionSummary'
import BookingFlight from './BookingFlight'
import Title from './Title'

function Booking() {
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedTimeSlot = useSelector(selectSelectedTimeSlot)

  return (
    <div className="flex flex-col items-center py-10 gap-5">
      <div className="self-start ml-10">
        <Title />
      </div>

      {/* Progress Indicator with perfectly centered lines */}
      <div className="w-full max-w-xl mb-8">
        <div className="relative flex justify-between items-center">
          {/* Progress line background - runs behind everything */}
          <div className="absolute h-1 bg-gray-200 left-5 right-5 top-[19px]"></div>

          {/* Active progress line - grows based on progress */}
          <div
            className={'absolute h-1 bg-luxury-gold-500 left-5 top-[19px] transition-all duration-500'}
            style={{
              width: selectedTimeSlot
                ? 'calc(100% - 80px)'
                : selectedCourse
                  ? 'calc(66.66% - 60px)'
                  : selectedDate
                    ? 'calc(33.33% - 30px)'
                    : '0%'
            }}
          ></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${selectedDate ? 'bg-luxury-gold-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
            </div>
            <span className="text-sm mt-1 text-white">Select Date</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${selectedCourse ? 'bg-luxury-gold-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <span className="text-sm mt-1 text-white">Select Course</span>
          </div>


          {/* Step 3 */}
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${selectedTimeSlot ? 'bg-luxury-gold-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
            <span className="text-sm mt-1 text-white">Select Time</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
              4
            </div>
            <span className="text-sm mt-1 text-white">Complete</span>
          </div>
        </div>
      </div>

      <div className="flex xl:flex-row flex-col gap-10">
        {/* Date Selection Section */}
        <section className="booking-section xl:w-md w-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">1. Choose Your Date</h2>
          <DatePicker />
        </section>

        {/* Course Selection Section */}
        <section className="booking-section xl:w-md w-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">2. Select Your Course</h2>
          <CoursePicker />
        </section>

        {/* Selection Summary */}
        <section className="booking-section xl:w-md w-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">3. Your Selection</h2>
          <SelectionSummary />
        </section>
      </div>

      {/* Booking Flight Section */}
      {selectedCourse && selectedDate && (
        <section className="booking-section xl:w-[calc(3*28rem+2*40px)] w-xl">
          <h2 className="text-xl font-semibold text-white mb-4">4. Choose Your Tee Time</h2>
          <BookingFlight />
        </section>
      )}
    </div>
  )
}

export default Booking