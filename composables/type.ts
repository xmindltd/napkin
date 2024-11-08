import type { CSSProperties } from "vue";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export enum EnumPlacement {
  Top = "top",
  TopStart = "top-start",
  TopEnd = "top-end",
  Right = "right",
  RightStart = "right-start",
  RightEnd = "right-end",
  Bottom = "bottom",
  BottomStart = "bottom-start",
  BottomEnd = "bottom-end",
  Left = "left",
  LeftStart = "left-start",
  LeftEnd = "left-end",
}

export interface Point {
  x: number;
  y: number;
}

export interface ElementText {
  point: Point;
  style: CSSProperties;
  value: string;
  class: string;
  placement: Placement;
}
