// src/hooks/useGuestSearch.js
import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '~/hooks/useDebounce'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Cache to store search results across component instances
const searchCache = new Map()

export const useGuestSearch = (initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const hasFetchedRef = useRef(false)

  // Set initial value if provided
  useEffect(() => {
    if (initialValue && initialValue !== searchTerm) {
      setSearchTerm(initialValue)
    }
  }, [initialValue])

  // Check if we already have this name in our completed results
  const isPrefilledData = (term) => {
    // If search term is the same as suggestions[0].FullName or suggestions[0].name
    // then we likely have already selected this guest and don't need to search again
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0]
      const guestName = firstSuggestion.FullName || firstSuggestion.name
      return guestName === term
    }
    return false
  }

  useEffect(() => {
    const searchGuests = async () => {
      // Skip empty searches and searches with less than 2 characters
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        setSuggestions([])
        return
      }

      // Skip search if we already have this guest selected
      if (isPrefilledData(debouncedSearchTerm)) {
        return
      }

      // Check cache first
      if (searchCache.has(debouncedSearchTerm)) {
        setSuggestions(searchCache.get(debouncedSearchTerm))
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

        // Store in cache and update state
        const results = response.data
        searchCache.set(debouncedSearchTerm, results)
        setSuggestions(results)
        hasFetchedRef.current = true
      } catch (error) {
        console.error('Error searching guests:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    // Only perform the search if we don't already have useful data
    if (!hasFetchedRef.current || (debouncedSearchTerm && !isPrefilledData(debouncedSearchTerm))) {
      searchGuests()
    }
  }, [debouncedSearchTerm])

  // Function to manually set suggestions without an API call
  const setInitialSuggestions = (guests) => {
    if (guests && guests.length > 0) {
      setSuggestions(guests)
      hasFetchedRef.current = true

      // Add to cache as well
      const guestName = guests[0]?.FullName || guests[0]?.name || ''
      if (guestName) {
        searchCache.set(guestName, guests)
      }
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    setSuggestions: setInitialSuggestions,
    loading
  }
}