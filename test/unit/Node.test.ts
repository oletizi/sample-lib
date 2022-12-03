import {NodeMeta} from "../../src/NodeMeta"
import {Node, MutableNode, NullNode} from "../../src/Node"
import {Sample} from "../../src/Sample"
import {mock} from "jest-mock-extended"
import {DataSource} from "../../src/LibraryFactory"

test('NullNode copy', async () => {
  expect(await NullNode.INSTANCE.copy('nonsense', NullNode.INSTANCE)).toBe(NullNode.INSTANCE)
})

test('Node copy', async () => {
  const dataSource = mock<DataSource>()
  const sourcePath: string = "sourceRoot"
  const destPath: string = "destRoot"
  const name: string = "the node name"
  const parent = mock<Node>()
  const expectedCopiedNode = mock<Node>()
  dataSource.copyNode.mockReturnValue(new Promise((resolve) => {
    resolve(expectedCopiedNode)
  }))

  const node = new MutableNode({
    dataSource: dataSource,
    path: sourcePath,
    name: name
  })
  const copiedNode = await node.copy(destPath, parent)
  expect(copiedNode).toBe(expectedCopiedNode)
  expect(dataSource.copyNode).toHaveBeenCalledWith(sourcePath, destPath, parent)
})

test('Node basics', () => {
  let nodeMeta: NodeMeta = mock<NodeMeta>()

  const sample1: Sample = mock<Sample>()
  let parent: Node = mock<Node>()
  let samples: Set<Sample> = new Set([sample1])
  let children: Set<Node> = new Set([])
  let node: Node = new MutableNode(
    {
      dataSource: mock<DataSource>(),
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
  const node: MutableNode = new MutableNode(
    {dataSource: mock<DataSource>(), path: "/path/to/node", name: "node name"})
  expect(node.name === "")
  expect(node.meta.isNull).toBeTruthy()
  expect(node.samples.size).toBe(0)
  expect(node.children.size).toBe(0)
  expect(node.parent.isNull).toBeTruthy()
  expect(node.isNull).toBeFalsy()
})