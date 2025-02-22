import React from 'react'

const IDInfo = ({ flightInfo }) => {
  const fields = [
    { label: 'User ID', value: flightInfo?.bookMap?.[flightInfo?.bookingIndex]?.UserID || '' },
    { label: 'Caddy', value: '90' },
    { label: 'Buggy', value: '100' }
  ]

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">ID Information</h3>
      <div className="space-y-2 animation-show">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <label className="block text-xs text-gray-600">{label}</label>
            <input
              type="text"
              className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
              defaultValue={value}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IDInfo