import { mouse } from '@nut-tree/nut-js'
import { mouseDragToPoint } from '../mouse/index.js';

const drawRectangle = async (width:number, height:number) => {
  const currentMousePosition = await mouse.getPosition()
  const x1 = currentMousePosition.x + width
  await mouseDragToPoint(x1, currentMousePosition.y);
  const y1 = currentMousePosition.y + height
  await mouseDragToPoint(x1, y1)
  await mouseDragToPoint(currentMousePosition.x, y1)
  await mouseDragToPoint(currentMousePosition.x, currentMousePosition.y)
}

export default drawRectangle