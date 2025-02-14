import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import BookingPopup from "./BookingPopup/BookingPopup";

const FlightTable = ({ title, guestInfo, teeTimeInfo }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePlayerClick = (booking, playerIndex) => {
        setSelectedBooking({
            flight: booking.flight,
            teeTime: booking.teeTime,
            playerIndex,
        });
        setSelectedPlayer(booking.players[playerIndex]);
        setIsPopupOpen(true);
    };

    const handleSave = (newName) => {
        console.log(`Cập nhật ${newName} cho:
- Flight: ${selectedBooking.flight}
- TeeTime: ${selectedBooking.teeTime}
- Khách ${selectedBooking.playerIndex + 1}`);
        setIsPopupOpen(false);
    };

    const formatTeeTime = (isoString) => {
        const parts = isoString.split("T");
        return parts.length > 1 ? parts[1].slice(0, 8) : isoString;
    };

    // Tạo một bản đồ để ánh xạ TeeTime với thông tin từ guestInfo
    const guestInfoMap = guestInfo.reduce((map, booking) => {
        map[booking.teeTime] = booking;
        return map;
    }, {});

    // Tạo danh sách đầy đủ các Flight và TeeTime từ teeTimeInfo
    const fullData = teeTimeInfo.map(teeTime => {
        const guestBooking = guestInfoMap[teeTime.TeeTime] || {
            flight: teeTime.Flight,
            teeTime: teeTime.TeeTime,
            players: [],
        };
        return {
            ...guestBooking,
            flight: teeTime.Flight,
            teeTime: teeTime.TeeTime,
        };
    });

    return (
        <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
            <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>

            <table className="min-w-full border">
                <thead className="bg-gray-50 text-golf-green-800">
                    <tr>
                        <th className="border px-4 py-2">TeeTime</th>
                        {[...Array(4)].map((_, i) => (
                            <th key={i} className="border px-4 py-2">
                                Khách {i + 1}
                            </th>
                        ))}
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {fullData.map((booking, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 text-golf-green-800">
                                {formatTeeTime(booking.teeTime)}
                            </td>

                            {[...Array(4)].map((_, i) => (
                                <td
                                    key={i}
                                    className={`border px-4 py-2 ${booking.players[i]
                                        ? "cursor-pointer text-golf-green-600 hover:underline"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        booking.players[i] && handlePlayerClick(booking, i)
                                    }
                                >
                                    {booking.players[i] || ""}
                                </td>
                            ))}

                            <td className="border px-4 py-2 text-center">
                                <DropdownMenu onAction={(action) => console.log(action, booking)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BookingPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                playerName={selectedPlayer}
                flightInfo={{
                    flight: selectedBooking?.flight,
                    teeTime: selectedBooking ? formatTeeTime(selectedBooking.teeTime) : "",
                }}
                onSave={handleSave}
            />
        </div>
    );
};

export default FlightTable;