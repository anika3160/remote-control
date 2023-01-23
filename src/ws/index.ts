import { WebSocketServer } from 'ws'
import app from '../app/index.js'

const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })

wsServer.on('connection', async (ws: any, request: any, client: any) => {
  console.log(`Start ws server the ${WS_PORT} port!`)

  ws.on('message', async (data: any) => {
    ws.send(await app(data))
  })

  ws.on('close', () => {
    console.log('Connection closed.')
  })
})
