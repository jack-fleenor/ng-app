export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Attributes = {
  position: Position;
  size: Size;
  color: string;
};

export type PlayerAttributes = Attributes & {
  speed: number;
};