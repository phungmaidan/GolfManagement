import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import BookingPopup from "./BookingPopup/BookingPopup";

const FlightTable = ({ title, flights, teeTimeInfo, guestInfo }) => {
    console.log(teeTimeInfo)
    console.log(guestInfo)
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = (flightId, playerName, index) => {
        setSelectedFlight(flightId);
        setSelectedPlayer({ name: playerName, index });
        setIsPopupOpen(true);
    };

    const handleSave = (newName) => {
        console.log(`Lưu thông tin mới: ${newName} cho khách ${selectedPlayer.index + 1} của flight ${selectedFlight}`);
        setIsPopupOpen(false);
    };

    return (
        <div className="bg-golf-green-50 p-4 rounded-lg shadow-md overflow-x-auto animation-show">
            <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
            <table className="min-w-full border">
                <thead className="bg-gray-50 text-golf-green-800">
                    <tr>
                        <th className="border px-4 py-2">Flight</th>
                        <th className="border px-4 py-2">Khách 1</th>
                        <th className="border px-4 py-2">Khách 2</th>
                        <th className="border px-4 py-2">Khách 3</th>
                        <th className="border px-4 py-2">Khách 4</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {flights.map((flight) => (
                        <tr key={flight.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 text-golf-green-800">Flight #{flight.id}</td>
                            {flight.players.map((player, index) => (
                                <td
                                    key={index}
                                    className="border px-4 py-2 cursor-pointer text-golf-green-600 hover:underline"
                                    onClick={() => handleOpenPopup(flight.id, player, index)}
                                >
                                    {player}
                                </td>
                            ))}
                            <td className="border px-4 py-2 text-center ">
                                <DropdownMenu flightId={flight.id} onAction={(action) => console.log(action)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup được render ngoài DOM của bảng */}
            <BookingPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                playerName={selectedPlayer?.name}
                onSave={handleSave}
            />
        </div>
    );
};

export default FlightTable;
