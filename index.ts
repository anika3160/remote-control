import { WebSocketServer } from 'ws'

import { httpServer } from './src/http_server/index.js'
import mouseMove, { mouseCommands } from './src/mouse/index.js'
import { drawFiguresCommands } from './src/draw/index.js'
import drawSquare from './src/draw/square.js';


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
    const isDrawFigureCommand = Object.values(drawFiguresCommands).includes(arrayOfData[0])
    if (isMouseCommand) {
      ws.send(await mouseMove(stringData))
    } else if (isDrawFigureCommand) {
      await drawSquare(stringData);
      ws.send(`${data} done!`)
    }
  })
})