import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const BookingPopup = ({ isOpen, onClose, playerName, onSave }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative p-6 bg-white rounded-lg shadow-lg w-150">
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer text-gray-600 top-2 right-2 hover:text-red-500"
                >
                    ✕
                </button>
                <h2 className="mb-4 text-lg font-semibold">Cập nhật khách</h2>
                <div className="p-8 flex justify-center">
                    <div className="grid grid-cols-7 grid-rows-7 gap-2 aspect-square p-1">
                        {/* Block 1 - (0,0) */}
                        <div className="bg-blue-500 rounded-lg row-start-1 row-end-2 col-start-1 col-end-2 p-2">
                        </div>

                        {/* Block 2 - (0,1) (0,2) (0,3) (0,4) */}
                        <div className="bg-green-500 rounded-lg row-start-1 row-end-2 col-start-2 col-end-6"></div>

                        {/* Block 3 - (0,5) (0,6) */}
                        <div className="bg-yellow-500 rounded-lg row-start-1 row-end-2 col-start-6 col-end-8"></div>

                        {/* Block 4 - (1,0)-(2,4) */}
                        <div className="bg-red-500 rounded-lg row-start-2 row-end-4 col-start-1 col-end-6"></div>

                        {/* Block 5 - (3,0)-(4,2) */}
                        <div className="bg-purple-500 rounded-lg row-start-4 row-end-6 col-start-1 col-end-4"></div>

                        {/* Block 6 - (3,3)-(4,4) */}
                        <div className="bg-pink-500 rounded-lg row-start-4 row-end-6 col-start-4 col-end-6"></div>

                        {/* Block 7 - (1,5)-(4,6) */}
                        <div className="bg-indigo-500 rounded-lg row-start-2 row-end-6 col-start-6 col-end-8"></div>

                        {/* Block 8 - Các ô còn lại */}
                        <div className="bg-gray-500 rounded-lg row-start-6 row-end-8 col-start-1 col-end-8"></div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
                    <button onClick={() => onSave(playerName)} className="px-4 py-2 text-white rounded bg-golf-green-500">Lưu</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BookingPopup;
