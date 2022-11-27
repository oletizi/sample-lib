import {MetaClass} from "../src/Meta";

test('Meta basics', () => {
  let keywords: ReadonlyArray<string> = ["keyword1", "keyword2"];
  let meta = new MetaClass(keywords)
  expect(meta.keywords).toEqual(keywords)
})
