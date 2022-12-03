import {NodeMeta, NullMeta} from "./NodeMeta"
import {Sample} from "./Sample"
import {DataSource} from "./LibraryFactory"

export interface Node {
  readonly name: string
  readonly path: string
  readonly meta: NodeMeta
  readonly samples: ReadonlySet<Sample>
  readonly parent: Node
  readonly children: ReadonlySet<Node>
  readonly isNull: boolean

  copy(destPath: string, destParent: Node): Promise<Node>
  move(destPath: string, destParent: Node): Promise<Node>
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

  private constructor() {
  }

  async copy(path: string, parent: Node): Promise<Node> {
    return this
  }

  async move(destPath: string, destParent: Node): Promise<Node> {
    return this
  }
}

export interface NodeParameters {
  dataSource: DataSource,
  path: string,
  name: string,
  parent?: Node,
  children?: Set<Node>,
  meta?: NodeMeta,
  samples?: Set<Sample>
}

export class MutableNode implements Node {
  readonly name: string
  readonly path: string
  parent: Node
  readonly children: Set<Node>
  meta: NodeMeta
  readonly samples: Set<Sample>
  readonly isNull: boolean = false
  private readonly dataSource: DataSource

  public async copy(destination: string, parent: Node): Promise<Node> {
    return this.dataSource.copyNode(this.path, destination, parent)
  }

  public async move(destination: string, parent: Node): Promise<Node> {
    return this.dataSource.moveNode(this.path, destination, parent)
  }

  public constructor({
                       dataSource,
                       path,
                       name,
                       parent = NullNode.INSTANCE,
                       children = new Set(),
                       meta = NullMeta.INSTANCE,
                       samples = new Set()
                     }: NodeParameters) {
    this.dataSource = dataSource
    this.path = path
    this.name = name
    this.parent = parent
    this.children = children
    this.meta = meta
    this.samples = samples
  }
}
