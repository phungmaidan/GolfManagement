// FlightTableHeader.jsx
const FlightTableHeader = () => (
    <thead className="bg-gray-50 text-golf-green-800">
        <tr>
            <th className="border px-1 py-1 w-20 text-sm">TeeTime</th>
            {[...Array(4)].map((_, i) => (
                <th key={i} className="border px-2 py-1 text-sm">
                    Khách {i + 1}
                </th>
            ))}
            <th className="border px-1 py-1 text-sm"></th>
        </tr>
    </thead>
);

export default FlightTableHeader;