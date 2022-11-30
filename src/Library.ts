import {Node} from "./Node";

export interface Library {
  readonly name: string
  readonly root: Node
  copy(destPath: string): Promise<Library>
}

export class ImmutableLibrary implements Library {
  readonly name: string
  readonly root: Node

  constructor(name: string, root: Node) {
    this.name = name
    this.root = root
  }

  async copy(destPath: string): Promise<Library> {
    return new ImmutableLibrary(this.name, await this.root.copy(destPath))
  }
}

