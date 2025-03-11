import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

const DatePicker = ({ onSelect, initialDate = null, minDate = null }) => {
  const today = DateTime.now().startOf('day')
  const [currentMonth, setCurrentMonth] = useState(initialDate ? DateTime.fromJSDate(initialDate) : today)
  const [selectedDate, setSelectedDate] = useState(initialDate ? DateTime.fromJSDate(initialDate) : today)
  const [animationDirection, setAnimationDirection] = useState(null)

  // Set minimum date to today if not provided
  const effectiveMinDate = minDate ? DateTime.fromJSDate(minDate).startOf('day') : today

  const handlePreviousMonth = () => {
    setAnimationDirection('left')
    setCurrentMonth(prevMonth => prevMonth.minus({ months: 1 }))
  }

  const handleNextMonth = () => {
    setAnimationDirection('right')
    setCurrentMonth(prevMonth => prevMonth.plus({ months: 1 }))
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    onSelect(date.toJSDate())
  }

  const handleMonthYearSelect = (event) => {
    const [year, month] = event.target.value.split('-').map(Number)
    setCurrentMonth(DateTime.local(year, month, 1))
  }

  // Generate months for dropdown
  const getMonthYearOptions = () => {
    const options = []
    const startDate = effectiveMinDate
    const endDate = effectiveMinDate.plus({ months: 11 })

    let current = startDate.startOf('month')
    while (current <= endDate) {
      options.push({
        value: `${current.year}-${current.month}`,
        label: current.toFormat('MMMM yyyy')
      })
      current = current.plus({ months: 1 })
    }
    return options
  }

  // Generate days for the current month's view
  const monthStart = currentMonth.startOf('month')
  const monthEnd = currentMonth.endOf('month')

  // Generate all days in the month
  const daysInMonth = Array.from(
    { length: monthEnd.day },
    (_, i) => monthStart.set({ day: i + 1 })
  )

  // Get day names for header
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Get calendar days including padding days from prev/next months - always 6 rows (42 days)
  const getCalendarDays = () => {
    const firstDayOfMonth = monthStart.weekday % 7 // 0-based where 0 is Sunday

    // Calculate how many days we need from the previous month
    const previousMonthDays = Array.from(
      { length: firstDayOfMonth },
      (_, i) => monthStart.minus({ days: firstDayOfMonth - i })
    )

    // Calculate how many days we need from the next month to complete 6 rows (42 cells total)
    const totalCells = 6 * 7 // 6 rows, 7 days per row
    const remainingCells = totalCells - (previousMonthDays.length + daysInMonth.length)

    const nextMonthDays = Array.from(
      { length: remainingCells },
      (_, i) => monthEnd.plus({ days: i + 1 })
    )

    return [...previousMonthDays, ...daysInMonth, ...nextMonthDays]
  }

  const calendarDays = getCalendarDays()

  return (
    <div className="w-full max-w-md mx-auto mt-6 mb-8 bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
      <div className="bg-[linear-gradient(135deg,var(--luxury-gold-500)_0%,var(--luxury-gold-600)_100%)] text-white p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-golf-green-700  rounded-full cursor-pointer transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-center">
            {currentMonth.toFormat('MMMM yyyy')}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-golf-green-700 rounded-full cursor-pointer transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Fixed height calendar grid - always 6 rows */}
        <div className="grid grid-cols-7 grid-rows-6 gap-1 h-[240px]">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = day.month === currentMonth.month
            const isSelected = day.hasSame(selectedDate, 'day')
            const isCurrentDay = day.hasSame(today, 'day')
            const isPastDate = day < today

            return (
              <button
                key={index}
                onClick={() => !isPastDate && isCurrentMonth && handleDateSelect(day)}
                disabled={isPastDate || !isCurrentMonth}
                className={`
                  flex items-center justify-center rounded-full text-sm font-medium transition-all
                  ${isSelected ? 'bg-luxury-gold-500 text-white hover:bg-luxury-gold-600' : ''}
                  ${isCurrentDay && !isSelected ? 'ring-2 ring-luxury-gold-300' : ''}
                  ${isPastDate ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                  ${!isPastDate && isCurrentMonth && !isSelected ? 'hover:bg-gray-100' : ''}
                  ${!isCurrentMonth ? 'text-gray-300' : ''}
                `}
              >
                {day.toFormat('d')}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DatePicker