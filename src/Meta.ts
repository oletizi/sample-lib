export class Meta {
  keywords: ReadonlyArray<string>

  constructor(keywords: ReadonlyArray<string>) {
    this.keywords = keywords
  }

  getKeywords(): ReadonlyArray<string> {
    return this.keywords
  }
}