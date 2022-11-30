import {Sample, ImmutableSample} from "../../src/Sample"
import {NodeMeta, NullMeta} from "../../src/NodeMeta"

test('Sample basics', () => {
  const samplePath: string = "path/to/the/sample"
  const sampleName = "sample name"
  const meta: NodeMeta = NullMeta.INSTANCE

  const sample: Sample = new ImmutableSample(samplePath, sampleName, meta)
  expect(sample.name).toEqual(sampleName)
  expect(sample.meta).toEqual(meta)
})