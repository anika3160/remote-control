import { WebSocketServer } from 'ws'
import fs from 'node:fs/promises'

import { httpServer } from './src/http_server/index.js'
import mouseMove, { mouseCommands } from './src/mouse/index.js'
import { drawFiguresCommands, drawCircle, drawRectangle } from './src/draw/index.js'
import { commandPrintScreen, getScreenshot } from './src/screen/index.js'

const HTTP_PORT = 8181
const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

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
        const screenshotPath = await getScreenshot()
        const image = await fs.readFile(screenshotPath, { encoding: 'base64' })
        ws.send(`${data} ${image}`)
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
