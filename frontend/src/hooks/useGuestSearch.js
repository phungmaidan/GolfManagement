// src/hooks/useGuestSearch.js
import { useState, useEffect } from 'react'
import { useDebounce } from '~/hooks/useDebounce'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const useGuestSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

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

  return { searchTerm, setSearchTerm, suggestions, loading }
}