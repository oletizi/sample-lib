import {MetaClass} from "../src/Meta"

test('Meta basics', () => {
  let keywords: ReadonlySet<string> = new Set(["keyword1", "keyword2"])
  let meta = new MetaClass(keywords)
  expect(meta.keywords).toEqual(keywords)
})
