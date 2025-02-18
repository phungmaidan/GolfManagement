import React from 'react'

const ChargeInfo = () => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Charge Information</h3>
      <table className="w-full text-sm animation-show">
        <thead className="bg-golf-green-50">
          <tr>
            {['Qty', 'Item', 'Description', 'Price', 'Amount'].map((header) => (
              <th key={header} className="p-2 text-left text-xs text-golf-green-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-golf-green-50">
            {[1, 2, 3, 4, 5].map((col) => (
              <td key={col} className="p-1">
                <input
                  type="text"
                  className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ChargeInfo