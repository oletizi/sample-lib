import * as fs from 'fs-extra'
import path from "path"
import {MutableNode, Node, NullNode} from "./Node"
import {ImmutableNodeMeta} from "./NodeMeta"
import {ImmutableSample} from "./Sample"
import ffprobe, {FFProbeStream} from "ffprobe"
import ffprobeStatic from "ffprobe-static"
import {ImmutableMediaStreamMeta, ImmutableSampleMeta, MediaStreamMeta} from "./SampleMeta"
import {ImmutableLibrary, Library} from "./Library"

export class FileLibraryFactory {
  async newLibrary(rootPath: string, name: string): Promise<Library> {
    return new ImmutableLibrary(name, await new FilesystemDataSource().loadNode(rootPath, NullNode.INSTANCE))
  }
}

export interface DataSource {
  loadNode(source: string, parent: Node): Promise<Node>

  copyNode(source: string, dest: string, parent: Node): Promise<Node>
}

class FilesystemDataSource implements DataSource {
  async copyNode(source: string, dest: string, parent: Node): Promise<Node> {
    await fs.copy(source, dest)
    return await this.loadNode(dest, parent)
  }

  async loadNode(sourcePath: string, parent: Node): Promise<Node> {
    const supportedTypes: ReadonlySet<string> = new Set(['.aiff', '.aif', '.wav', '.mp3', '.m4a', '.flac'])
    const rootNode = new MutableNode({
      dataSource: this, path: sourcePath, name: path.basename(sourcePath)
    })
    const nodes: MutableNode[] = [rootNode]
    let currentNode: MutableNode | undefined

    while ((currentNode = nodes.shift()) !== undefined) {
      const files = await fs.promises.readdir(currentNode.path)
      for (let i = 0; i < files.length; i++) {
        // examine each item in the directory
        const filename = files[i]
        const fullpath = path.join(currentNode.path, filename)
        const basename = path.basename(filename)
        const extname = path.extname(basename)
        const stats = await fs.promises.lstat(fullpath)
        if (stats.isDirectory()) {
          // this is a subdirectory
          const child = new MutableNode({
            dataSource: this, path: fullpath, name: basename
          })
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