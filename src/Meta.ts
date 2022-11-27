export interface Meta {
  keywords: ReadonlySet<string>
}

export class NullMeta implements Meta {
  keywords: ReadonlySet<string>
  constructor() {
    this.keywords = new Set()
  }
}

export class MetaClass implements Meta {
  readonly keywords: ReadonlySet<string>

  constructor(keywords: ReadonlySet<string>) {
    this.keywords = keywords
  }
}