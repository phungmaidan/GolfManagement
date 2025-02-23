// src/components/BookingPortal/BookingPopup/BookingPopupProps/GuestNameInput.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useGuestSearch } from '~/hooks/useGuestSearch'

const GuestNameInput = ({ value, onChange, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { searchTerm, setSearchTerm, suggestions, loading } = useGuestSearch()
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Handle click outside to close dropdown
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

  // Thêm useEffect để đồng bộ searchTerm với value từ props
  useEffect(() => {
    setSearchTerm(value || '')
  }, [value])

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    // Khi người dùng gõ, cập nhật lại Name
    onChange(index, {
      Name: e.target.value
    })
    setIsOpen(true)
  }

  const handleSelect = (guest) => {
    setSearchTerm(guest.FullName) // Cập nhật searchTerm
    onChange(index, {
      Name: guest.FullName,
      GuestType: guest.GuestType,
      MemberNo: guest.CardNumber
    })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
        value={searchTerm} // Giữ nguyên searchTerm vì đã được đồng bộ với value
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
                  {guest?.Contact1 && <span> - {guest.Contact1}</span>}</div>
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

export default GuestNameInput