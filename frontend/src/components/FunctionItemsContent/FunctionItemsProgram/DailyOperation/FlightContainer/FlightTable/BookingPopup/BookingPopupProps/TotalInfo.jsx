import React from 'react';

const TotalInfo = () => {
    return (
        <div>
            <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Total Information</h3>
            <div className="space-y-2 animation-show">
                {['Amount', 'Gross', 'Tax', 'Serv Chrg', 'Total'].map((label) => (
                    <div key={label}>
                        <label className="block text-xs text-gray-600">{label}</label>
                        <input
                            type="number"
                            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalInfo;