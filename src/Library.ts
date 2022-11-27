import {Node} from "./Node";

export class Library {
  private readonly nodes: ReadonlyArray<Node>

  constructor(nodes: ReadonlyArray<Node>) {
    this.nodes = nodes
  }
}

