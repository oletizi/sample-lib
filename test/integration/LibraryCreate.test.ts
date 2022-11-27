import {FilesystemDataSource} from "../../src/LibraryFactory"
import {Node} from "../../src/Node"

test('FilesystemDataSource basics', async () =>{
  // test a one-level library
  const root = 'test/data/library/one-level'
  const ds = new FilesystemDataSource()

  const node : Node = await ds.readNode(root)

  // check the node
  expect(node).toBeDefined()
  expect(node.isNull).toBeFalsy()

  // check the metadata
  const meta = node.meta
  expect(meta).toBeDefined()
  //expect(meta.keywords.size).toBe(2)
})