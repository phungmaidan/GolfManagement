import React from 'react'

const GuestList = ({ flightInfo }) => {
  const bookingInfo = flightInfo?.bookMap[flightInfo?.bookingIndex]?.details

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

  // Create empty array of 4 items if flightInfo is null/empty
  const guestData = bookingInfo ? bookingInfo.map((guest) => ({
    Name: guest?.Name || '',
    MemberNo: guest?.MemberNo || '',
    GuestType: guest?.GuestType || '',
    DailyNo: guest?.BagTag || '',
    Caddy: guest?.CaddyNo || '',
    BuggyNo: guest?.BuggyNo || '',
    LockerNo: guest?.LockerNo || ''
  })) : Array(4).fill({})

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
          {[1, 2, 3, 4].map((row) => (
            <tr key={row} className="hover:bg-golf-green-50">
              {['Name', 'MemberNo', 'GuestType', 'DailyNo', 'Caddy', 'BuggyNo', 'LockerNo', 'Rnd'].map((field) => (
                <td key={field} className={`p-1 ${columnWidths[field.replace(/([A-Z])/g, ' $1').trim()]}`}>
                  <input
                    type="text"
                    className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                    defaultValue={guestData[row - 1]?.[field] || ''}
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