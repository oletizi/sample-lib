import ffprobe from "ffprobe"
import ffprobeStatic from "ffprobe-static"

test('Basic audio file tests.', async () => {
  const info = await ffprobe('test/data/library/one-level/cabasa.wav', {path: ffprobeStatic.path})
  console.log(info)
  expect(info).toBeDefined()
})