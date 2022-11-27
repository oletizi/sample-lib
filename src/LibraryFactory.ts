import * as fs from 'fs'
import {Library} from "./Library"
import {Node, NullNode} from "./Node"

export interface DataSource {
  readNode(identifier: string): void
}

export class FilesystemDataSource implements DataSource {
  async readNode(identifier: string): Promise<Node> {
    //const files = await fs.promises.readdir(identifier)
    return new NullNode()
  }
}

export interface LibraryFactory {
  newLibrary(ds: DataSource): Library
}