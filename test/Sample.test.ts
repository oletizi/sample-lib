import {SampleClass} from "../src/Sample"

test('Sample basics', () => {
  let sampleName = "sample name"
  let sample = new SampleClass(sampleName)
  expect(sample.name).toEqual(sampleName)
})