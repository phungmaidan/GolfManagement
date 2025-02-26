import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'

const IDInfo = () => {
  const { register } = useFormContext()
  const currentUser = useSelector(selectCurrentUser)
  const bookingFlight = useSelector(selectSelectedBooking)

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">ID Information</h3>
      <div className="space-y-2 animation-show">
        <div>
          <label className="block text-xs text-gray-600">User ID</label>
          <input
            {...register('IDInfo.userId')}
            type="text"
            defaultValue={bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.UserID || currentUser}
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Caddy</label>
          <input
            type="text"
            defaultValue='100'
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Buggy</label>
          <input
            type="text"
            defaultValue='100'
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(IDInfo)