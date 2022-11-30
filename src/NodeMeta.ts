import {Meta} from "./Meta"

export interface NodeMeta extends Meta {
}

export class NullMeta implements NodeMeta {
  static INSTANCE: NodeMeta = new NullMeta()
  readonly keywords: ReadonlySet<string>
  readonly isNull: boolean = true

  private constructor() {
    this.keywords = new Set()
  }
}

export class ImmutableMeta implements NodeMeta {
  readonly keywords: ReadonlySet<string>
  readonly isNull: boolean = true

  constructor(keywords: ReadonlySet<string>) {
    this.keywords = keywords
  }
}