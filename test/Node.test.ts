import {Meta} from "../src/Meta"
import {NodeClass} from "../src/Node"
import {Sample} from "../src/Sample"

test('Node basics', () => {
  let meta: Meta = {
    keywords: []
  }
  let sample1: Sample = {
    name: "Sample 1"
  }
  let samples: ReadonlyArray<Sample> = [sample1]
  let node = new NodeClass(meta, samples)


})