import {Meta} from "../src/Meta"
import {NodeClass} from "../src/Node"
import {Sample} from "../src/Sample"

test('Node basics', () => {
  let nodeMeta: Meta = {
    keywords: []
  }
  let sampleMeta: Meta = {
    keywords: []
  }
  let sample1: Sample = {
    meta: sampleMeta,
    name: "Sample 1"
  }
  let samples: ReadonlyArray<Sample> = [sample1]
  let node = new NodeClass(nodeMeta, samples)
  expect(node.meta).toEqual(nodeMeta)
  expect(node.samples).toEqual(samples)
})