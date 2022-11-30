import * as fs from 'fs'
import path from "path"
import {MutableNode, Node} from "./Node"
import {ImmutableNodeMeta} from "./NodeMeta"
import {ImmutableSample} from "./Sample"
import ffprobe, {FFProbeStream} from "ffprobe"
import ffprobeStatic from "ffprobe-static"
import {ImmutableMediaStreamMeta, ImmutableSampleMeta, MediaStreamMeta} from "./SampleMeta"

export interface DataSource {
  readNode(identifier: string): void
}

export class FilesystemDataSource implements DataSource {
  async readNode(identifier: string): Promise<Node> {
    const supportedTypes: ReadonlySet<string> = new Set(['.aiff', '.aif', '.wav', '.mp3', '.m4a', '.flac'])
    const rootNode = new MutableNode(identifier)
    const nodes: MutableNode[] = [rootNode]
    let currentNode: MutableNode | undefined

    while ((currentNode = nodes.shift()) !== undefined) {
      const files = await fs.promises.readdir(currentNode.name)
      for (let i = 0; i < files.length; i++) {
        // examine each item in the directory
        const filename = files[i]
        const fullpath = path.join(currentNode.name, filename)
        const basename = path.basename(filename)
        const extname = path.extname(basename)
        const stats = await fs.promises.lstat(fullpath)
        if (stats.isDirectory()) {
          // this is a subdirectory
          const child = new MutableNode(fullpath)
          child.parent = currentNode
          currentNode.children.add(child)
          nodes.push(child)
        } else if (basename === 'meta.json') {
          // this is a metadata file
          const m = JSON.parse((await fs.promises.readFile(fullpath)).toString())

          currentNode.meta = new ImmutableNodeMeta(new Set(m.keywords))
        } else if (supportedTypes.has(extname)) {
          // this is a supported audio file
          const keywords = new Set<string>()
          const streams = new Array<MediaStreamMeta>()
          const info = await ffprobe(fullpath, {path: ffprobeStatic.path})
          for (let i = 0; i < info.streams.length; i++) {
            const ffstream: FFProbeStream = info.streams[i]
            const stream = new ImmutableMediaStreamMeta(ffstream)
            streams.push(stream)
          }
          const sampleMeta = new ImmutableSampleMeta(keywords, streams)
          currentNode.samples.add(new ImmutableSample(fullpath, basename, sampleMeta))
        }
      }
    }
    return rootNode
  }
}