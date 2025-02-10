import React from 'react';

const OtherInfo = () => {
    const fields = [
        { label: 'Contact Person', type: 'text' },
        { label: 'Email', type: 'email' },
        { label: 'Contact No', type: 'tel' },
        { label: 'Fax', type: 'text' },
        { label: 'Credit Card', type: 'text' },
        { label: 'Expiry Date', type: 'date' },
        { label: 'Sales Person', type: 'text' },
        { label: 'Reference Id', type: 'text' },
        { label: 'Remark', type: 'textarea' }
    ];

    return (
        <div>
            <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Other Information</h3>
            <div className="space-y-2 animation-show">
                {fields.map((field) => (
                    <div key={field.label}>
                        <label className="block text-xs text-gray-600">{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea
                                className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                                rows="3"
                            />
                        ) : (
                            <input
                                type={field.type}
                                className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OtherInfo;