// src/components/BookingPortal/BookingPopup/BookingPopupProps/AutocompleteInput.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useGuestSearch } from '~/hooks/useGuestSearch'

const AutocompleteInput = ({
  value,
  onChange,
  onGuestSelect, // Thêm prop để xử lý thông tin guest
  type = 'text',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { searchTerm, setSearchTerm, suggestions, loading } = useGuestSearch('autocomplete')
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

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

  useEffect(() => {
    setSearchTerm(value || '')
  }, [value])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    onChange(newValue)
    setIsOpen(true)
  }

  const handleSelect = (guest) => {
    setSearchTerm(guest.FullName)
    onChange(guest.FullName)

    // Xử lý thông tin guest để cập nhật các trường khác
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
        ref={inputRef}
        type={type}
        className={className}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && (searchTerm || loading) && (
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
                  <span> - {guest.GuestType}</span>
                  {guest?.Contact1 && <span> - {guest.Contact1}</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default AutocompleteInput