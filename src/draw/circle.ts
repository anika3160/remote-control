import { mouse, Point } from '@nut-tree/nut-js'

let x: number = 0, y: number = 0
const pi360: number = Math.PI / 360
const resolution: number = 0.5

const getArrayOfCirclePoints = (xCenter: number, yCenter: number, radius: number) => {
  let path:Point[] = []
  for (let i = 1080; i >= 360; i--) {
    const angle = i * pi360
    x = xCenter + (radius * Math.sin(angle)) + resolution
    y = yCenter + (radius * Math.cos(angle)) + resolution
    path.push(new Point(x, y))
  }
  return path
}

const drawCircle = async (r: number) => {
  const currentMousePosition = await mouse.getPosition()
  const circlePath = getArrayOfCirclePoints(currentMousePosition.x, currentMousePosition.y + r, r)
  await mouse.drag(circlePath)
}

export default drawCircle