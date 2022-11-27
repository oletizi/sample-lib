export interface Meta {
  keywords: ReadonlyArray<string>
}

export class MetaClass {
  readonly keywords: ReadonlyArray<string>

  constructor(keywords: ReadonlyArray<string>) {
    this.keywords = keywords
  }
}