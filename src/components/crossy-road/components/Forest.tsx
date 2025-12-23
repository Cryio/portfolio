import { Grass } from './Grass';
import { Tree } from './Tree';
import { ForestRow } from '../metadata';

interface ForestProps {
  rowIndex: number;
  rowData: ForestRow;
}

export function Forest({ rowIndex, rowData }: ForestProps) {
  return (
    <Grass rowIndex={rowIndex}>
      {rowData.trees.map((tree, index) => (
        <Tree key={index} tileIndex={tree.tileIndex} height={tree.height} />
      ))}
    </Grass>
  );
}
