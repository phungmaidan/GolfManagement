import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlightTable from './FlightTable/FlightTable';
import {
    getScheduleAPI,
    selectBookingStatus,
    selectBookingError,
    selectMorningDetail,
    selectAfternoonDetail,
    selectTeeTimeInfo,
    selectSelectedDate,
    selectSelectedCourse,
} from '~/redux/booking/bookingSlice';

const FlightContainer = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectBookingStatus);
    const error = useSelector(selectBookingError);
    const teeTimeInfo = useSelector(selectTeeTimeInfo);
    const MorningDetail = useSelector(selectMorningDetail);
    const AfternoonDetail = useSelector(selectAfternoonDetail);
    const selectedDate = useSelector(selectSelectedDate);
    const selectedCourse = useSelector(selectSelectedCourse);

    useEffect(() => {
        // Chỉ gọi API khi đã có đủ selectedDate và selectedCourse
        if (selectedDate && selectedCourse) {
            dispatch(getScheduleAPI({ selectedDate, selectedCourse }));
        }
    }, [dispatch, selectedDate, selectedCourse]);

    let content;

    if (!selectedDate || !selectedCourse) {
        content = <div className="py-2 text-luxury-gold-100 text-center font-sans">
            <p>Đang tải thông tin sân...</p>
        </div>;
    } else if (status === 'failed' || error || !teeTimeInfo) {
        content = <div className="py-2 text-luxury-gold-100 text-center font-sans" style={{ fontSize: '18px' }}>
            <p>Không thể tải dữ liệu, vui lòng thử lại sau:</p>
            {error?.message && <p>{error?.message}</p>}
        </div>;
    } else {
        content = (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
                <FlightTable title="Morning" schedule={MorningDetail} />
                <FlightTable title="Afternoon" schedule={AfternoonDetail} />
            </div>
        );
    }

    return (
        <div className="rounded-md">
            {content}
        </div>
    );
};

export default FlightContainer;
