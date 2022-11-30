import {ImmutableLibrary} from "../../src/Library"
import {Node} from "../../src/Node"
import {mock} from "jest-mock-extended"

test('Library copy', async () =>{
  const destPath = 'foo'
  const rootNode: Node = mock<Node>()
  const library = new ImmutableLibrary("the name", rootNode)

  const destLibrary = await library.copy(destPath)
  expect(destLibrary.name).toBe(library.name)
  expect(rootNode.copy).toHaveBeenCalledWith(destPath)
})