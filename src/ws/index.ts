import { WebSocketServer } from 'ws'
import mouseMove, { mouseCommands } from '../mouse/index.js'
import { drawFiguresCommands, drawCircle, drawRectangle } from '../draw/index.js'
import { commandPrintScreen, getScreenshot } from '../screen/index.js'

const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })

wsServer.on('connection', async (ws: any, request: any, client: any) => {
  console.log(`Start ws server the ${WS_PORT} port!`)

  ws.on('message', async (data: any) => {
    const stringData = data.toString()
    console.log(`Message from user: ${stringData}`)
    const arrayOfData = stringData.split(' ')
    const isMouseCommand = Object.values(mouseCommands).includes(arrayOfData[0])
    if (isMouseCommand) {
      ws.send(await mouseMove(stringData))
    }

    switch (arrayOfData[0]) {
      case drawFiguresCommands.square: {
        const width = Number(arrayOfData[1])
        await drawRectangle(width, width)
        ws.send(`${data} done!`)
        break
      }
      case drawFiguresCommands.rectangle: {
        await drawRectangle(Number(arrayOfData[1]), Number(arrayOfData[2]))
        ws.send(`${data} done!`)
        break
      }
      case drawFiguresCommands.circle: {
        await drawCircle(Number(arrayOfData[1]))
        ws.send(`${data} done!`)
        break
      }
      case commandPrintScreen: {
        const screenshot = await getScreenshot()
        ws.send(`${data} ${screenshot}`)

        break
      }
      default: {
        break
      }
    }
  })

  ws.on('close', () => {
    console.log('Connection closed.')
  })
})
