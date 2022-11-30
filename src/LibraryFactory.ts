import * as fs from 'fs'
import path from "path"
import {MutableNode, Node} from "./Node"
import {ImmutableMeta, NullMeta} from "./NodeMeta"
import {ImmutableSample} from "./Sample"

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

          currentNode.meta = new ImmutableMeta(new Set(m.keywords))
        } else if (supportedTypes.has(extname)) {
          // this is a supported audio file
          currentNode.samples.add(new ImmutableSample(fullpath, basename, NullMeta.INSTANCE))
        }
      }
    }
    return rootNode
  }
}