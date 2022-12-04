import * as crypto from "crypto"
import * as fs from "fs"

test('File hash test basics', async () => {

  const identicalFile1 = await fs.promises.readFile('test/data/hash/identical-file-1.txt')
  const identicalFile2 = await fs.promises.readFile('test/data/hash/identical-file-2.txt')
  const nonIdenticalFile = await fs.promises.readFile('test/data/hash/non-identical-file.txt')
  const hashIdenticalFile1 = crypto.createHash('sha256')
  const hashIdenticalFile2 = crypto.createHash('sha256')
  const hashNonIdenticalFile = crypto.createHash('sha256')

  hashIdenticalFile1.update(identicalFile1)
  hashIdenticalFile2.update(identicalFile2)
  hashNonIdenticalFile.update(nonIdenticalFile)

  const digestIdenticalFile1 = hashIdenticalFile1.digest('hex')
  const digestIdenticalFile2 = hashIdenticalFile2.digest('hex')
  const digestNonIdenticalFile = hashNonIdenticalFile.digest('hex')

  expect(digestIdenticalFile1).toEqual(digestIdenticalFile2)
  expect(digestNonIdenticalFile).not.toEqual(digestIdenticalFile1)
})