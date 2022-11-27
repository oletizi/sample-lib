import {Meta, NullMeta} from "../src/Meta"
import {Node, NodeClass, NullNode} from "../src/Node"
import {Sample} from "../src/Sample"

test('Node basics', () => {
  let nodeMeta: Meta = {
    keywords: new Set([])
  }
  let sample1: Sample = {
    meta: new NullMeta(),
    name: "Sample 1"
  }

  let parent: Node = {children: new Set(), parent: new NullNode(), meta: new NullMeta(), samples: new Set()}

  let samples: ReadonlySet<Sample> = new Set([sample1])
  let children: ReadonlySet<Node> = new Set([])
  let node = new NodeClass(parent, children, nodeMeta, samples)
  expect(node.meta).toEqual(nodeMeta)
  expect(node.samples).toEqual(samples)
})