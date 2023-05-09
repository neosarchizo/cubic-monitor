export const buffer2numArr: (buffer: Buffer) => number[] = (buffer) => {
  const result: number[] = []

  for (let i = 0; i < buffer.length; i += 1) {
    result.push(buffer[i])
  }

  return result
}
