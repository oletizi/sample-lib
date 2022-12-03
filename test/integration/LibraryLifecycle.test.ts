import {Node, NullNode} from "../../src/Node"
import {MediaStreamMeta, SampleMeta} from "../../src/SampleMeta"
import {FileLibraryFactory} from "../../src/LibraryFactory"
import {Library} from "../../src/Library"
import * as fs from "fs-extra"
import path from "path"

let tmp: string
beforeEach(async () => {
  tmp = await fs.promises.mkdtemp('LibraryLifecycleTest')
})

afterEach(async () => {
  await fs.remove(tmp)
})

async function loadTestLibrary(path: string): Promise<Library> {
  return await new FileLibraryFactory().newLibrary(path, "My Library")
}

async function compareFileContents(aPath: string, bPath: string): Promise<number> {
  return (await fs.promises.readFile(aPath)).compare(await fs.promises.readFile(bPath))
}

test('Copy node integration test', async () => {
  const sourcePath = 'test/data/library/multi-level'
  const destPath = path.join(tmp, 'intermediatePath', 'multi-level')
  const library = await loadTestLibrary(sourcePath)
  const sourceRootNode: Node = library.root
  const copied = await sourceRootNode.copy(destPath, NullNode.INSTANCE)
  expect(copied).toBeDefined()
  expect(copied.path).toBe(destPath)
  expect(copied.path).not.toBe(sourceRootNode.path)
  // ???: Maybe recursively test each file. But, that's really just testing the filesystem library
  // Spot-testing is probably just as good
  expect(await compareFileContents(path.join(sourcePath, 'meta.json'), path.join(destPath, 'meta.json'))).toBe(0)
  expect(await compareFileContents(
    path.join(sourcePath, 'level-2a', 'kick.wav'),
    path.join(destPath, 'level-2a', 'kick.wav')))
})

test('FilesystemDataSource single-level integration test', async () => {
  // test a one-level library
  const library = await loadTestLibrary('test/data/library/one-level')
  const node = library.root
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
    const sampleMeta: SampleMeta = sample.meta
    expect(sampleMeta).toBeDefined()

    const streams = sampleMeta.streams
    expect(streams.length).toBe(1)

    let stream: MediaStreamMeta = streams[0]
    expect(stream.codecType).toBe("audio")
    expect(stream.bitsPerSample).toBe(16)
    expect(stream.channels).toBe(1)
    expect(stream.sampleRate).toBe("44100")
  }
})

test('FilesystemDataSource multi-level integration test', async () => {
  const library = await loadTestLibrary('test/data/library/multi-level')
  const node: Node = library.root
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