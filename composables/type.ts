import type { CSSProperties } from 'vue'

export type Placement =
| 'center'
| 'top'
| 'top-start'
| 'top-end'
| 'right'
| 'right-start'
| 'right-end'
| 'bottom'
| 'bottom-start'
| 'bottom-end'
| 'left'
| 'left-start'
| 'left-end';

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
