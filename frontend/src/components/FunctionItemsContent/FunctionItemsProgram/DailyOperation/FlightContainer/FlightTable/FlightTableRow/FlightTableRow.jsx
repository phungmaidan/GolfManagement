// FlightTableRow.jsx
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import PlayerCell from "./PlayerCell/PlayerCell";
import TeeTimeCell from "./TeeTimeCell/TeeTimeCell";

const processItem = (item) => {
    const blockMap = item.children.blockMap;
    const bookMap = item.children.bookMap;
    const isBlock = blockMap?.length > 0;
    const isBook = bookMap?.length > 0;

    let players = [];
    let isBlockRow = false;

    if (isBlock) {
        isBlockRow = true;
        players = Array(4).fill(blockMap[0].Remark);
    } else if (isBook) {
        const details = bookMap[0].details || [];
        players = Array(4).fill(null);
        details.forEach((detail) => {
            const index = detail.Counter - 1;
            if (index >= 0 && index < 4) {
                players[index] = `${detail?.MemberNo} ${detail.Name}`;
            }
        });
    } else {
        players = Array(4).fill(null);
    }

    return {
        ...item,
        players,
        isBlockRow,
    };
};

const FlightTableRow = ({ item, onPlayerClick }) => {

    const processedItem = processItem(item);

    return (
        <tr className="hover:bg-gray-50">
            <TeeTimeCell teeTime={processedItem.TeeTime} />

            {processedItem.players.map((player, i) => (
                <PlayerCell
                    key={i}
                    player={player}
                    isBlockRow={processedItem.isBlockRow}
                    onClick={() => onPlayerClick(processedItem, i)}
                />
            ))}

            <td className="border px-4 py-2 text-center text-sm">
                <DropdownMenu
                    onAction={(action) => console.log(action, processedItem)}
                />
            </td>
        </tr>
    );
};

export default FlightTableRow;