import { Transform } from 'node:stream'
import app from '../app/index.js';

const appStream = new Transform({
  decodeStrings: false,
  async transform(chunk, encoding, callback) {
    console.log('chunk:', chunk)
    const buff = await app(chunk)
    console.log('buff:', encoding, buff)
    this.push(buff)
    callback()
  },
})

export default appStream;
