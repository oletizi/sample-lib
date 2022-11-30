import {SampleMeta} from "./SampleMeta"

export interface Sample {
  readonly path: string
  readonly name: string
  readonly meta: SampleMeta
}

export class ImmutableSample implements Sample {
  readonly name: string
  readonly path: string
  readonly meta: SampleMeta

  constructor(path: string, name: string, meta: SampleMeta) {
    this.path = path
    this.name = name
    this.meta = meta
  }
}