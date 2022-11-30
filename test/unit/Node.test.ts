import {NodeMeta} from "../../src/NodeMeta"
import {Node, MutableNode, NullNode} from "../../src/Node"
import {Sample} from "../../src/Sample"
import {mock} from "jest-mock-extended"
import path from "path"

test('Node shallow copy', async () => {
  const sourcePath: string = "sourcePath"
  const destPath: string = "destPath"
  const sourceNode: Node = new MutableNode(sourcePath, "the name")
  const destNode = await sourceNode.copy(destPath)
  expect(destNode.path).toBe(destPath)

  expect(await NullNode.INSTANCE.copy('sldkfaj;')).toBe(NullNode.INSTANCE)
})

test('Node deep copy', async () => {
  const sourceRootPath: string = "sourceRoot"
  const destRootPath: string = "destRoot"
  const subPath: string = 'subNode'
  const sourceSubNode: Node = new MutableNode(path.join(sourceRootPath, subPath), "sub node")
  const children: Set<Node> = new Set()
  children.add(sourceSubNode)
  const sourceRootNode: Node = new MutableNode(sourceRootPath, "the name", NullNode.INSTANCE, children)

  const destRootNode: Node = await sourceRootNode.copy(destRootPath)

  expect(destRootNode).toBeDefined()
  for (const destSubNode of destRootNode.children) {
    expect(destSubNode.path).toBe(path.join(destRootPath, subPath))
  }
})

test('Node basics', () => {
  let nodeMeta: NodeMeta = {
    keywords: new Set([]),
    isNull: false
  }

  const sample1: Sample = mock<Sample>()

  let parent: Node = mock<Node>()

  let samples: Set<Sample> = new Set([sample1])
  let children: Set<Node> = new Set([])
  let node: Node = new MutableNode("/path/to/node", "node name", parent, children, nodeMeta, samples)
  expect(node.meta).toEqual(nodeMeta)
  expect(node.samples).toEqual(samples)
})

test('MutableNode undefined parameters in constructor', () => {
  const node: MutableNode = new MutableNode("/path/to/node", "node name")
  expect(node.name === "")
  expect(node.meta.isNull).toBeTruthy()
  expect(node.samples.size).toBe(0)
  expect(node.children.size).toBe(0)
  expect(node.parent.isNull).toBeTruthy()
  expect(node.isNull).toBeFalsy()
})