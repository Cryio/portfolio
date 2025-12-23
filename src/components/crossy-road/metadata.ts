export interface TreeData {
  tileIndex: number;
  height: number;
}

export interface VehicleData {
  initialTileIndex: number;
  color: number;
}

export interface LogData {
  initialTileIndex: number;
  length: number; // Number of tiles the log spans
}

export interface ForestRow {
  type: 'forest';
  trees: TreeData[];
}

export interface CarRow {
  type: 'car';
  direction: boolean;
  speed: number;
  vehicles: VehicleData[];
}

export interface TruckRow {
  type: 'truck';
  direction: boolean;
  speed: number;
  vehicles: VehicleData[];
}

export interface RiverRow {
  type: 'river';
  direction: boolean;
  speed: number;
  logs: LogData[];
}

export type RowData = ForestRow | CarRow | TruckRow | RiverRow;

// Generate a procedural infinite map
function generateRandomTrees(): TreeData[] {
  const trees: TreeData[] = [];
  const numTrees = Math.floor(Math.random() * 4) + 1;
  const usedTiles = new Set<number>();
  
  for (let i = 0; i < numTrees; i++) {
    let tileIndex: number;
    do {
      tileIndex = Math.floor(Math.random() * 17) - 8;
    } while (usedTiles.has(tileIndex));
    usedTiles.add(tileIndex);
    
    trees.push({
      tileIndex,
      height: 30 + Math.floor(Math.random() * 30),
    });
  }
  return trees;
}

function generateRandomVehicles(): VehicleData[] {
  const vehicles: VehicleData[] = [];
  const numVehicles = Math.floor(Math.random() * 3) + 1;
  const usedTiles = new Set<number>();
  const colors = [0xa52523, 0x78b14b, 0xbdb638, 0x2563eb, 0xf97316, 0x8b5cf6];
  
  for (let i = 0; i < numVehicles; i++) {
    let tileIndex: number;
    do {
      tileIndex = Math.floor(Math.random() * 17) - 8;
    } while (usedTiles.has(tileIndex) || usedTiles.has(tileIndex + 1) || usedTiles.has(tileIndex - 1));
    usedTiles.add(tileIndex);
    
    vehicles.push({
      initialTileIndex: tileIndex,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return vehicles;
}

function generateRandomLogs(): LogData[] {
  const logs: LogData[] = [];
  const numLogs = Math.floor(Math.random() * 3) + 2; // 2-4 logs
  const usedTiles = new Set<number>();
  
  for (let i = 0; i < numLogs; i++) {
    const length = Math.floor(Math.random() * 2) + 2; // 2-3 tiles long
    let tileIndex: number;
    let attempts = 0;
    
    do {
      tileIndex = Math.floor(Math.random() * 14) - 7;
      attempts++;
      if (attempts > 20) break;
    } while (
      Array.from({ length: length + 2 }).some((_, j) => 
        usedTiles.has(tileIndex + j - 1)
      )
    );
    
    if (attempts <= 20) {
      for (let j = 0; j < length; j++) {
        usedTiles.add(tileIndex + j);
      }
      
      logs.push({
        initialTileIndex: tileIndex,
        length,
      });
    }
  }
  return logs;
}

function generateRow(index: number): RowData {
  const rand = Math.random();
  
  if (rand < 0.25) {
    return {
      type: 'forest',
      trees: generateRandomTrees(),
    };
  } else if (rand < 0.5) {
    return {
      type: 'car',
      direction: Math.random() > 0.5,
      speed: 80 + Math.floor(Math.random() * 100),
      vehicles: generateRandomVehicles(),
    };
  } else if (rand < 0.75) {
    return {
      type: 'truck',
      direction: Math.random() > 0.5,
      speed: 50 + Math.floor(Math.random() * 60),
      vehicles: generateRandomVehicles(),
    };
  } else {
    return {
      type: 'river',
      direction: Math.random() > 0.5,
      speed: 40 + Math.floor(Math.random() * 50),
      logs: generateRandomLogs(),
    };
  }
}

// Pre-generate initial rows
export const rows: RowData[] = [];
for (let i = 0; i < 100; i++) {
  rows.push(generateRow(i));
}

// Function to add more rows as player progresses
export function ensureRowsExist(upToIndex: number) {
  while (rows.length <= upToIndex) {
    rows.push(generateRow(rows.length));
  }
}

// Get log positions for a specific row (used for player riding logs)
export function getLogPositions(rowIndex: number): { x: number; width: number; speed: number; direction: boolean }[] {
  if (rowIndex <= 0 || rowIndex > rows.length) return [];
  const row = rows[rowIndex - 1];
  if (row.type !== 'river') return [];
  
  return row.logs.map(log => ({
    x: log.initialTileIndex * 42, // tileSize
    width: log.length * 42,
    speed: row.speed,
    direction: row.direction,
  }));
}
