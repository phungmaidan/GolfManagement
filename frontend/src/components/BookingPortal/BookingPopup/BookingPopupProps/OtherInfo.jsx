import React from 'react'

const OtherInfo = ({ flightInfo }) => {
  const otherInfo = flightInfo?.bookMap[flightInfo?.bookingIndex] || {}

  const fields = [
    { label: 'Contact Person', type: 'text', value: otherInfo.ContactPerson || '' },
    { label: 'Email', type: 'email', value: otherInfo.Email || '' },
    { label: 'Contact No', type: 'tel', value: otherInfo.ContactNo || '' },
    { label: 'Fax', type: 'text', value: otherInfo.Fax || '' },
    { label: 'Credit Card', type: 'text', value: otherInfo.CreditCardNumber || '' },
    { label: 'Expiry Date', type: 'text', value: otherInfo.CreditCardExpiry || '' },
    { label: 'Sales Person', type: 'text', value: otherInfo.SalesPerson || '' },
    { label: 'Reference Id', type: 'text', value: otherInfo.ReferenceID || '' },
    { label: 'Remark', type: 'textarea', value: otherInfo.Remark || '' }
  ]

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Other Information</h3>
      <div className="space-y-2 animation-show">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="block text-xs text-gray-600">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                rows="3"
                defaultValue={field.value}
              />
            ) : (
              <input
                type={field.type}
                className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                defaultValue={field.value}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherInfo