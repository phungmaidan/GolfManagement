// src/components/BookingPortal/BookingPopup/BookingPopupProps/AutocompleteInput.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGuestSearch } from '~/hooks/useGuestSearch'

const AutocompleteInput = ({
  name,
  defaultValue = '',
  onGuestSelect,
  type = 'text',
  className = ''
}) => {
  const { register, setValue, watch } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const { searchTerm, setSearchTerm, suggestions, loading } = useGuestSearch('autocomplete')
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const currentValue = watch(name) || ''

  // Initialize input with form value
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
      setSearchTerm(defaultValue)
    }
  }, [defaultValue, name, setValue])

  // Keep search term synced with form value
  useEffect(() => {
    if (currentValue !== searchTerm) {
      setSearchTerm(currentValue)
    }
  }, [currentValue])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setValue(name, newValue)
    setSearchTerm(newValue)
    
    if (newValue.length >= 2) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const handleSelect = (guest) => {
    // Update the input field
    setValue(name, guest.FullName)
    setSearchTerm(guest.FullName)

    // Pass complete guest info to parent for other fields
    if (onGuestSelect) {
      const guestInfo = {
        ContactPerson: guest.FullName,
        Email: guest.Email1 || guest.Email2 || '',
        ContactNo: guest.Contact1 || guest.Contact2 || '',
        CreditCardNumber: guest.CreditCardNumber || '',
        CreditCardExpiry: guest.CardExpiry || ''
      }
      onGuestSelect(guestInfo)
    }

    setIsOpen(false)
  }

  return (
    <div className="relative">
      <input
        {...register(name)}
        type={type}
        className={className}
        ref={(e) => {
          inputRef.current = e
          if (e) {
            register(name).ref(e)
          }
        }}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => {
          if (searchTerm.length >= 2) {
            setIsOpen(true)
          }
        }}
      />

      {isOpen && (searchTerm.length >= 2 || loading) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {loading ? (
            <div className="p-2 text-sm text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((guest) => (
              <div
                key={guest.GuestID}
                className="p-2 text-sm hover:bg-golf-green-50 cursor-pointer"
                onClick={() => handleSelect(guest)}
              >
                <div className="font-medium">{guest.FullName}</div>

                <div className="text-xs text-gray-500">
                  <span>ID: {guest.GuestID}</span>
                  <span> · {guest.GuestType}</span>
                  {guest?.Contact1 && <span> · {guest.Contact1}</span>}
                  {guest?.Email1 && <span> · {guest.Email1}</span>}
                </div>
              </div>
            ))
          ) : searchTerm.length >= 2 ? (
            <div className="p-2 text-sm text-gray-500">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default React.memo(AutocompleteInput)
