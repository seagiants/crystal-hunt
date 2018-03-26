import { CellTypeName } from "./Cell";

export interface Cell {
  type: CellTypeName;
  monster: boolean;
  treasure: boolean;
  avatar: number;
  isCrystallized: boolean;
}
