import {FRAME_RESP_STX, FRAME_SEND_STX} from './constants'
import {buffer2numArr} from '../buffer'

export default class Packet {
  buffer: Buffer = Buffer.from([])

  constructor(base64?: string) {
    if (base64 !== undefined && base64 !== null) {
      this.buffer = Buffer.from(base64, 'base64')
    }
  }

  from: (array: number[]) => void = (array) => {
    this.buffer = Buffer.from(array)
  }

  isCorrect: () => boolean = () => {
    const {buffer} = this

    if (buffer === undefined || buffer === null) {
      return false
    }

    if (buffer.length < 4) {
      return false
    }

    if (buffer[0] !== FRAME_SEND_STX && buffer[0] !== FRAME_RESP_STX) {
      return false
    }

    if (buffer[1] + 3 !== buffer.length) {
      return false
    }

    const cs = new Uint8Array([buffer[0]])

    for (let i = 1; i < buffer.length - 1; i += 1) {
      cs[0] += buffer[i]
    }

    cs[0] = 256 - cs[0]

    return cs[0] === buffer[buffer.length - 1]
  }

  generate: (cmd: number, data?: number[]) => void = (cmd, data = []) => {
    this.buffer = Buffer.alloc(4 + data.length)

    this.buffer[0] = FRAME_SEND_STX
    this.buffer[1] = data.length + 1
    this.buffer[2] = cmd

    for (let i = 0; i < data.length; i += 1) {
      this.buffer[3 + i] = data[i]
    }

    // eslint-disable-next-line prefer-destructuring
    this.buffer[this.buffer.length - 1] = this.buffer[0]

    for (let i = 1; i < this.buffer.length - 1; i += 1) {
      this.buffer[this.buffer.length - 1] += this.buffer[i]
    }

    this.buffer[this.buffer.length - 1] = 256 - this.buffer[this.buffer.length - 1]
  }

  getCommand: () => number = () => this.buffer[2]

  getBuffer: () => Buffer = () => this.buffer

  getValue: () => Buffer = () => this.buffer.slice(3, this.buffer.length - 1)

  getAsciiValue: () => string = () => String.fromCharCode(...buffer2numArr(this.getValue()))

  getInt16Value: (pos?: number) => number = (pos = 0) => {
    return this.buffer.readInt16BE(pos + 3)
  }

  getUInt8Value: (pos?: number) => number = (pos = 0) => this.buffer.readUInt8(pos + 3)

  getUInt16Value: (pos?: number) => number = (pos = 0) => {
    return this.buffer.readUInt16BE(pos + 3)
  }

  getUInt32Value: (pos?: number) => number = (pos = 0) => {
    return this.buffer.readUInt32BE(pos + 3)
  }
}
