import {Sample, SampleClass} from "../src/Sample"
import {Meta} from "../src/Meta";

test('Sample basics', () => {
  let sampleName = "sample name"
  let meta: Meta = {keywords: []}
  let sample: Sample = new SampleClass(sampleName, meta)
  expect(sample.name).toEqual(sampleName)
  expect(sample.meta).toEqual(meta)
})