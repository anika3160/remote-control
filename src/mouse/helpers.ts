import { mouse, Point, straightTo } from '@nut-tree/nut-js'
import { maxHeight, maxWidth } from '../screen/index.js';

export enum mouseCommands {
  up = 'mouse_up',
  down = 'mouse_down',
  left = 'mouse_left',
  right = 'mouse_right',
  position = 'mouse_position',
}

export const mouseDragToPoint = async (x:number, y:number) => {
  await mouse.drag(straightTo(new Point(x, y)))
}

export const isValidPosition = (x: number, y: number): boolean => {
  return x >= 0 && x <= maxWidth && y >= 0 && y <= maxHeight
}