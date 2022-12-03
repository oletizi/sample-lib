import path from "path"
import {NodeMeta, NullMeta} from "./NodeMeta"
import {ImmutableSample, Sample} from "./Sample"
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
    const destChildren: Set<Node> = new Set()
    const destSamples: Set<Sample> = new Set()
    const rv: MutableNode = new MutableNode({
      dataSource: this.dataSource,
      path: destination,
      name: this.name,
      parent: parent,
      children: destChildren,
      meta: this.meta,
      samples: destSamples
    })

    for (const sample of this.samples) {
      destSamples.add(new ImmutableSample(path.join(destination, sample.name), sample.name, sample.meta))
    }

    for (const child of this.children) {
      const destPath = path.join(destination, path.basename(child.path))
      // XXX: this recursion will cause a stack overflow... eventually.
      const destChild = await child.copy(destPath, rv)
      destChildren.add(destChild)
    }
    return rv
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
