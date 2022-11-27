import {Meta, NullMeta} from "../../src/Meta"
import {Node, MutableNode, NullNode} from "../../src/Node"
import {Sample} from "../../src/Sample"

test('Node basics', () => {
  let nodeMeta: Meta = {
    keywords: new Set([])
  }
  let sample1: Sample = {
    meta: NullMeta.INSTANCE,
    name: "Sample 1"
  }

  let parent: Node = {
    name: "parent name",
    children: new Set(),
    parent: NullNode.INSTANCE,
    meta: NullMeta.INSTANCE,
    samples: new Set(),
    isNull: false
  }

  let samples: Set<Sample> = new Set([sample1])
  let children: Set<Node> = new Set([])
  let node: Node = new MutableNode("node name", parent, children, nodeMeta, samples)
  expect(node.meta).toEqual(nodeMeta)
  expect(node.samples).toEqual(samples)
})