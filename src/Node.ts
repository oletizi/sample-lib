import path from "path"
import {NodeMeta, NullMeta} from "./NodeMeta"
import {Sample} from "./Sample"

export interface Node {
  readonly name: string
  readonly path: string
  readonly meta: NodeMeta
  readonly samples: ReadonlySet<Sample>
  readonly parent: Node
  readonly children: ReadonlySet<Node>
  readonly isNull: boolean

  copy(path: string): Promise<Node>
}

export class NullNode implements Node {
  static INSTANCE: Node = new NullNode()
  readonly name: string = ""
  readonly path: string = ""
  readonly children: Set<Node> = new Set([])
  readonly meta: NodeMeta = NullMeta.INSTANCE
  readonly parent: Node = this
  readonly samples: Set<Sample> = new Set()
  readonly isNull: boolean = true

  async copy(path: string): Promise<Node> {
    return this
  }

  private constructor() {
  }
}

export class MutableNode implements Node {
  parent: Node
  children: Set<Node>
  meta: NodeMeta
  samples: Set<Sample>
  isNull: boolean = false
  name: string
  path: string

  async copy(destination: string): Promise<Node> {
    const destChildren: Set<Node> = new Set();
    for (const child of this.children) {
      const destPath = path.join(destination, path.basename(child.path))
      // XXX: this recursion will cause a stack overflow
      const destChild = await child.copy(destPath)
      destChildren.add(destChild)
    }
    return new MutableNode(destination, this.name, this.parent, destChildren, this.meta, this.samples)
  }

  public constructor(path: string, name: string, parent?: Node, children?: Set<Node>, meta?: NodeMeta, samples?: Set<Sample>) {
    this.path = path
    this.name = name
    this.parent = parent === undefined ? NullNode.INSTANCE : parent
    this.children = children === undefined ? new Set() : children
    this.meta = meta === undefined ? NullMeta.INSTANCE : meta
    this.samples = samples === undefined ? new Set() : samples
  }
}