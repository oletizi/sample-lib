import {ImmutableNodeMeta} from "../../src/NodeMeta"

test('Meta basics', () => {
  let keywords: ReadonlySet<string> = new Set(["keyword1", "keyword2"])
  let meta = new ImmutableNodeMeta(keywords)
  expect(meta.keywords).toEqual(keywords)
})
