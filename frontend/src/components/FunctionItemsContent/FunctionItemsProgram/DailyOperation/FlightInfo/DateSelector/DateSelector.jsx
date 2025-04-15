import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDate, setSelectedSession, getCouseAPI, selectSelectedDate, selectTodayDate, selectSelectedSession } from '~/redux/booking/bookingSlice'

function DateSelector() {
  const dispatch = useDispatch()
  const today = useSelector(selectTodayDate)
  const selectedDate = useSelector(selectSelectedDate)
  const selectedSession = useSelector(selectSelectedSession)
  const sessions = ['Morning', 'Afternoon']
  const handleChangeDate = useCallback((event) => {
    const newSetDate = event.target.value
    dispatch(setSelectedDate(newSetDate))
    if (newSetDate !== selectedDate) {
      dispatch(getCouseAPI(newSetDate))
    }
  }, [dispatch, selectedDate])

  const handleChangeSession = useCallback((event) => {
    const selectedSessionValue = event.target.value
    if (selectedSessionValue !== selectedSession) {
      dispatch(setSelectedSession(selectedSessionValue))
    }
  }, [dispatch, selectedSession])
  return (
    <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf animate-fadeIn flex flex-col">
      <h3 className="font-semibold text-lg mb-3 text-golf-green-700">Chọn thời gian</h3>
      <input
        type="date"
        className="p-2 border outline-0 text-golf-green-700 border-golf-green-700 rounded-md cursor-default"
        value={selectedDate !== 'null' ? selectedDate : today}
        onChange={handleChangeDate}
        min="2000-01-01"
        max="2100-12-31"
      />
      <select
        className="border outline-0 border-golf-green-700 text-golf-green-700 rounded-md p-2 mt-2"
        value={selectedSession ?? sessions[0]}
        onChange={handleChangeSession}
      >
        {sessions.map(session => (
          <option key={session} value={session}>
            {session}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DateSelector