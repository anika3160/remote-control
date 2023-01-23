import { screen, Region, mouse } from '@nut-tree/nut-js'
import Jimp from 'jimp'

const getScreenshotWithoutFile = async () => {
  const mousePosition = await mouse.getPosition()
  const regionForScreenshot = await screen.grabRegion(new Region(mousePosition.x - 50, mousePosition.y - 50, 100, 100))
  const image = new Jimp({
    data: regionForScreenshot.data,
    width: regionForScreenshot.width,
    height: regionForScreenshot.height,
  })
  const base64PNG = await image.getBase64Async(Jimp.MIME_PNG)

  return base64PNG.substring(22)
}

export default getScreenshotWithoutFile
