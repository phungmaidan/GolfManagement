import React, { useState } from 'react';

const DropdownMenu = ({ flightId, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAction = (action) => {
        onAction(action, flightId);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors"
                onClick={toggleDropdown}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleAction('edit')}
                        >
                            Chỉnh sửa Flight
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleAction('delete')}
                        >
                            Xóa Flight
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleAction('print')}
                        >
                            In thông tin
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
