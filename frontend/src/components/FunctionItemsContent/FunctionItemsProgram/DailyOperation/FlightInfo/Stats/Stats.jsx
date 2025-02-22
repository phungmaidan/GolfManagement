import React from 'react'

function Stats() {
    console.log('Stats')
  return (
    <div className="bg-gradient-golf p-4 rounded-lg shadow-golf animate-fadeIn text-white flex flex-col">
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <div>
          <p className="text-sm">Slot hiện tại</p>
          <p className="text-2xl font-bold">18/72</p>
        </div>
        <div>
          <p className="text-sm">Đã đăng ký</p>
          <p className="text-2xl font-bold">54</p>
        </div>
        <div>
          <p className="text-sm">Tổng book</p>
          <p className="text-2xl font-bold">126</p>
        </div>
        <div>
          <p className="text-sm">Còn trống</p>
          <p className="text-2xl font-bold">18</p>
        </div>
      </div>
    </div>
  )
}

export default Stats