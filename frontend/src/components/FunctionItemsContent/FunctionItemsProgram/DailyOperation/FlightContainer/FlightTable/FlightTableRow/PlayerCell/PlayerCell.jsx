// PlayerCell.jsx
const PlayerCell = ({ player, isBlockRow, onClick }) => {
    const displayText = player
        ? player.length > 7
            ? `${player.substring(0, 7)}...`
            : player
        : "-";

    return (
        <td
            className={`border px-4 py-2 text-sm ${!isBlockRow
                    ? "cursor-pointer text-golf-green-600 hover:underline"
                    : ""
                }`}
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