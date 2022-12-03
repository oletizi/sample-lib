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

  copy(destPath: string, destParent: Node): Promise<Node>
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

  async copy(path: string, parent: Node): Promise<Node> {
    return this
  }

  private constructor() {
  }
}

export interface NodeParameters {
  path: string,
  name: string,
  parent?: Node,
  children?: Set<Node>,
  meta?: NodeMeta,
  samples?: Set<Sample>
}

export class MutableNode implements Node {
  name: string
  path: string
  parent: Node
  children: Set<Node>
  meta: NodeMeta
  samples: Set<Sample>
  isNull: boolean = false

  async copy(destination: string, parent: Node): Promise<Node> {
    const destChildren: Set<Node> = new Set()
    const rv: MutableNode = new MutableNode({
      path: destination,
      name: this.name,
      parent: parent,
      children: destChildren,
      meta: this.meta,
      samples: this.samples
    })
    for (const child of this.children) {
      const destPath = path.join(destination, path.basename(child.path))
      // XXX: this recursion will cause a stack overflow
      const destChild = await child.copy(destPath, rv)
      destChildren.add(destChild)
    }
    return rv
  }


  public constructor({
                       path,
                       name,
                       parent = NullNode.INSTANCE,
                       children = new Set(),
                       meta = NullMeta.INSTANCE,
                       samples = new Set()
                     }: NodeParameters) {
    this.path = path
    this.name = name
    this.parent = parent
    this.children = children
    this.meta = meta
    this.samples = samples
  }
}
