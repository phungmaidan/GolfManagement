import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'
import AutocompleteInput from './AutocompleteInput'

const OtherInfo = () => {
  const { register, setValue, watch } = useFormContext()
  const bookingFlight = useSelector(selectSelectedBooking)
  const otherInfo = bookingFlight?.bookMap?.[bookingFlight?.bookingIndex] || {}

  const handleGuestSelect = (guestInfo) => {
    // Update form values from selected guest
    Object.entries(guestInfo).forEach(([key, value]) => {
      setValue(`OtherInfo.${key}`, value)
    })
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
                {...register(`OtherInfo.${field.field}`)}
                className={inputClassName}
                rows="3"
                defaultValue={otherInfo[field.field] || ''}
              />
            ) : field.autocomplete ? (
              <AutocompleteInput
                name={`OtherInfo.${field.field}`}
                defaultValue={otherInfo[field.field] || ''}
                onGuestSelect={handleGuestSelect}
                type={field.type}
                className={inputClassName}
              />
            ) : (
              <input
                {...register(`OtherInfo.${field.field}`)}
                type={field.type}
                className={inputClassName}
                defaultValue={otherInfo[field.field] || ''}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(OtherInfo)