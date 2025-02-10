import React from 'react';

const GuestList = () => {
    return (
        <div>
            <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Guest Information</h3>
            <table className="w-full text-sm animation-show">
                <thead className="bg-golf-green-50">
                    <tr>
                        {['Name', 'Member No', 'Guest Type', 'Daily No', 'Caddy', 'Buggy No', 'Locker No', 'Rnd', 'Select'].map((header) => (
                            <th key={header} className="p-2 text-left text-xs text-golf-green-700">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4].map((row) => (
                        <tr key={row} className="hover:bg-golf-green-50">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                                <td key={col} className="p-1">
                                    <input
                                        type="text"
                                        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                                    />
                                </td>
                            ))}
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-golf-green-500 rounded focus:ring-golf-green-500"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuestList;