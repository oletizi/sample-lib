import {Node} from "./Node";

export class Library {
  private readonly root: Node
  name: string

  constructor(name: string, root: Node) {
    this.name = name
    this.root = root
  }
}

