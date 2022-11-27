import {Meta} from "./Meta"

export interface Sample {
  meta: Meta
  readonly name: string
}

export class ImmutableSample implements Sample {
  readonly name: string
  readonly meta: Meta

  constructor(name: string, meta: Meta) {
    this.name = name
    this.meta = meta
  }

}