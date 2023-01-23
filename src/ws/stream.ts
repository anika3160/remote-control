import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws'
import appStream from './transform.js'

const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })
wsServer.on('connection', async (ws) => {
  ws.send('Hi!')
  console.log('Client connected.')
  const duplex = createWebSocketStream(ws, { decodeStrings: false, encoding: 'utf-8', defaultEncoding: 'utf-8' })
  duplex.pipe(appStream).pipe(duplex)
  duplex.on('error', (err) => {
    console.log(err)
  })
  duplex.on('close', () => {
    console.log('the duplex channel has closed')
  })

  ws.on('close', () => {
    console.log('Connection closed.')
    process.exit()
  })
})
