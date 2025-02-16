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

} from '~/redux/booking/bookingSlice';

const FlightContainer = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectBookingStatus);
    const error = useSelector(selectBookingError);
    const teeTimeInfo = useSelector(selectTeeTimeInfo);
    const MorningDetail = useSelector(selectMorningDetail);
    const AfternoonDetail = useSelector(selectAfternoonDetail);

    useEffect(() => {
        dispatch(getScheduleAPI());
    }, [dispatch]);
    let content;

    if (status === 'failed' || error || !teeTimeInfo) {
        content = <div className="py-2 text-luxury-gold-100 text-center font-sans ==" style={{ fontSize: '18px' }}>
            <p>Không thể tải dữ liệu, vui lòng thử lại sau:</p>
            {error?.message && <p>{error?.message}</p>} {/* Hiển thị chi tiết lỗi nếu có */}
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
