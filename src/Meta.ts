export class Meta {
  data: object
  constructor(data: object) {
    this.data = data
  }

  getKeywords() : Array<string> {
    return new Array<string>()
  }
}