export interface Sample {
  readonly name: string
}

export class SampleClass {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }
}