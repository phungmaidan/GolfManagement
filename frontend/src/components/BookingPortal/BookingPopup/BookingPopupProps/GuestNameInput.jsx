// src/components/BookingPortal/BookingPopup/BookingPopupProps/GuestNameInput.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useDebounce } from '~/hooks/useDebounce'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const GuestNameInput = ({ value, onChange, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Xử lý API search
  useEffect(() => {
    const searchGuests = async () => {
      if (!debouncedSearchTerm) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const response = await authorizedAxiosInstance.get(
          `${API_ROOT}/v1/items/search-guests`,
          {
            params: {
              search: debouncedSearchTerm,
              limit: 5
            }
          }
        )
        setSuggestions(response.data)
      } catch (error) {
        console.error('Error searching guests:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    searchGuests()
  }, [debouncedSearchTerm])

  // Xử lý click outside
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
    setSearchTerm(newValue)
    onChange(index, { Name: newValue })
    setIsOpen(true)
  }

  const handleSelect = (guest) => {
    setSearchTerm(guest.FullName)
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

export default GuestNameInput