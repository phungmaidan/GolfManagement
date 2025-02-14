// src/utils/flightUtils.js
import { pickInfoUser, splitByField } from '~/utils/pickInfoUser';

export const processGuestInfo = (guestInfo) => {
    const splitGuestInfoBySession = guestInfo.map(guest =>
        pickInfoUser(guest, {
            fields: ["BookingID", "BookingDate", "CourseID", "TeeTime", "Session", "TeeBox"],
            nested: {
                details: ["Counter", "GuestType", "MemberNo", "Name"]
            }
        })
    );

    return splitByField(splitGuestInfoBySession, "Session", {
        fields: ["BookingID", "BookingDate", "CourseID", "TeeTime", "TeeBox", "RecordStatus", "details"],
        nested: {
            details: ["Counter", "GuestType", "MemberNo", "Name"]
        }
    });
};

export const processSessionData = (sessionData, teeTimeDetails) => {
    return sessionData.map(booking => {
        const matchedTeeTime = teeTimeDetails.find(
            t => t.TeeTime === booking.TeeTime
        );
        return {
            flight: matchedTeeTime?.Flight || "N/A",
            teeTime: booking.TeeTime,
            players: booking.details.slice(0, 4).map(d => d.Name),
            rawTeeTime: booking.TeeTime // Giữ nguyên định dạng gốc để match chính xác
        };
    });
};