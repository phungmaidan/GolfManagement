import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse, getBookingListAPI, setSelectedDate } from '~/redux/booking/bookingSlice';

const HeaderSection = React.memo(() => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.booking.selectedDate);
  const selectedCourse = useSelector((state) => state.booking.selectedCourse);

  useEffect(() => {
  }, [dispatch, selectedDate]);

  const handleChangeDate = (event) => {
    const newSetDate = event.target.value;
    if (newSetDate !== selectedDate) {
      dispatch(setSelectedDate(newSetDate));
      dispatch(getBookingListAPI({})); // Gọi API khi đổi sân
    }
  };

  const handleChangeCourse = (event) => {
    const newCourseId = event.target.value;

    // Nếu chọn sân khác với sân hiện tại thì mới dispatch và fetch API
    if (newCourseId !== selectedCourse) {
      dispatch(setSelectedCourse(newCourseId));
      dispatch(getBookingListAPI({})); // Gọi API khi đổi sân
    }
  };

  const courses = [
    { id: 'L - D', name: 'LOTUS - DESERT' },
    { id: 'D - L', name: 'DESERT - LOTUS' },
    { id: 'L - P', name: 'LOTUS - PALM' },
    { id: 'P - L', name: 'PALM - LOTUS' },
    { id: 'P - D', name: 'PALM - DESERT' },
    { id: 'D - P', name: 'DESERT - PALM' },
    { id: 'WALK IN', name: 'WALK IN' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf animation-show">
        <h3 className="font-semibold text-lg mb-3 text-golf-green-700">Chọn thời gian</h3>
        <input
          type="date"
          className="w-full p-2 border border-golf-green-400 rounded-md focus:ring-golf-green-500"
          value={selectedDate !== 'null' ? selectedDate : today}
          onChange={handleChangeDate}
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
          onChange={handleChangeCourse}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
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
});

export default HeaderSection;
