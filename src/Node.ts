import {Meta, NullMeta} from "./Meta"
import {Sample} from "./Sample"

export interface Node {
  readonly name: string
  readonly meta: Meta
  readonly samples: ReadonlySet<Sample>
  readonly parent: Node
  readonly children: ReadonlySet<Node>
  readonly isNull: boolean
}

export class NullNode implements Node {
  static INSTANCE: Node = new NullNode()
  readonly name: string = ""
  readonly children: Set<Node> = new Set([])
  readonly meta: Meta = NullMeta.INSTANCE
  readonly parent: Node = this
  readonly samples: Set<Sample> = new Set()
  readonly isNull: boolean = true

  private constructor() {
  }
}

export class MutableNode implements Node {
  parent: Node
  children: Set<Node>
  meta: Meta
  samples: Set<Sample>
  isNull: boolean = false
  name: string

  public constructor(name?: string, parent?: Node, children?: Set<Node>, meta?: Meta, samples?: Set<Sample>) {
    this.parent = parent === undefined ? NullNode.INSTANCE : parent
    this.children = children === undefined ? new Set() : children
    this.name = name === undefined ? "" : name
    this.meta = meta === undefined ? NullMeta.INSTANCE : meta
    this.samples = samples === undefined ? new Set() : samples
  }
}