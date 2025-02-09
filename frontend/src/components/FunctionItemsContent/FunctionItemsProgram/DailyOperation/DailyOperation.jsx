import React from 'react';
import HeaderSection from "./HeaderSection/HeaderSection";
import FlightContainer from './FlightContainer/FlightContainer'
const DailyOperation = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <HeaderSection/>

      {/* Flights Container */}
      <FlightContainer />
    </div>
  );
};

export default DailyOperation;
