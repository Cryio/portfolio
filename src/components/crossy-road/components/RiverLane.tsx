import { Water } from './Water';
import { Log } from './Log';
import { RiverRow } from '../metadata';

interface RiverLaneProps {
  rowIndex: number;
  rowData: RiverRow;
}

export function RiverLane({ rowIndex, rowData }: RiverLaneProps) {
  return (
    <Water rowIndex={rowIndex}>
      {rowData.logs.map((log, index) => (
        <Log
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={log.initialTileIndex}
          length={log.length}
          direction={rowData.direction}
          speed={rowData.speed}
          logIndex={index}
        />
      ))}
    </Water>
  );
}
