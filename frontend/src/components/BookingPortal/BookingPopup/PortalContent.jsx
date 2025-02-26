import React, { useState } from 'react'
import { BookingPopupProps } from './BookingPopupProps'

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

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Contact Information Header - Simplified display */}
            <div className="bg-golf-green-50 rounded p-5 border border-golf-green-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-medium text-golf-green-700">
                  Thông tin người đặt
                </h3>
                <span className="bg-golf-green-100 text-golf-green-800 text-xs px-2.5 py-1 rounded">
                  Mã đặt: {methods.watch('BookingInfo.bookingId')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-golf-green-800">{methods.watch('OtherInfo.ContactPerson') || 'Chưa có thông tin'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">{methods.watch('OtherInfo.Email') || 'Chưa có email'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">{methods.watch('OtherInfo.ContactNo') || 'Chưa có số điện thoại'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">{methods.watch('CourseInfo.playDate') || 'Chưa có ngày chơi'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">Tee Time: {methods.watch('CourseInfo.teeTime') || 'Chưa có'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-700">{methods.watch('CourseInfo.courseId') || 'Chưa chọn sân'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="mt-4">
              {/* Tab Navigation - Simplified styling */}
              <div className="border-b">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['Booking Info', 'Guest List', 'Other Info'].map((tab, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTabChange(index)}
                      className={`cursor-pointer py-3 px-3 border-b-2 text-sm
                        ${activeTab === index
                      ? 'border-golf-green-500 text-golf-green-600'
                      : 'border-transparent text-gray-500 hover:text-golf-green-500'
                    }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content - simplified transitions */}
              <div className="mt-6">
                {/* Tab 1: Booking Information */}
                {activeTab === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-6 bg-white rounded p-4 border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin đặt chỗ</h4>
                      <BookingPopupProps.BookingInfo />
                    </div>

                    <div className="md:col-span-6 bg-white rounded p-4 border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin sân</h4>
                      <BookingPopupProps.CourseInfo />
                    </div>
                  </div>
                )}

                {/* Tab 2: Guest List */}
                {activeTab === 1 && (
                  <div className="bg-white rounded p-4 border border-golf-green-100">
                    <h4 className="font-medium text-golf-green-600">Danh sách khách</h4>
                    <div className="max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                      <BookingPopupProps.GuestList />
                    </div>
                  </div>
                )}

                {/* Tab 3: Additional Details */}
                {activeTab === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-4 bg-white rounded p-4 border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin ID</h4>
                      <BookingPopupProps.IDInfo />
                    </div>

                    <div className="md:col-span-8 bg-white rounded p-4 border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin liên hệ chi tiết</h4>
                      <BookingPopupProps.OtherInfo />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

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