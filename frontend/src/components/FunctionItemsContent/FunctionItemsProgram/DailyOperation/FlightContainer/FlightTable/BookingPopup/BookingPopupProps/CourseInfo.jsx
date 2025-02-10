import React from 'react';

const CourseInfo = () => {
    const fields = [
        { label: 'Course ID', type: 'text' },
        { label: 'Tee Box', type: 'text' },
        { label: 'Tee Time', type: 'time' },
        { label: 'Play Date', type: 'date' },
        { label: 'Group', type: 'text' },
        { label: 'Hole', type: 'number' }
    ];

    return (
        <div>
            <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Course Information</h3>
            <div className="grid grid-cols-3 gap-2 animation-show">
                {fields.map((field) => (
                    <div key={field.label}>
                        <label className="block text-xs text-gray-600">{field.label}</label>
                        <input
                            type={field.type}
                            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseInfo;