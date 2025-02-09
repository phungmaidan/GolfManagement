import React, { useState } from 'react';
import { DateTime } from 'luxon';

const DailyOperation = () => {
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [selectedCourse, setSelectedCourse] = useState('');

  // Danh sách các sân golf mẫu
  const golfCourses = [
    "Lotus - Palm",
    "Desert - Lotus",
    "Palm - Desert",
    "Walk In"
  ];

  // Tạo danh sách các flight từ 6h đến 12h (25 flight)
  const flights = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 6;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-screen-lg mx-auto py-4">
        {/* Header Card */}
        <div className="mb-4 shadow rounded border">
          <div className="bg-primary text-white p-4 text-xl font-bold">
            Golf Booking
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-4">
              {/* Golf Course Selection */}
              <div className="w-full max-w-[300px]">
                <label className="block text-sm font-medium mb-1">Chọn sân golf</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">-- Chọn sân golf --</option>
                  {golfCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="w-full max-w-[300px]">
                <label className="block text-sm font-medium mb-1">Chọn ngày</label>
                <input
                  type="date"
                  value={selectedDate.toISODate()}
                  onChange={(e) => setSelectedDate(DateTime.fromISO(e.target.value))}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Table */}
        <div className="shadow-lg rounded border">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-primary-light text-white font-bold px-4 py-2 sticky top-0">
                    Flight Time
                  </th>
                  <th className="bg-primary-light text-white font-bold px-4 py-2 sticky top-0">
                    Golfer 1
                  </th>
                  <th className="bg-primary-light text-white font-bold px-4 py-2 sticky top-0">
                    Golfer 2
                  </th>
                  <th className="bg-primary-light text-white font-bold px-4 py-2 sticky top-0">
                    Golfer 3
                  </th>
                  <th className="bg-primary-light text-white font-bold px-4 py-2 sticky top-0">
                    Golfer 4
                  </th>
                </tr>
              </thead>
            </table>
            <div className="h-[400px] overflow-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight} className="hover:bg-gray-100">
                      <td className="border px-4 py-2 font-medium">{flight}</td>
                      {[1, 2, 3, 4].map((golfer) => (
                        <td key={golfer} className="border px-4 py-2">
                          <input
                            type="text"
                            placeholder="Tên golfer"
                            className="w-full border border-gray-300 rounded p-1 text-sm"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOperation;
