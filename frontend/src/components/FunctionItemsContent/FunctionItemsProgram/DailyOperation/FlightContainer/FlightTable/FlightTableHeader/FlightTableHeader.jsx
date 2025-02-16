// FlightTableHeader.jsx
const FlightTableHeader = () => (
    <thead className="bg-gray-50 text-golf-green-800">
        <tr>
            <th className="border px-4 py-2 w-24">TeeTime</th>
            {[...Array(4)].map((_, i) => (
                <th key={i} className="border px-4 py-2">
                    Khách {i + 1}
                </th>
            ))}
            <th className="border px-4 py-2"></th>
        </tr>
    </thead>
);

export default FlightTableHeader;