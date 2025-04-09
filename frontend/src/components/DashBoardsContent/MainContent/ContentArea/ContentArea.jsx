import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
  getItemAPI,
  selectSelectedFunction,
  selectSelectedModule,
  selectItems
} from '~/redux/module/moduleSlice'
import Item_ContentArea from './Item_ContentArea'

const ContentArea = () => {
  const dispatch = useDispatch()

  // Tối ưu selector bằng shallowEqual
  const currentModule = useSelector(selectSelectedModule, shallowEqual)
  const currentFunction = useSelector(selectSelectedFunction, shallowEqual)
  const items = useSelector(selectItems)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await dispatch(getItemAPI())
      } finally {
        setLoading(false)
      }
    }

    // Gọi API khi module & function hợp lệ, và chưa có items
    if (currentModule?.id && currentFunction?.id && items.length === 0) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [currentModule?.id, currentFunction?.id])

  return (
    <div className="pt-3 pl-3 pr-3 overflow-hidden">
      {loading ? (
        <div className="flex mt-50 justify-center h-full w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 bg-luxury-gold-700 border-golf-green-200"></div>
        </div>
      ) : (
        <div
          key={`${currentModule?.Name}-${currentFunction?.label}`}
          className="bg-white bg-opacity-40 backdrop-blur-md rounded animate-fadeIn shadow-xl border border-golf-green-300 p-4 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-medium text-golf-green-800 mb-4 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
              <span className="text-luxury-gold-500 truncate">
                {currentModule?.Name}
              </span>
              <span className="hidden sm:inline mx-3 text-gray-400">•</span>
              <span className="text-golf-green-700 truncate">
                {currentFunction?.label}
              </span>
            </div>
          </h2>
          <Item_ContentArea items={items} />
        </div>
      )}
    </div>
  )
}

export default ContentArea
