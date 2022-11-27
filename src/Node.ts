import {Meta} from "./Meta";
import {Sample} from "./Sample";

export interface Node {
  meta: Meta
  samples: ReadonlyArray<Sample>
}

export class NodeClass {
  readonly meta: Meta;
  readonly samples: ReadonlyArray<Sample>;

  constructor(meta: Meta, samples: ReadonlyArray<Sample>) {
    this.meta = meta;
    this.samples = samples;
  }
}