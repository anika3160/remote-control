import { mouse } from '@nut-tree/nut-js'
 import { mouseDragToPoint } from '../mouse/index.js';

 const drawSquare = async (data: string) => {
   const arrayOfData = data.split(' ')
   const step = Number(arrayOfData[1])
   const currentMousePosition = await mouse.getPosition()
   const x1 = currentMousePosition.x + step
   await mouseDragToPoint(x1, currentMousePosition.y);
   const y1 = currentMousePosition.y + step
   await mouseDragToPoint(x1, y1)
   await mouseDragToPoint(currentMousePosition.x, y1)
   await mouseDragToPoint(currentMousePosition.x, currentMousePosition.y)
 }

 export default drawSquare
