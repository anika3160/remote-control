import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws'
import appStream from './transform.js'

const WS_PORT = 8080
const wsServer = new WebSocketServer({ port: WS_PORT })
wsServer.on('connection', async (ws) => {
  ws.send('Hi!')
  console.log('Client connected.')
  const duplex = createWebSocketStream(ws, { decodeStrings: false })

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback)
      })
      return
    }

    ws.send(chunk.toString(), callback)
  }

  duplex.on('error', (err) => {
    console.log(err)
  })
  duplex.on('close', () => {
    console.log('the duplex channel has closed')
  })

  duplex.pipe(appStream).pipe(duplex)
  ws.on('close', () => {
    console.log('Connection closed.')
    process.exit()
  })
})
