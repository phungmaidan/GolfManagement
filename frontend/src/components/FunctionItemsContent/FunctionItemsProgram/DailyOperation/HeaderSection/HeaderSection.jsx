import React, { useState } from 'react';

const HeaderSection = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Date Picker */}
      <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf animation-show">
        <h3 className="font-semibold text-lg mb-3 text-golf-green-700">Chọn thời gian</h3>
        <input
          type="date"
          className="w-full p-2 border border-golf-green-400 rounded-md focus:ring-golf-green-500"
          defaultValue={today}
        />
        <input
          type="time"
          className="w-full p-2 border border-golf-green-400 rounded-md mt-2 focus:ring-golf-green-500"
        />
      </div>

      <div className="bg-luxury-gold-50 p-4 rounded-lg shadow-gold animation-show">
        <h3 className="font-semibold text-lg mb-3 text-luxury-gold-700">Chọn sân golf</h3>
        <select
          className="w-full p-2 border border-luxury-gold-400 rounded-md focus:ring-luxury-gold-500"
          value={selectedCourse}
          onChange={handleChange}
        >
          <option value="">Chọn sân</option>
          <option value="LOTUS - DESERT">LOTUS - DESERT</option>
          <option value="DESERT - LOTUS">DESERT - LOTUS</option>
          <option value="LOTUS - PALM">LOTUS - PALM</option>
          <option value="PALM - LOTUS">PALM - LOTUS</option>
          <option value="PALM - DESERT">PALM - DESERT</option>
          <option value="DESERT - PALM">DESERT - PALM</option>
          <option value="WALK IN">WALK IN</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="bg-gradient-golf p-4 rounded-lg shadow-golf animation-show text-white">
        <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default HeaderSection;
