import {Meta} from '../src/Meta'

test('basics', () => {
  let keywords: ReadonlyArray<string> = ["keyword1", "keyword2"];
  let meta = new Meta(keywords)
  expect(meta.getKeywords()).toEqual(keywords)
})