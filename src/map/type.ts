import { CellTypeName } from "./Cell";
import { Caracs, Skill } from "../action/type";
import { AvatarTypeName } from "./Avatar";

export interface Cell {
  type: CellTypeName;
  monster: boolean;
  trap: boolean;
  avatar: string | null;
  isCrystallized: boolean;
}

export interface Avatar {
  id: string;
  type: AvatarTypeName;
  position: string;
  caracs: Caracs;
  skills: Array<Skill>;
}

type RowPathMatrix = Array<number>;
export type PathMatrix = Array<RowPathMatrix>;