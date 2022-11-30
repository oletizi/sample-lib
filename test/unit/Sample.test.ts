import {Sample, ImmutableSample} from "../../src/Sample"
import {Meta, NullMeta} from "../../src/Meta"

test('Sample basics', () => {
  const samplePath: string = "path/to/the/sample"
  const sampleName = "sample name"
  const meta: Meta = NullMeta.INSTANCE

  const sample: Sample = new ImmutableSample(samplePath, sampleName, meta)
  expect(sample.name).toEqual(sampleName)
  expect(sample.meta).toEqual(meta)
})