import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import BookingPopup from "./BookingPopup/BookingPopup";

const FlightTable = ({ title, flights, teeTimeInfo }) => {
  // Ghép dữ liệu teeTime từ teeTimeInfo vào từng flight dựa trên flight.id
  const flightsWithTeeTime = flights.map(flight => {
    // Tìm đối tượng teeTime có Flight trùng với flight.id
    const teeTimeData = teeTimeInfo.find(item => item.Flight === flight.id);
    return {
      ...flight,
      // Nếu tìm thấy, gán teeTime; nếu không, gán giá trị 'N/A' hoặc giữ nguyên flight.id
      teeTime: teeTimeData ? teeTimeData.TeeTime : 'N/A'
    };
  });

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Ở đây, bạn có thể truyền luôn giá trị teeTime thay cho flight id
  const handleOpenPopup = (flightTeeTime, playerName, index) => {
    setSelectedFlight(flightTeeTime);
    setSelectedPlayer({ name: playerName, index });
    setIsPopupOpen(true);
  };

  const handleSave = (newName) => {
    console.log(
      `Lưu thông tin mới: ${newName} cho khách ${selectedPlayer.index + 1} của teeTime ${selectedFlight}`
    );
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-golf-green-50 p-4 rounded-lg shadow-md overflow-x-auto animation-show">
      <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
      <table className="min-w-full border">
        <thead className="bg-gray-50 text-golf-green-800">
          <tr>
            <th className="border px-4 py-2">TeeTime</th>
            <th className="border px-4 py-2">Khách 1</th>
            <th className="border px-4 py-2">Khách 2</th>
            <th className="border px-4 py-2">Khách 3</th>
            <th className="border px-4 py-2">Khách 4</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flightsWithTeeTime.map((flight) => {
            // Nếu flight.teeTime là chuỗi ISO, bạn có thể định dạng lại thành giờ bằng Date hoặc thư viện moment
            const displayTeeTime =
              flight.teeTime !== 'N/A'
                ? new Date(flight.teeTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : flight.teeTime;

            return (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-golf-green-800">
                  {displayTeeTime}
                </td>
                {flight.players.map((player, index) => (
                  <td
                    key={index}
                    className="border px-4 py-2 cursor-pointer text-golf-green-600 hover:underline"
                    onClick={() => handleOpenPopup(displayTeeTime, player, index)}
                  >
                    {player}
                  </td>
                ))}
                <td className="border px-4 py-2 text-center ">
                  <DropdownMenu
                    flightId={displayTeeTime}
                    onAction={(action) => console.log(action)}
                  />
                </td>
              </tr>
            );
          })}
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
