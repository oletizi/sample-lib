import {ImmutableLibrary} from "../../src/Library"
import {Node} from "../../src/Node"
import {mock} from "jest-mock-extended"

test('Library copy', async () =>{
  const destPath = 'foo'
  const sourceRootNode: Node = mock<Node>()
  const destRootNode: Node = mock<Node>()
  const library = new ImmutableLibrary("the name", sourceRootNode)

  const destLibrary = await library.copy(destPath, destRootNode )
  expect(destLibrary.name).toBe(library.name)
  expect(sourceRootNode.copy).toHaveBeenCalledWith(destPath, destRootNode)
})