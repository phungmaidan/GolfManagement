import React from 'react';

const BookingInfo = () => {
    return (
        <div>
            <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Basic Info</h3>
            <div className="space-y-2 animation-show">
                <div>
                    <label className="block text-xs text-gray-600">Booking ID</label>
                    <input
                        type="text"
                        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600">Booking Date</label>
                    <input
                        type="date"
                        className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingInfo;