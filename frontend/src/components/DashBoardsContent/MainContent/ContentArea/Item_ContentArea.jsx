import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedItem } from '~/redux/module/moduleSlice'
import { useNavigate } from 'react-router-dom'
import { slugify } from '~/utils/formatter'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Add icons

function Item_ContentArea({ items }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5 // Số item trên mỗi trang

  // Tính toán số trang
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Lấy items cho trang hiện tại
  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Tạo mảng placeholder items nếu số lượng item ít hơn itemsPerPage
  const placeholderCount = Math.max(0, itemsPerPage - currentItems.length)
  const placeholderItems = Array(placeholderCount).fill(null)

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))
  }

  const handleFunctionClick = (item) => {
    if (!item) return // Đảm bảo item hợp lệ
    dispatch(setSelectedItem(item))
    const pathName = slugify(item.ItemName)
    navigate(`/dashboards/${pathName}`)
  }

  // Kiểm tra nếu items không phải là mảng hoặc rỗng
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-gray-500">Không có dữ liệu hiển thị.</p>
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <button
            key={item.ItemID}
            onClick={() => handleFunctionClick(item)}
            className="group bg-white/50 hover:bg-luxury-gold-50
              border border-golf-green-200 hover:border-luxury-gold-300
              rounded-lg p-4 transition-all duration-300
              shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-golf-green-800 group-hover:text-luxury-gold-700
                font-medium text-sm sm:text-base transition-colors text-left">
                {item.ItemName}
              </span>
              <span className="text-golf-green-400 group-hover:text-luxury-gold-500
                group-hover:translate-x-1 transition-all flex-shrink-0">
                →
              </span>
            </div>
          </button>
        ))}
        {placeholderItems.map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="invisible border border-transparent rounded-lg p-4"
            aria-hidden="true"
          >
            <div className="flex items-center justify-between">
              <span className="text-transparent">Placeholder</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-all
              ${currentPage === 0
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-golf-green-600 hover:bg-golf-green-50'
        }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center space-x-2">
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`w-2 h-2 rounded-full transition-all
                  ${currentPage === index
                ? 'bg-luxury-gold-500 w-4'
                : 'bg-golf-green-200 hover:bg-golf-green-300'
              }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
            className={`p-2 rounded-full transition-all
              ${currentPage === pageCount - 1
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-golf-green-600 hover:bg-golf-green-50'
        }`}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Item_ContentArea
