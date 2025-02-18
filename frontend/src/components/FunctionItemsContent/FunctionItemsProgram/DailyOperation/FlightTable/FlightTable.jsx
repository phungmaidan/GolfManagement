// FlightTable.jsx
import React from "react";
import FlightTableHeader from "./FlightTableHeader/FlightTableHeader";
import FlightTableRow from "./FlightTableRow/FlightTableRow";

const FlightTable = ({ title, schedule }) => {
    return (
        <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
            <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
            <table className="min-w-full border">
                <FlightTableHeader />
                <tbody className="bg-white divide-y divide-gray-200">
                    {schedule.map((item) => (
                        <FlightTableRow
                            key={`${item.Flight}-${item.TeeTime}-${item.TeeBox}`}
                            item={item}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightTable;