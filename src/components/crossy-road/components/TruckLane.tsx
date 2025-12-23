import { Road } from './Road';
import { Truck } from './Truck';
import { TruckRow } from '../metadata';

interface TruckLaneProps {
  rowIndex: number;
  rowData: TruckRow;
}

export function TruckLane({ rowIndex, rowData }: TruckLaneProps) {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Truck
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        />
      ))}
    </Road>
  );
}
