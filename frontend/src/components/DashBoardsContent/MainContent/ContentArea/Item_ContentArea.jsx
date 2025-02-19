import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedItem } from '~/redux/module/moduleSlice'
import { useNavigate } from 'react-router-dom'
import { slugify } from '~/utils/formatter'
import styles from './Item_ContentArea.module.css'

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
    <div className={styles.container}>
      <div className={styles.itemList}>
        <div className="grid grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <button
              key={item.ItemID}
              className={styles.itemButton}
              onClick={() => handleFunctionClick(item)}
            >
              <div className={styles.itemContent}>
                <span className={styles.itemName}>{item.ItemName}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </button>
          ))}
          {/* Thêm các placeholder items */}
          {placeholderItems.map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className={`${styles.itemButton} opacity-0`}
              aria-hidden="true"
            >
              <div className={styles.itemContent}>
                <span className={styles.itemName}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className={styles.paginationContainer}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={styles.navigationButton}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className={styles.dotsContainer}>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={currentPage === index ? styles.dotActive : styles.dot}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
            className={styles.navigationButton}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default Item_ContentArea
