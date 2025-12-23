// Store for tracking log positions in real-time
export const logPositions = new Map<string, {
  x: number;
  width: number;
  speed: number;
  direction: boolean;
  rowIndex: number;
}>();

export function clearLogPositions() {
  logPositions.clear();
}

// Get all logs for a specific row
export function getLogsForRow(rowIndex: number): Array<{ x: number; speed: number; direction: boolean }> {
  const logs: Array<{ x: number; speed: number; direction: boolean }> = [];
  logPositions.forEach((log, key) => {
    if (log.rowIndex === rowIndex) {
      logs.push({ x: log.x, speed: log.speed, direction: log.direction });
    }
  });
  return logs;
}
