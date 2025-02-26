// src/components/BookingPortal/BookingPopup/BookingPopupProps/GuestNameInput.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGuestSearch } from '~/hooks/useGuestSearch'

const GuestNameInput = ({ index }) => {
  const { setValue, watch } = useFormContext()
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Get the current name value from the form
  const currentName = watch(`GuestList.${index}.Name`) || ''

  // Get all relevant data from form to check if we have prefilled data
  const memberNo = watch(`GuestList.${index}.MemberNo`) || ''
  const guestType = watch(`GuestList.${index}.GuestType`) || ''
  const hasPrefilledData = currentName && (memberNo || guestType)

  // Use our custom hook for guest search with initial value
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    setSuggestions,
    loading
  } = useGuestSearch(currentName)

  // Setup initial prefilled data if available
  useEffect(() => {
    if (hasPrefilledData && currentName) {
      // Create a synthetic guest object from our prefilled data
      const prefilledGuest = {
        FullName: currentName,
        CardNumber: memberNo,
        GuestType: guestType,
        GuestID: watch(`GuestList.${index}.GuestID`) || '', // Add this line
        BagTag: watch(`GuestList.${index}.DailyNo`) || '',
        CaddyNo: watch(`GuestList.${index}.Caddy`) || '',
        BuggyNo: watch(`GuestList.${index}.BuggyNo`) || '',
        LockerNo: watch(`GuestList.${index}.LockerNo`) || ''
      }

      // Set it as initial suggestion to prevent API call
      setSuggestions([prefilledGuest])
    }
  }, [hasPrefilledData])

  // Sync form value with search term
  useEffect(() => {
    if (currentName !== searchTerm) {
      setSearchTerm(currentName)
    }
  }, [currentName])

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value
    setValue(`GuestList.${index}.Name`, newValue)
    setSearchTerm(newValue)

    // Show dropdown if we have at least 2 characters
    if (newValue.length >= 2) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  // Handle selection of a guest
  const handleSelectGuest = (guest) => {
    // Update form values
    setValue(`GuestList.${index}.Name`, guest.FullName || guest.name)
    setValue(`GuestList.${index}.MemberNo`, guest.CardNumber || guest.id || '')
    setValue(`GuestList.${index}.GuestType`, guest.GuestType || guest.type || '')
    setValue(`GuestList.${index}.DailyNo`, guest.BagTag || guest.dailyNo || '')
    setValue(`GuestList.${index}.Caddy`, guest.CaddyNo || guest.caddy || '')
    setValue(`GuestList.${index}.BuggyNo`, guest.BuggyNo || guest.buggyNo || '')
    setValue(`GuestList.${index}.LockerNo`, guest.LockerNo || guest.lockerNo || '')

    // Explicitly convert GuestID to string to avoid type errors
    const guestId = guest.GuestID || guest.id || ''
    setValue(`GuestList.${index}.GuestID`, String(guestId))

    // Close dropdown
    setShowDropdown(false)
    setHighlightedIndex(-1)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (!showDropdown) return

    // Arrow down
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    }

    // Arrow up
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0))
    }

    // Enter
    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      handleSelectGuest(suggestions[highlightedIndex])
    }

    // Escape
    if (event.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  // Show dropdown on focus if we have search term
  const handleFocus = () => {
    if (currentName.length >= 2) {
      setShowDropdown(true)
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        ref={inputRef}
        value={currentName}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
        placeholder="Type name to search"
        autoComplete="off"
      />

      {showDropdown && (suggestions.length > 0 || loading) && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {loading ? (
            <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((guest, idx) => (
                <li
                  key={guest.GuestID || guest.id || idx}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    highlightedIndex === idx ? 'bg-golf-green-100' : 'hover:bg-golf-green-50'
                  }`}
                  onClick={() => handleSelectGuest(guest)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                >
                  <div className="font-medium">{guest.FullName || guest.name}</div>
                  <div className="text-xs text-gray-500">
                    {guest.GuestID && <span>ID: {guest.GuestID}</span>}
                    {guest.GuestType && <span> · {guest.GuestType}</span>}
                    {guest.Contact1 && <span> · {guest.Contact1}</span>}
                    {guest.CardNumber && <span> · Card: {guest.CardNumber}</span>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default React.memo(GuestNameInput)