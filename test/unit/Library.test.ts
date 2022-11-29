import {Library} from "../../src/Library"
import {mock} from 'jest-mock-extended'
import {Node} from "../../src/Node"


test('Library basics.', () => {
  const name: string = 'the name'
  const node = mock<Node>()
  const lib = new Library(name, node)
  expect(lib.name).toEqual(name)

})