import {NodeMeta} from "../../src/NodeMeta"
import {Node, MutableNode, NullNode} from "../../src/Node"
import {Sample} from "../../src/Sample"
import {mock} from "jest-mock-extended"
import path from "path"
import {NullSampleMeta} from "../../src/SampleMeta"

test('NullNode copy', async () => {
  expect(await NullNode.INSTANCE.copy('nonsense', NullNode.INSTANCE)).toBe(NullNode.INSTANCE)
})

test('Node shallow copy', async () => {
  const sourcePath: string = "sourcePath"
  const destPath: string = "destPath"
  const sourceNode: Node = new MutableNode({path: sourcePath, name: "the name"})
  const destNode = await sourceNode.copy(destPath, NullNode.INSTANCE)
  expect(destNode.path).toBe(destPath)
})

test('Node deep copy', async () => {
  const sourceRootPath: string = "sourceRoot"
  const destRootPath: string = "destRoot"
  const subPath: string = 'subNode'
  const subSubPath: string = 'subSubNode'

  const subSubSamples: Set<Sample> = new Set()
  const sampleName: string = "the sample name"
  const subSubSample: Sample = {
    meta: NullSampleMeta.INSTANCE,
    name: sampleName,
    path: path.join(sourceRootPath, subPath, subSubPath, sampleName)
  }


  subSubSamples.add(subSubSample)
  // create terminal, third-level node
  const sourceSubSubNode: MutableNode = new MutableNode(
    {
      path: path.join(sourceRootPath, subPath, subSubPath),
      name: 'Sub Sub Node',
      samples: subSubSamples
    })

  // create second-level node
  const subChildren: Set<Node> = new Set()
  subChildren.add(sourceSubSubNode)
  const sourceSubNode: MutableNode = new MutableNode(
    {path: path.join(sourceRootPath, subPath), name: "Sub Node", children: subChildren}
  )
  sourceSubSubNode.parent = sourceSubNode

  // create root node
  const children: Set<Node> = new Set()
  children.add(sourceSubNode)
  const sourceRootNode: Node = new MutableNode(
    {path: sourceRootPath, name: "the name", parent: NullNode.INSTANCE, children: children}
  )
  sourceSubNode.parent = sourceRootNode

  // copy the root node
  const destRootNode: Node = await sourceRootNode.copy(destRootPath, NullNode.INSTANCE)

  // check results
  expect(destRootNode).toBeDefined()
  expect(destRootNode.parent).toBe(NullNode.INSTANCE)

  let secondLevelNodes = 0
  let thirdLevelNodes = 0
  // check second-level nodes
  for (const destSubNode of destRootNode.children) {
    secondLevelNodes++
    expect(destSubNode.path).toBe(path.join(destRootPath, subPath))
    expect(destSubNode.parent).toBe(destRootNode)

    // check third-level nodes
    for (const destSubSubNode of destSubNode.children) {
      thirdLevelNodes++
      expect(destSubSubNode.path).toBe(path.join(destRootPath, subPath, subSubPath))
      expect(destSubSubNode.samples.size).toBe(1)
      for (const sample of destSubSubNode.samples) {
        expect(sample.path).toBe(path.join(destSubSubNode.path, sample.name))
      }
    }
  }

  // make sure we tested the second- and third-level nodes
  expect(secondLevelNodes).toBe(1)
  expect(thirdLevelNodes).toBe(1)
})

test('Node basics', () => {
  let nodeMeta: NodeMeta = mock<NodeMeta>()

  const sample1: Sample = mock<Sample>()
  let parent: Node = mock<Node>()
  let samples: Set<Sample> = new Set([sample1])
  let children: Set<Node> = new Set([])
  let node: Node = new MutableNode(
    {
      path: "/path/to/node",
      name: "node name",
      parent: parent,
      children: children,
      meta: nodeMeta,
      samples: samples
    }
  )
  expect(node.meta).toEqual(nodeMeta)
  expect(node.samples).toEqual(samples)
})

test('MutableNode undefined parameters in constructor', () => {
  const node: MutableNode = new MutableNode({path: "/path/to/node", name: "node name"})
  expect(node.name === "")
  expect(node.meta.isNull).toBeTruthy()
  expect(node.samples.size).toBe(0)
  expect(node.children.size).toBe(0)
  expect(node.parent.isNull).toBeTruthy()
  expect(node.isNull).toBeFalsy()
})