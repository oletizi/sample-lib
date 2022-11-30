import {FilesystemDataSource} from "../../src/LibraryFactory"
import {Node} from "../../src/Node"

test('FilesystemDataSource single-level integration test', async () =>{
  // test a one-level library
  const root = 'test/data/library/one-level'
  const ds = new FilesystemDataSource()

  const node : Node = await ds.readNode(root)

  // check the node
  expect(node).toBeDefined()
  expect(node.isNull).toBeFalsy()

  // check the metadata
  const meta = node.meta
  expect(meta).toBeDefined()
  const keywords = meta.keywords
  expect(keywords).toBeDefined()
  expect(keywords.size).toBe(2)
  expect(keywords.has('keyword1')).toBeTruthy()
  expect(keywords.has('keyword2')).toBeTruthy()

  //check the samples
  const samples = node.samples
  expect(samples).toBeDefined()
  expect(samples.size).toBe(2)
  for (const sample of samples) {
    expect(sample.meta).toBeDefined()
  }
})

test ('FilesystemDataSource multi-level integration test', async () =>{
  const root = 'test/data/library/multi-level'
  const ds = new FilesystemDataSource()

  const node : Node = await ds.readNode(root)

  expect(node).toBeDefined()
  expect(node.children).toBeDefined()

  const children = node.children
  expect(children).toBeDefined()
  expect(children.size).toBe(2)
  for (const child of children) {
    const samples = child.samples
    if (child.name.includes('level-2a')) {
      expect(samples.size).toBe(2)
    } else {
      expect(samples.size).toBe(0)
    }
  }
})

// {
//   streams: [
//     {
//       index: 0,
//       codec_name: 'pcm_s16le',
//       codec_long_name: 'PCM signed 16-bit little-endian',
//       codec_type: 'audio',
//       codec_tag_string: '[1][0][0][0]',
//       codec_tag: '0x0001',
//       sample_fmt: 's16',
//       sample_rate: '44100',
//       channels: 1,
//       bits_per_sample: 16,
//       r_frame_rate: '0/0',
//       avg_frame_rate: '0/0',
//       time_base: '1/44100',
//       duration_ts: 3557,
//       duration: '0.080658',
//       bit_rate: '705600',
//       disposition: [Object]
//     }
//   ]
// }