import { WebSocketServer } from 'ws'
import { mouse, Point } from '@nut-tree/nut-js'

import { httpServer } from './src/http_server/index.js'

const HTTP_PORT = 8181
const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })

enum mouseCommands {
  up = 'mouse_up',
  down = 'mouse_down',
  left = 'mouse_left',
  right = 'mouse_right',
  position = 'mouse_position',
}

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

wsServer.on('connection', async (ws: any, request: any, client: any) => {
  console.log(`Start ws server the ${WS_PORT} port!`)
  ws.on('message', async (data: any) => {
    const stringData = data.toString()
    console.log(`Message from user: ${stringData}`)
    const arrayOfData = stringData.split(' ')
    const command = arrayOfData[0]
    const currentMousePosition = await mouse.getPosition()
    switch (command) {
      case mouseCommands.up: {
        const yFromData = Number(arrayOfData[1])
        await mouse.move([new Point(currentMousePosition.x, currentMousePosition.y - yFromData)])
        ws.send(`${data}, done!`)
        break
      }
      case mouseCommands.down: {
        const yFromData = Number(arrayOfData[1])
        await mouse.move([new Point(currentMousePosition.x, currentMousePosition.y + yFromData)])
        ws.send(`${data}, done!`)
        break
      }
      case mouseCommands.left: {
        const xFromData = Number(arrayOfData[1])
        await mouse.move([new Point(currentMousePosition.x - xFromData, currentMousePosition.y)])
        ws.send(`${data}, done!`)
        break
      }
      case mouseCommands.right: {
        const xFromData = Number(arrayOfData[1])
        await mouse.move([new Point(currentMousePosition.x + xFromData, currentMousePosition.y)])
        ws.send(`${data}, done!`)
        break
      }
      case mouseCommands.position: {
        ws.send(`${mouseCommands.position} ${currentMousePosition.x},${currentMousePosition.y}`)
        break
      }
      default: {
        ws.send('Unknown command.')
        break
      }
    }
  })
})
