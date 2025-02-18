// PlayerCell.jsx
const PlayerCell = ({ player, isBlockRow, bookingIndex, onClick }) => {
    const getBackgroundColor = () => {
        if (isBlockRow) return 'bg-gray-200';
        if (bookingIndex === null) return '';
        const colors = [
            'bg-blue-50',
            'bg-green-50',
            'bg-yellow-50',
            'bg-pink-50'
        ];
        return colors[bookingIndex % colors.length];
    };

    const displayText = player
        ? player.length > 7
            ? `${player.substring(0, 7)}...`
            : player
        : "-";

    return (
        <td
            className={`border px-4 py-2 text-sm cursor-pointer hover:underline ${getBackgroundColor()}`}
            onClick={!isBlockRow ? onClick : undefined}
            title={player || "-"}
        >
            <div className="truncate whitespace-nowrap max-w-[150px]">
                {displayText}
            </div>
        </td>
    );
};

export default PlayerCell;