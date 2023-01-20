import { mouse, Point } from '@nut-tree/nut-js'
import { mouseCommands, isValidPosition } from './helpers.js'
import { maxHeight, maxWidth } from '../screen/index.js'

const setValidPosition = async (x:number, y:number) => {
  let newX = x; let newY=y;
  if (x<0) newX=0;
  if (y<0) newY=0;
  if (x>maxWidth) newX=maxWidth;
  if (y>maxHeight) newY=maxHeight;

  await mouse.setPosition(new Point(newX, newY))
}

const getMouseMoveResult = async (data: string, x: number, y: number) => {
  if (isValidPosition(x, y)) {
    await mouse.move([new Point(x, y)])
  } else {
    await setValidPosition(x,y);
  }
  return `${data}, done!`
}

const mouseMoveAction = async (data: string) => {
  const arrayOfData = data.split(' ')
  const command = arrayOfData[0]
  const currentMousePosition = await mouse.getPosition()

  switch (command) {
    case mouseCommands.up: {
      const step = Number(arrayOfData[1])
      const newYPosition = currentMousePosition.y - step
      return await getMouseMoveResult(data, currentMousePosition.x, newYPosition)
    }
    case mouseCommands.down: {
      const step = Number(arrayOfData[1])
      const newYPosition = currentMousePosition.y + step

      return await getMouseMoveResult(data, currentMousePosition.x, newYPosition)
    }
    case mouseCommands.left: {
      const step = Number(arrayOfData[1])
      const newXPosition = currentMousePosition.x - step

      return await getMouseMoveResult(data, newXPosition, currentMousePosition.y)
    }
    case mouseCommands.right: {
      const step = Number(arrayOfData[1])
      const newXPosition = currentMousePosition.x + step

      return await getMouseMoveResult(data, newXPosition, currentMousePosition.y)
    }
    case mouseCommands.position: {
      return `${mouseCommands.position} ${currentMousePosition.x},${currentMousePosition.y}`
    }
    default: {
      return 'Unknown command.'
    }
  }
}

export default mouseMoveAction