import { Road } from './Road';
import { Car } from './Car';
import { CarRow } from '../metadata';

interface CarLaneProps {
  rowIndex: number;
  rowData: CarRow;
}

export function CarLane({ rowIndex, rowData }: CarLaneProps) {
  return (
    <Road rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car
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
