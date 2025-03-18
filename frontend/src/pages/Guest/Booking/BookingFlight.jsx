import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveBookingAPI,
  selectSelectedTimeSlot,
  selectSelectedCourse,
  setSelectedTimeSlot,
  selectBookingStatus
} from '~/redux/guest/guestSlice'
import { TIME_SLOTS } from './mockup-data'

const BookingFlight = ({ selectedDate }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const dispatch = useDispatch()
  const selectedSlot = useSelector(selectSelectedTimeSlot)
  const selectedCourse = useSelector(selectSelectedCourse)
  const bookingStatus = useSelector(selectBookingStatus)
  const isLoading = bookingStatus === 'loading'

  // Mock data - replace with real API data
  const timeSlots = TIME_SLOTS

  const filteredTimeSlots = activeFilter === 'all'
    ? timeSlots
    : timeSlots.filter(slot => slot.category === activeFilter)

  const handleSelectSlot = (slot) => {
    dispatch(setSelectedTimeSlot(slot))
  }

  const handleCompleteBooking = () => {
    if (selectedSlot) {
      dispatch(saveBookingAPI())
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn">
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 py-6">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-white opacity-10">
            <path fill="currentColor" d="M20 10V7a1 1 0 00-1-1h-1V4a1 1 0 00-2 0v2h-2V4a1 1 0 00-2 0v2h-2V4a1 1 0 00-2 0v2H6V4a1 1 0 00-2 0v2H3a1 1 0 00-1 1v3h18zm0 2H2v9a1 1 0 001 1h16a1 1 0 001-1v-9z" />
          </svg>
        </div>

        <div className="relative px-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Available Tee Times {selectedCourse ? `- ${selectedCourse.name}` : ''}
          </h2>
          <p className="text-green-100 text-center mt-1">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Time filters */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => {setActiveFilter('all')}}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              All Times
            </button>
            <button
              onClick={() => setActiveFilter('morning')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === 'morning'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setActiveFilter('afternoon')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === 'afternoon'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              Afternoon
            </button>
          </div>
        </div>

        {/* Time slots */}
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTimeSlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => handleSelectSlot(slot)}
                className={`
                  relative rounded-lg border transition-all duration-300
                  ${slot.available === 0
                ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
                : selectedSlot?.id === slot.id
                  ? 'bg-green-200 border-green-500 shadow-md'
                  : 'bg-cyan-50 border-gray-200 hover:border-green-300 cursor-pointer hover:shadow-sm'
              }
                `}
              >
                {/* Selected indicator */}
                {selectedSlot?.id === slot.id && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500 rounded-full p-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {/* Time */}
                  <div className="flex justify-center mb-3">
                    <span className={`text-3xl font-bold ${
                      slot.available === 0
                        ? 'text-gray-400'
                        : selectedSlot?.id === slot.id
                          ? 'text-green-700'
                          : 'text-gray-800'
                    }`}>
                      {slot.time}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Category */}
                    <span className={`text-xs uppercase tracking-wider font-medium ${
                      slot.available === 0
                        ? 'text-gray-400'
                        : selectedSlot?.id === slot.id
                          ? 'text-green-600'
                          : 'text-gray-500'
                    }`}>
                      {slot.category}
                    </span>

                    {/* Available slots pill */}
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-medium 
                      ${slot.available === 0
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
              }
                    `}>
                      {slot.available === 0 ? 'Full' : `${slot.available} slots`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Booking button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCompleteBooking}
            disabled={!selectedSlot || isLoading}
            className={`
              group relative overflow-hidden px-10 py-4 rounded-lg font-semibold transition-all duration-300
              ${!selectedSlot || isLoading
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] cursor-pointer'
    }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  Processing...
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : selectedSlot ? (
                <>
                  Complete Booking
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                'Select a Time to Continue'
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingFlight