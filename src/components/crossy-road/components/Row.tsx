import { Forest } from './Forest';
import { CarLane } from './CarLane';
import { TruckLane } from './TruckLane';
import { RiverLane } from './RiverLane';
import { RowData } from '../metadata';

interface RowProps {
  rowIndex: number;
  rowData: RowData;
}

export function Row({ rowIndex, rowData }: RowProps) {
  switch (rowData.type) {
    case 'forest':
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    case 'car':
      return <CarLane rowIndex={rowIndex} rowData={rowData} />;
    case 'truck':
      return <TruckLane rowIndex={rowIndex} rowData={rowData} />;
    case 'river':
      return <RiverLane rowIndex={rowIndex} rowData={rowData} />;
  }
}
