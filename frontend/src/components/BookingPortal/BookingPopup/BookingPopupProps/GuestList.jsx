import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'
import GuestNameInput from './GuestNameInput'

const GuestList = () => {
  const bookingFlight = useSelector(selectSelectedBooking)
  const bookingInfo = bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.details
  const [guestData, setGuestData] = useState(
    bookingInfo ? bookingInfo.map((guest) => ({
      Name: guest?.Name || '',
      MemberNo: guest?.MemberNo || '',
      GuestType: guest?.GuestType || '',
      DailyNo: guest?.BagTag || '',
      Caddy: guest?.CaddyNo || '',
      BuggyNo: guest?.BuggyNo || '',
      LockerNo: guest?.LockerNo || ''
    })) : Array(4).fill({})
  )

  const handleGuestUpdate = (index, guestInfo) => {
    console.log('guestInfo:', guestInfo)
    console.log('index:', index)
    setGuestData(prevData => {
      console.log('prevData:', prevData)
      const newData = [...prevData]
      newData[index] = {
        ...newData[index],
        ...guestInfo
      }
      console.log('newData:', newData)
      return newData
    })
  }

  // Column width configurations
  const columnWidths = {
    Name: 'w-[30%]', // Name column takes 30% of table width
    'Member No': 'w-[10%]',
    'Guest Type': 'w-[10%]',
    'Daily No.': 'w-[8%]',
    'Caddy': 'w-[8%]',
    'Buggy No.': 'w-[8%]',
    'Locker No': 'w-[8%]',
    'Rnd': 'w-[8%]',
    'Select': 'w-[10%]'
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Guest Information</h3>
      <table className="w-full text-sm animation-show table-fixed">
        <thead className="bg-golf-green-50">
          <tr>
            {['Name', 'Member No', 'Guest Type', 'Daily No.', 'Caddy', 'Buggy No.', 'Locker No', 'Rnd', 'Select'].map((header) => (
              <th key={header} className={`p-2 text-left text-xs text-golf-green-700 ${columnWidths[header]}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3].map((index) => (
            <tr key={index} className="hover:bg-golf-green-50">
              <td className={`p-1 ${columnWidths['Name']}`}>
                <GuestNameInput
                  value={guestData[index]?.Name}
                  onChange={handleGuestUpdate}
                  index={index}
                />
              </td>
              {['MemberNo', 'GuestType', 'DailyNo', 'Caddy', 'BuggyNo', 'LockerNo', 'Rnd'].map((field) => (
                <td key={field} className={`p-1 ${columnWidths[field.replace(/([A-Z])/g, ' $1').trim()]}`}>
                  <input
                    type="text"
                    className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                    defaultValue={guestData[index]?.[field] || ''}
                  />
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
  )
}

export default GuestList