import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlightTable from './FlightTable/FlightTable';
import {
    getBookingListAPI,
    selectBookingStatus,
    selectBookingError,
    selectGuestInfo,
    selectTeeTimeInfo
} from '~/redux/booking/bookingSlice';
import { processGuestInfo, processSessionData } from '~/utils/flightUtils';

const FlightContainer = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectBookingStatus);
    const error = useSelector(selectBookingError);
    const GuestInfo = useSelector(selectGuestInfo);
    const teeTimeInfo = useSelector(selectTeeTimeInfo);

    useEffect(() => {
        dispatch(getBookingListAPI());
    }, [dispatch]);
    let content;

    if (status === 'failed' || error || !GuestInfo || !teeTimeInfo) {
        content = <div className="text-red-900 text-center font-bold animation-show">
            <p>Không thể tải dữ liệu, vui lòng thử lại sau:</p>
            {error.message && <p>{error.message}</p>} {/* Hiển thị chi tiết lỗi nếu có */}
        </div>;
    } else {
        const processedGuestInfo = processGuestInfo(GuestInfo)
        const processedDataMorning =
            processedGuestInfo.Morning && teeTimeInfo.teeTimeDetails.Morning
                ? processSessionData(processedGuestInfo.Morning, teeTimeInfo.teeTimeDetails.Morning)
                : [];

        const processedDataAfternoon =
            processedGuestInfo.Afternoon && teeTimeInfo.teeTimeDetails.Afternoon
                ? processSessionData(processedGuestInfo.Afternoon, teeTimeInfo.teeTimeDetails.Afternoon)
                : [];
        content = (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animation-show">
                <FlightTable title="Morning" teeTimeInfo={teeTimeInfo.teeTimeDetails?.Morning} guestInfo={processedDataMorning} />
                <FlightTable title="Afternoon" teeTimeInfo={teeTimeInfo.teeTimeDetails?.Afternoon} guestInfo={processedDataAfternoon} />
            </div>
        );
    }

    return (
        <div className=" gap-6 min-w-[1200px] p-4 border border-gray-300 rounded-md backdrop-blur-lg">
            {content}
        </div>
    );
};

export default FlightContainer;
