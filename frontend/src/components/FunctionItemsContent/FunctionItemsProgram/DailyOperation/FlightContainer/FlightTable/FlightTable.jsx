// FlightTable.jsx
import React, { useState } from "react";
import BookingPopup from "./BookingPopup/BookingPopup";
import FlightTableHeader from "./FlightTableHeader/FlightTableHeader";
import FlightTableRow from "./FlightTableRow/FlightTableRow";

const FlightTable = ({ title, schedule }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePlayerClick = (booking, playerIndex) => {
        setSelectedBooking({
            flight: booking.Flight,
            teeTime: booking.TeeTime,
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

    return (
        <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
            <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>

            <table className="min-w-full border">
                <FlightTableHeader />

                <tbody className="bg-white divide-y divide-gray-200">
                    {schedule.map((item) => (
                        <FlightTableRow
                            key={item.Flight}
                            item={item}
                            onPlayerClick={handlePlayerClick}
                        />
                    ))}
                </tbody>
            </table>

            <BookingPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                playerName={selectedPlayer}
                flightInfo={{
                    flight: selectedBooking?.flight,
                    teeTime: selectedBooking?.teeTime || "",
                }}
                onSave={handleSave}
            />
        </div>
    );
};

export default FlightTable;