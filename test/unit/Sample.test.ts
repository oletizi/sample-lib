import {Sample, ImmutableSample} from "../../src/Sample"
import {SampleMeta} from "../../src/SampleMeta"
import {mock} from "jest-mock-extended"

test('Sample basics', () => {
  const samplePath: string = "path/to/the/sample"
  const sampleName = "sample name"
  const meta: SampleMeta = mock<SampleMeta>()

  const sample: Sample = new ImmutableSample(samplePath, sampleName, meta)
  expect(sample.name).toEqual(sampleName)
  expect(sample.meta).toEqual(meta)
})

