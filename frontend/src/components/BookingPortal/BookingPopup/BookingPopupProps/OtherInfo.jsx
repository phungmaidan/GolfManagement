import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'
import AutocompleteInput from './AutocompleteInput'

const OtherInfo = () => {
  const bookingFlight = useSelector(selectSelectedBooking)
  const otherInfo = bookingFlight?.bookMap?.[bookingFlight?.bookingIndex] || {}
  const [formData, setFormData] = useState({
    ContactPerson: otherInfo.ContactPerson || '',
    Email: otherInfo.Email || '',
    ContactNo: otherInfo.ContactNo || '',
    Fax: otherInfo.Fax || '',
    CreditCardNumber: otherInfo.CreditCardNumber || '',
    CreditCardExpiry: otherInfo.CreditCardExpiry || '',
    SalesPerson: otherInfo.SalesPerson || '',
    ReferenceID: otherInfo.ReferenceID || '',
    Remark: otherInfo.Remark || ''
  })

  const handleInputChange = (field, value) => {
    console.log('field:', field)
    setFormData(prev => {
      console.log('prev:', prev)
      return {
        ...prev,
        [field]: value
      }})

  }

  const handleGuestSelect = (guestInfo) => {
    setFormData(prev => ({
      ...prev,
      ...guestInfo // Cập nhật tất cả các trường liên quan
    }))
  }

  const fields = [
    { label: 'Contact Person', type: 'text', field: 'ContactPerson', autocomplete: true },
    { label: 'Email', type: 'email', field: 'Email' },
    { label: 'Contact No', type: 'tel', field: 'ContactNo' },
    { label: 'Fax', type: 'text', field: 'Fax' },
    { label: 'Credit Card', type: 'text', field: 'CreditCardNumber' },
    { label: 'Expiry Date', type: 'text', field: 'CreditCardExpiry' },
    { label: 'Sales Person', type: 'text', field: 'SalesPerson' },
    { label: 'Reference Id', type: 'text', field: 'ReferenceID' },
    { label: 'Remark', type: 'textarea', field: 'Remark' }
  ]

  const inputClassName = 'w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400'

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Other Information</h3>
      <div className="space-y-2 animation-show">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="block text-xs text-gray-600">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className={inputClassName}
                rows="3"
                value={formData[field.field]}
                onChange={(e) => handleInputChange(field.field, e.target.value)}
              />
            ) : field.autocomplete ? (
              <AutocompleteInput
                value={formData[field.field]}
                onChange={(value) => handleInputChange(field.field, value)}
                onGuestSelect={handleGuestSelect} // Thêm prop mới
                type={field.type}
                className={inputClassName}
              />
            ) : (
              <input
                type={field.type}
                className={inputClassName}
                value={formData[field.field]}
                onChange={(e) => handleInputChange(field.field, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherInfo