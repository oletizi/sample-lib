import {FilesystemDataSource} from "../../src/LibraryFactory"
import {Node} from "../../src/Node"

test('FilesystemDataSource basics', async () =>{
  // test a one-level library
  const root = 'test/data/library/one-level'
  const ds = new FilesystemDataSource()
  const node : Node = await ds.readNode(root)

  expect(node).toBeDefined()
  const meta = node.meta
  expect(meta).toBeDefined()

})