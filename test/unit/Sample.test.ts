import {Sample, ImmutableSample} from "../../src/Sample"
import {Meta, NullMeta} from "../../src/Meta"

test('Sample basics', () => {
  let sampleName = "sample name"
  let meta: Meta = NullMeta.INSTANCE
  let sample: Sample = new ImmutableSample(sampleName, meta)
  expect(sample.name).toEqual(sampleName)
  expect(sample.meta).toEqual(meta)
})