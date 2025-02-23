import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItemAPI, selectSelectedFunction, selectSelectedModule, selectItems } from '~/redux/module/moduleSlice'
import Item_ContentArea from './Item_ContentArea'

const ContentArea = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const currentModule = useSelector(selectSelectedModule)
  const currentFunction = useSelector(selectSelectedFunction)
  const [loading, setLoading] = useState(true)
  const [display, setDisplay] = useState({ module: currentModule, func: currentFunction })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await dispatch(getItemAPI())
      } finally {
        setDisplay({ module: currentModule, func: currentFunction })
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, currentModule, currentFunction])

  return (
    <div className="pt-3 pl-3 pr-3 overflow-hidden">
      {loading ? (
        <div className="flex mt-50 justify-center h-full w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 bg-luxury-gold-700 border-golf-green-200"></div>
        </div>
      ) : (
        <div
          key={`${display.module?.ModuleName}-${display.func?.label}`}
          className="bg-white bg-opacity-40 backdrop-blur-md rounded animate-fadeIn shadow-xl border border-golf-green-300 p-4 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-medium text-golf-green-800 mb-4 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
              <span className="text-luxury-gold-500 truncate">
                {display.module?.ModuleName}
              </span>
              <span className="hidden sm:inline mx-3 text-gray-400">•</span>
              <span className="text-golf-green-700 truncate">
                {display.func?.label}
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
