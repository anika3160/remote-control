import { Transform } from 'node:stream'
import app from '../app/index.js'

const appStream = new Transform({
  async transform(chunk, encoding, callback) {
    // console.log('chunk:', chunk)
    const str = await app(chunk)
    // console.log('chunk:', chunk)
    this.push(str)
    callback()
  },
})

export default appStream
