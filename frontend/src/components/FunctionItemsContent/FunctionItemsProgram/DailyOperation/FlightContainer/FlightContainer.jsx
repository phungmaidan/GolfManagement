import React from 'react';
import FlightTable from './FlightTable/FlightTable'
// Dữ liệu Flight cho buổi sáng (6:00 - 12:00 AM)
const morningFlights = [
    {
        id: 1,
        teeTime: '6:30 AM',
        players: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'],
    },
    {
        id: 2,
        teeTime: '7:15 AM',
        players: ['Nguyễn Văn E', 'Trần Thị F', 'Lê Văn G', 'Phạm Thị H'],
    },
    {
        id: 3,
        teeTime: '8:00 AM',
        players: ['Nguyễn Văn Q', 'Trần Thị R', 'Lê Văn S', 'Phạm Thị T'],
    },
    {
        id: 4,
        teeTime: '8:45 AM',
        players: ['Nguyễn Văn U', 'Trần Thị V', 'Lê Văn W', 'Phạm Thị X'],
    },
    {
        id: 5,
        teeTime: '9:30 AM',
        players: ['Nguyễn Văn Y', 'Trần Thị Z', 'Lê Văn AA', 'Phạm Thị BB'],
    },
    {
        id: 6,
        teeTime: '10:15 AM',
        players: ['Nguyễn Văn CC', 'Trần Thị DD', 'Lê Văn EE', 'Phạm Thị FF'],
    },
    {
        id: 7,
        teeTime: '11:00 AM',
        players: ['Nguyễn Văn GG', 'Trần Thị HH', 'Lê Văn II', 'Phạm Thị JJ'],
    },
    {
        id: 8,
        teeTime: '11:45 AM',
        players: ['Nguyễn Văn KK', 'Trần Thị LL', 'Lê Văn MM', 'Phạm Thị NN'],
    },
    {
        id: 9,
        teeTime: '12:30 PM',
        players: ['Nguyễn Văn OO', 'Trần Thị PP', 'Lê Văn QQ', 'Phạm Thị RR'],
    },
    {
        id: 10,
        teeTime: '1:15 PM',
        players: ['Nguyễn Văn SS', 'Trần Thị TT', 'Lê Văn UU', 'Phạm Thị VV'],
    },
];

// Dữ liệu Flight cho buổi trưa (12:00 - 5:00 PM)
const afternoonFlights = [
    {
        id: 1,
        teeTime: '12:15 PM',
        players: ['Nguyễn Văn I', 'Trần Thị J', 'Lê Văn K', 'Phạm Thị L'],
    },
    {
        id: 2,
        teeTime: '1:00 PM',
        players: ['Nguyễn Văn M', 'Trần Thị N', 'Lê Văn O', 'Phạm Thị P'],
    },
    {
        id: 3,
        teeTime: '1:45 PM',
        players: ['Nguyễn Văn Q', 'Trần Thị R', 'Lê Văn S', 'Phạm Thị T'],
    },
    {
        id: 4,
        teeTime: '2:30 PM',
        players: ['Nguyễn Văn U', 'Trần Thị V', 'Lê Văn W', 'Phạm Thị X'],
    },
    {
        id: 5,
        teeTime: '3:15 PM',
        players: ['Nguyễn Văn Y', 'Trần Thị Z', 'Lê Văn AA', 'Phạm Thị BB'],
    },
    {
        id: 6,
        teeTime: '4:00 PM',
        players: ['Nguyễn Văn CC', 'Trần Thị DD', 'Lê Văn EE', 'Phạm Thị FF'],
    },
    {
        id: 7,
        teeTime: '4:45 PM',
        players: ['Nguyễn Văn GG', 'Trần Thị HH', 'Lê Văn II', 'Phạm Thị JJ'],
    },
];


const FlightContainer = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bảng Flight cho buổi sáng */}
      <FlightTable title="Morning" flights={morningFlights} />
      {/* Bảng Flight cho buổi trưa */}
      <FlightTable title="Afternoon" flights={afternoonFlights} />
    </div>
  );
};

export default FlightContainer;
