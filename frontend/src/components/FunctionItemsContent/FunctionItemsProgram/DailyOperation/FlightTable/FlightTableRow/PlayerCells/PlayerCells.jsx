// PlayerCells.jsx
import { useEffect, useState, useMemo } from 'react'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { openBookingPopup } from '~/redux/bookingFlight/bookingFlightSlice'
import { useDispatch } from 'react-redux'
const BOOKINGS_API_URL = `${API_ROOT}/api/v1/bookings`

const PlayerCells = ({ item }) => {
  const dispatch = useDispatch()
  const [bookingDetails, setBookingDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const bookings = item.bookings
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookings || bookings.length === 0) {
        setBookingDetails([])
        return
      }

      setLoading(true)
      try {
        // Fetch details for each booking
        const results = await Promise.all(
          bookings.map(async (booking) => {
            if (!booking.bookingID) return null

            try {
              const response = await authorizedAxiosInstance.get(
                `${BOOKINGS_API_URL}?id=${booking.bookingID}`
              )
              return response.data?.bookingDetails || null
            } catch (err) {
              console.error(`Error fetching details for booking ${booking.bookingID}:`, err)
              return null
            }
          })
        )

        // Process results more efficiently
        const detailsArray = results.flatMap(result => {
          if (!result) return []
          if (Array.isArray(result)) {
            return result.filter(Boolean)
          }
          return [result]
        })

        // Ensure we have exactly 4 slots (for 4 players)
        const paddedArray = [...detailsArray]
        while (paddedArray.length < 4) {
          paddedArray.push(null)
        }

        setBookingDetails(paddedArray.slice(0, 4))
      } catch (error) {
        console.error('Error fetching booking details:', error)
        setBookingDetails([])
      } finally {
        setLoading(false)
      }
    }
    fetchBookingDetails()
  }, [bookings])

  const handleCellClick = (booking) => {
    if (!booking) {
      // Khi nhấp vào ô trống, hiển thị thông tin của cả hàng (item)
      console.log('Row info when empty cell clicked:', item)

    } else {
      console.log('Booking details:', booking)
      dispatch(
        openBookingPopup({
          flight: item.Flight,
          teeTime: item.TeeTime,
          teeBox: item.TeeBox,
          bookingId: booking.bookingId,
          bookingData: item.bookings
        })
      )
    }
  }

  // Handling edge case
  if (!bookings) return <td className="border px-4 py-2 text-sm">-</td>

  // Memoize player cells to avoid unnecessary re-renders
  const playerCells = useMemo(() => {
    return Array(4).fill(null).map((_, i) => {
      const booking = bookingDetails[i]
      const hasBooking = Boolean(booking)
      return (
        <td
          key={i}
          className={'border px-4 py-2 text-sm cursor-pointer hover:underline'}
          onClick={() => handleCellClick(booking)}
        >
          {hasBooking ? (
            <div className="truncate whitespace-nowrap max-w-[150px]">
              {booking.name}
            </div>
          ) : (
            '-'
          )}
        </td>
      )
    })
  }, [bookingDetails])

  return <>{playerCells}</>
}

export default PlayerCells