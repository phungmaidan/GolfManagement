import React from 'react';
import HeaderSection from "./HeaderSection/HeaderSection";
import FlightContainer from './FlightContainer/FlightContainer'

const DailyOperation = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <HeaderSection/>
      {/* Flights Container */}
      <FlightContainer />
    </div>
  );
};

export default DailyOperation;
