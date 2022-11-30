import {Meta} from "./Meta"
import {FFProbeStream} from "ffprobe"

export interface SampleMeta extends Meta {
  streams: ReadonlyArray<MediaStreamMeta>
}

export class ImmutableSampleMeta implements SampleMeta {
  readonly isNull: boolean = false
  readonly keywords: ReadonlySet<string>
  readonly streams: ReadonlyArray<MediaStreamMeta>

  constructor(keywords: ReadonlySet<string>, streams: ReadonlyArray<MediaStreamMeta>) {
    this.keywords = keywords
    this.streams = streams
  }
}

export interface MediaStreamMeta {
  readonly bitRate: number | undefined
  readonly bitsPerSample: number | undefined,
  readonly channels: number | undefined,
  readonly codecLongName: string | undefined,
  readonly codecName: string | undefined,
  readonly codecType: "video" | "audio" | "images" | undefined,
  readonly duration: number | undefined,
  readonly durationTs: string | undefined,
  readonly index: number,
  readonly sampleFmt: string | undefined,
  readonly sampleRate: number | undefined,
}

export class ImmutableMediaStreamMeta implements MediaStreamMeta {
  readonly bitRate: number | undefined
  readonly bitsPerSample: number | undefined
  readonly channels: number | undefined
  readonly codecLongName: string | undefined
  readonly codecName: string | undefined
  readonly codecType: "video" | "audio" | "images" | undefined
  readonly duration: number | undefined
  readonly durationTs: string | undefined
  readonly index: number
  readonly sampleFmt: string | undefined
  readonly sampleRate: number | undefined

  constructor(ffstream: FFProbeStream) {
    this.bitRate = ffstream.bit_rate
    this.bitsPerSample = ffstream.bits_per_sample
    this.channels = ffstream.channels
    this.codecLongName = ffstream.codec_long_name
    this.codecName = ffstream.codec_name
    this.codecType = ffstream.codec_type
    this.duration = ffstream.duration
    this.durationTs = ffstream.duration_ts
    this.index = ffstream.index
    this.sampleFmt = ffstream.sample_fmt
    this.sampleRate = ffstream.sample_rate
  }
}