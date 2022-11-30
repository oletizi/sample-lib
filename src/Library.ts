import {Node} from "./Node";

export interface Library {
  readonly name: string
  readonly root: Node
}

export class ImmutableLibrary implements Library {
  readonly name: string
  readonly root: Node

  constructor(name: string, root: Node) {
    this.name = name
    this.root = root
  }
}

