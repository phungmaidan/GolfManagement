import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDate, getCouseAPI, selectSelectedDate, selectTodayDate } from '~/redux/booking/bookingSlice'

function DateSelector() {
  console.log('DateSelector Render')
  const dispatch = useDispatch()
  const today = useSelector(selectTodayDate)
  const selectedDate = useSelector(selectSelectedDate)

  const handleChangeDate = useCallback((event) => {
    const newSetDate = event.target.value
    dispatch(setSelectedDate(newSetDate))
    if (newSetDate !== selectedDate) {
      dispatch(getCouseAPI(newSetDate))
    }
  }, [dispatch, selectedDate])

  return (
    <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf animate-fadeIn flex flex-col">
      <h3 className="font-semibold text-lg mb-3 text-golf-green-700">Chọn thời gian</h3>
      <input
        type="date"
        className="p-2 border outline-0 border-golf-green-700 rounded-md cursor-default"
        value={selectedDate !== 'null' ? selectedDate : today}
        onChange={handleChangeDate}
        min="2000-01-01"
        max="2100-12-31"
      />
      <input
        type="time"
        className="p-2 border outline-0 border-golf-green-700 rounded-md mt-2"
      />
    </div>
  )
}

export default DateSelector