import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
function Title() {
  return (
    <div className="flex items-center gap-6 animation-show">
      <Link
        to="/dashboards"
        className="no-underline"
      >
        <button
          className="
                    flex items-center justify-center cursor-pointer
                    bg-[linear-gradient(135deg,var(--luxury-gold-500)_0%,var(--luxury-gold-600)_100%)]
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
                  Booking Golf
        </h4>
      </div>
    </div>
  )
}

export default Title
