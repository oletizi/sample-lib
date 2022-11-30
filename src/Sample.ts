import {Meta} from "./Meta"

export interface Sample {
  readonly path: string
  readonly name: string
  readonly meta: Meta
}

export class ImmutableSample implements Sample {
  readonly name: string
  readonly path: string
  readonly meta: Meta

  constructor(path: string, name: string, meta: Meta) {
    this.path = path
    this.name = name
    this.meta = meta
  }

}