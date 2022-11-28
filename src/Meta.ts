export interface Meta {
  readonly keywords: ReadonlySet<string>
  readonly isNull: boolean
}

export class NullMeta implements Meta {
  static INSTANCE: Meta = new NullMeta()
  readonly keywords: ReadonlySet<string>
  readonly isNull: boolean = true

  private constructor() {
    this.keywords = new Set()
  }
}

export class ImmutableMeta implements Meta {
  readonly keywords: ReadonlySet<string>
  readonly isNull: boolean = true

  constructor(keywords: ReadonlySet<string>) {
    this.keywords = keywords
  }
}