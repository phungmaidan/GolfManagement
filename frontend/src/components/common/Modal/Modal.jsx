// src/components/common/Modal/Modal.jsx
import React from 'react'
import Portal from '../Portal/Portal'

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = ''
}) => {
  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className={`
          relative bg-white rounded-lg shadow-xl
          max-h-[90vh] max-w-[95vw] overflow-auto
          animate-fadeIn
          ${className}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-golf-green-700">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal