import mouseMove, { mouseCommands } from '../mouse/index.js'
import { drawFiguresCommands, drawCircle, drawRectangle } from '../draw/index.js'
import { commandPrintScreen, getScreenshot } from '../screen/index.js'

const app = async (data: Buffer):Promise<string> => {
  const stringData = data.toString('utf-8')
  console.log(`Message from user: ${stringData}`)
  const arrayOfData: any = stringData.split(' ')
  const isMouseCommand = Object.values(mouseCommands).includes(arrayOfData[0])
  if (isMouseCommand) {
    return await mouseMove(stringData)
  }

  switch (arrayOfData[0]) {
    case drawFiguresCommands.square: {
      const width = Number(arrayOfData[1])
      await drawRectangle(width, width)
      return `${data} done!`
    }
    case drawFiguresCommands.rectangle: {
      await drawRectangle(Number(arrayOfData[1]), Number(arrayOfData[2]))
      return `${data} done!`
    }
    case drawFiguresCommands.circle: {
      await drawCircle(Number(arrayOfData[1]))
      return `${data} done!`
    }
    case commandPrintScreen: {
      const screenshot = await getScreenshot()
      return `${data} ${screenshot}`
    }
    default: {
      return 'Unknown command.'
    }
  }
}

export default app
