import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'
import GuestNameInput from './GuestNameInput'

const GuestList = () => {
  const { register } = useFormContext()
  const bookingFlight = useSelector(selectSelectedBooking)
  const bookingInfo = bookingFlight?.bookMap?.[bookingFlight?.bookingIndex || 0]?.details

  const fields = [
    { key: 'GuestID', label: 'Guest ID', width: 'w-[8%]' }, // Remove hidden: true
    { key: 'Name', label: 'Name', width: 'w-[22%]', isNameInput: true },
    { key: 'MemberNo', label: 'Member No', width: 'w-[10%]' },
    { key: 'GuestType', label: 'Guest Type', width: 'w-[10%]' },
    { key: 'DailyNo', label: 'Daily No.', width: 'w-[8%]' },
    { key: 'Caddy', label: 'Caddy', width: 'w-[8%]' },
    { key: 'BuggyNo', label: 'Buggy No.', width: 'w-[8%]' },
    { key: 'LockerNo', label: 'Locker No', width: 'w-[8%]' },
    { key: 'Rnd', label: 'Rnd', width: 'w-[8%]' }
  ]

  const renderField = (field, index) => {
    if (field.isNameInput) {
      return <GuestNameInput index={index} />
    }

    // Use Controller instead of register directly
    return (
      <input
        {...register(`GuestList.${index}.${field.key}`)}
        type="text"
        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
      />
    )
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Guest Information</h3>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="w-full text-sm animation-show table-fixed">
          <thead className="bg-golf-green-50">
            <tr>
              {fields.map((field) => (
                <th key={field.key} className={`p-2 text-left text-xs text-golf-green-700 ${field.width}`}>
                  {field.label}
                </th>
              ))}
              <th className="w-[10%] p-2 text-left text-xs text-golf-green-700">Select</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3].map((index) => (
              <tr key={index} className="hover:bg-golf-green-50">
                {fields.map((field) => (
                  <td key={field.key} className={`p-1 ${field.width}`}>
                    {renderField(field, index)}
                  </td>
                ))}
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-golf-green-500 rounded focus:ring-golf-green-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-white border border-golf-green-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-golf-green-600 font-medium">Guest {index + 1}</span>
              <input
                type="checkbox"
                className="form-checkbox text-golf-green-500 rounded focus:ring-golf-green-500"
              />
            </div>

            {fields.map((field) => (
              <div key={field.key} className="flex flex-col space-y-1">
                <label className="text-xs text-golf-green-600">{field.label}</label>
                {renderField(field, index)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(GuestList)