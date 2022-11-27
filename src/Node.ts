import {Meta, NullMeta} from "./Meta"
import {Sample} from "./Sample"

export interface Node {
  readonly meta: Meta
  readonly samples: ReadonlySet<Sample>
  readonly parent: Node
  readonly children: ReadonlySet<Node>
  readonly isNull: boolean
}

export class NullNode implements Node {
  readonly children: ReadonlySet<Node>
  readonly meta: Meta
  readonly parent: Node
  readonly samples: ReadonlySet<Sample>
  readonly isNull : boolean = true

  constructor() {
    this.children = new Set()
    this.meta = new NullMeta()
    this.parent = this
    this.samples = new Set()
  }
}

export class NodeClass implements Node {
  readonly parent: Node
  readonly children: ReadonlySet<Node>
  readonly meta: Meta
  readonly samples: ReadonlySet<Sample>
  readonly isNull: boolean = false

  constructor(parent: Node, children: ReadonlySet<Node>, meta: Meta, samples: ReadonlySet<Sample>) {
    this.parent = parent
    this.children = children
    this.meta = meta
    this.samples = samples
  }


}