// FlightTableRow.jsx
import React, { useState } from "react";
import BookingPopup from "./BookingPopup/BookingPopup";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import PlayerCell from "./PlayerCell/PlayerCell";
import TeeTimeCell from "./TeeTimeCell/TeeTimeCell";

const processItem = (item) => {
    const blockMap = item.children.blockMap;
    const bookMap = item.children.bookMap;
    const isBlock = blockMap?.length > 0;
    const isBook = bookMap?.length > 0;

    let players = Array(4).fill(null);
    let isBlockRow = false;
    let bookingIndices = Array(4).fill(null);
    let currentIndex = 0;

    if (isBlock) {
        isBlockRow = true;
        players = Array(4).fill(blockMap[0].Remark);
    } else if (isBook) {
        bookMap.forEach((booking, bookingIndex) => {
            const details = booking.details || [];
            details.forEach((detail) => {
                if (currentIndex < 4) {
                    players[currentIndex] = `${detail?.MemberNo} ${detail.Name}`;
                    bookingIndices[currentIndex] = bookingIndex;
                    currentIndex++;
                }
            });
        });
    }

    return {
        ...item,
        players,
        isBlockRow,
        bookingIndices,
    };
};

const FlightTableRow = ({ item }) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePlayerClick = (booking, bookingIndex) => {
        setSelectedBooking({
            flight: booking.Flight,
            TeeBox: booking.TeeBox,
            teeTime: booking.TeeTime,
            bookMap: booking.children.bookMap,
            bookingIndex: bookingIndex,
        });
        setIsPopupOpen(true);
    };
    const processedItem = processItem(item);

    return (
        <>
            <tr className={`hover:bg-gray-50 ${isPopupOpen ? 'outline outline-2 outline-blue-500' : ''}`}>
                <TeeTimeCell teeTime={processedItem.TeeTime} />
                {processedItem.players.map((player, i) => (
                    <PlayerCell
                        key={i}
                        player={player}
                        isBlockRow={processedItem.isBlockRow}
                        bookingIndex={processedItem.bookingIndices[i]}
                        onClick={() => handlePlayerClick(processedItem, processedItem.bookingIndices[i])}
                    />
                ))}
                <td className="border px-4 py-2 text-center text-sm">
                    <DropdownMenu
                        onAction={(action) => console.log(action, processedItem)}
                    />
                </td>
            </tr>
            <BookingPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                flightInfo={{
                    flight: selectedBooking?.flight,
                    TeeBox: selectedBooking?.TeeBox,
                    bookMap: selectedBooking?.bookMap || "",
                    teeTime: selectedBooking?.teeTime || "",
                    bookingIndex: selectedBooking?.bookingIndex || "0",
                }}
            />
        </>
    );
};

export default FlightTableRow;