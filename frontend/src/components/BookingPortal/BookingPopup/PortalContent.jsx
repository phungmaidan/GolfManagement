import React, { useState } from 'react'
import { Button } from '~/components/ui/button'
// import { BookingPopupProps } from './BookingPopupProps'

// PortalContent component extracted to a separate file
const PortalContent = React.memo(({ onClose, onSubmit, methods }) => {
  // Add local state to track active tab
  const [activeTab, setActiveTab] = useState(0)

  // Tab change handler that updates both form value and local state
  const handleTabChange = (index) => {
    setActiveTab(index)
  }

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30">
      <div className="relative p-6 bg-white shadow-golf w-[95vw] h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="fixed cursor-pointer text-golf-green-300 top-16 right-14 hover:text-golf-green-600 bg-gray-50 hover:bg-gray-200 rounded-lg p-2"
        >
          ✕
        </button>
        <h2 className="mb-4 text-lg font-semibold text-golf-green-700">
          Booking Information
        </h2>
        <Button>CLick me</Button>
        <form onSubmit={methods.handleSubmit(onSubmit)}>


          {/* Floating action buttons - simplified */}
          <div className="fixed bottom-6 right-10 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-gray-300 rounded text-gray-700"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white rounded bg-golf-green-600 hover:bg-golf-green-700"
            >
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

export default PortalContent