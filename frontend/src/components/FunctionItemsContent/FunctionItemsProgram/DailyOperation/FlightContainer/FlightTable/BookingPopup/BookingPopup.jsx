import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import BookingInfo from "./BookingPopupProps/BookingInfo";
import CourseInfo from "./BookingPopupProps/CourseInfo";
import IDInfo from "./BookingPopupProps/IDInfo";
import GuestList from "./BookingPopupProps/GuestList";
import ChargeInfo from "./BookingPopupProps/ChargeInfo";
import TotalInfo from "./BookingPopupProps/TotalInfo";
import OtherInfo from "./BookingPopupProps/OtherInfo";

const BookingPopup = ({ isOpen, onClose, playerName, onSave }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative p-6 bg-white  shadow-golf w-[95vw] h-[90vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="fixed cursor-pointer text-golf-green-300 top-16 right-14 hover:text-golf-green-600 shadow-golf bg-gray-50 hover:bg-gray-200 rounded-lg p-2 transition-colors"
                >✕</button>
                <h2 className="mb-4 text-lg font-semibold text-golf-green-700">Booking Information</h2>
                <div className="p-4">
                    <div className="grid grid-cols-7 grid-rows-7 gap-4 h-full">
                        {/* Block 1 - Booking Info */}
                        <div className="row-start-1 row-end-2 col-start-1 col-end-2 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <BookingInfo />
                        </div>
                        {/* Block 2 - Course Info */}
                        <div className="row-start-1 row-end-2 col-start-2 col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <CourseInfo />
                        </div>
                        {/* Block 3 - ID Info */}
                        <div className="row-start-1 row-end-2 col-start-6 col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <IDInfo />
                        </div>
                        {/* Block 4 - Guest List */}
                        <div className="row-start-2 row-end-4 col-start-1 col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors overflow-auto">
                            <GuestList />
                        </div>
                        {/* Block 5 - Charge Info */}
                        <div className="row-start-4 row-end-6 col-start-1 col-end-4 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <ChargeInfo />
                        </div>
                        {/* Block 6 - Total Info */}
                        <div className="row-start-4 row-end-6 col-start-4 col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <TotalInfo />
                        </div>
                        {/* Block 7 - Other Info */}
                        <div className="row-start-2 row-end-6 col-start-6 col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
                            <OtherInfo />
                        </div>
                        {/* Block 8 - Action Buttons */}
                        <div className="row-start-6 row-end-8 col-start-1 col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf">
                            {/* Để trống cho các nút chức năng sau này */}
                        </div>
                    </div>
                </div>
                <div className=" fixed bottom-14 left-8/9 transform -translate-x-1/2 flex gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors">
                        Hủy
                    </button>
                    <button
                        onClick={() => onSave(playerName)}
                        className="px-4 py-2 text-white rounded bg-golf-green-500 hover:bg-golf-green-600 transition-colors shadow-golf">
                        Lưu
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BookingPopup;