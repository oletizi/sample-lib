export interface Meta {
  readonly keywords: ReadonlySet<string>
}

export class NullMeta implements Meta {
  static INSTANCE : Meta = new NullMeta()
  readonly keywords: ReadonlySet<string>
  private constructor() {
    this.keywords = new Set()
  }
}

export class ImmutableMeta implements Meta {
  readonly keywords: ReadonlySet<string>

  constructor(keywords: ReadonlySet<string>) {
    this.keywords = keywords
  }
}