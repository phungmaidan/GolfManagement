import React from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedItem } from '~/redux/module/moduleSlice'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const FunctionItemsTitle = () => {
  const selectedItem = useSelector(selectSelectedItem)

  return (
    <div className="flex ml-10 items-center gap-6 animation-show">
      <Link
        to="/dashboards"
        className="no-underline"
      >
        <button
          className="
                    flex items-center justify-center cursor-pointer
                    bg-luxury-gold-400
                    text-white font-medium
                    px-6 py-2.5 rounded-lg
                    transform hover:scale-105 hover:shadow-lg hover:shadow-luxury-gold-300
                    transition-all duration-200 ease-in-out
                "
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
                Back
        </button>
      </Link>

      <div className="flex items-start">
        <h4 className="text-3xl font-semibold text-golf-green-50 m-0">
          {selectedItem?.ItemName || 'No Item Selected'}
        </h4>
      </div>
    </div>
  )
}

export default FunctionItemsTitle