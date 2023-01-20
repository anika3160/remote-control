import { screen, Region, mouse } from '@nut-tree/nut-js'

const getScreenshot = async () => {
  const mousePosition = await mouse.getPosition()
  const screenshot = await screen.captureRegion(
    'screenshot.png',
    new Region(mousePosition.x - 50, mousePosition.y - 50, 100, 100),
  )
  return screenshot
}

export default getScreenshot
