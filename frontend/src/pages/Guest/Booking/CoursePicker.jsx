import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCourse, selectSelectedCourse, setSelectedTimeSlot, getScheduleAPI, selectSelectedDate } from '~/redux/guest/guestSlice'
import { COURSES } from './mockup-data'

const CoursePicker = () => {
  const dispatch = useDispatch()
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const [imageError, setImageError] = useState({})

  const handleSelect = (course) => {
    dispatch(setSelectedTimeSlot(null))
    dispatch(setSelectedCourse(course))
    dispatch(getScheduleAPI({ date: selectedDate, course: course?.id }))
  }

  const handleImageError = (courseId) => {
    setImageError(prev => ({
      ...prev,
      [courseId]: true
    }))
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
      <div className="bg-[linear-gradient(135deg,var(--luxury-gold-500)_0%,var(--luxury-gold-600)_100%)] h-15 text-white p-4">
        <h2 className="text-xl font-semibold text-center">Select a Golf Course</h2>
      </div>

      <div className="p-4 h-75 overflow-y-auto">
        <div className="space-y-4">
          {COURSES.map((course) => (
            <div
              key={course.id}
              onClick={() => handleSelect(course)}
              className={`
                relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                ${selectedCourse?.id === course.id
              ? 'ring-2 ring-luxury-gold-500 shadow-lg'
              : 'hover:shadow-md border border-gray-200'}
              `}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 h-20 sm:h-auto relative">
                  {imageError[course.id] ? (
                    // Fallback when image fails to load
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-500 text-sm">{course.name}</span>
                    </div>
                  ) : (
                    // Try to display image with error handling
                    <>
                      <img
                        src={course.image}
                        alt={course.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => handleImageError(course.id)}
                      />
                      {/* Reduced opacity overlay */}

                    </>
                  )}
                </div>

                <div className="w-full sm:w-2/3 p-4">
                  {/* Rest of the component remains the same */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>

                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${selectedCourse?.id === course.id
              ? 'bg-luxury-gold-500 border-luxury-gold-500'
              : 'border-gray-300'}
                    `}>
                      {selectedCourse?.id === course.id && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                      {course.holes} Holes
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                      Par {course.par}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                      {course.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {selectedCourse?.id === course.id && (
                <div className="absolute top-0 left-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-full h-full bg-luxury-gold-500 transform rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursePicker