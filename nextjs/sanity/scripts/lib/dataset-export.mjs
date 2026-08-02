import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {createReadStream, readFileSync} from 'node:fs'
import {extname, resolve} from 'node:path'

const MAX_EXPORT_BYTES = 256 * 1024 * 1024

export function resolveInputPath(input) {
  if (!input) throw new Error('Missing dataset export path')
  return resolve(process.cwd(), input)
}

export function readExportDocuments(input) {
  const sourcePath = resolveInputPath(input)
  let ndjson

  if (extname(sourcePath) === '.ndjson') {
    ndjson = readFileSync(sourcePath, 'utf8')
  } else {
    const members = listTarMembers(sourcePath)
    const dataMember = members.find((member) => member.endsWith('/data.ndjson'))

    if (!dataMember) {
      throw new Error(`No data.ndjson found in ${sourcePath}`)
    }

    ndjson = execFileSync('tar', ['-xOzf', sourcePath, dataMember], {
      encoding: 'utf8',
      maxBuffer: MAX_EXPORT_BYTES,
    })
  }

  const documents = ndjson
    .split('\n')
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line)
      } catch (error) {
        throw new Error(`Invalid NDJSON on line ${index + 1}: ${error.message}`)
      }
    })

  return {documents, sourcePath}
}

export function listTarMembers(input) {
  const sourcePath = resolveInputPath(input)
  return execFileSync('tar', ['-tzf', sourcePath], {
    encoding: 'utf8',
    maxBuffer: MAX_EXPORT_BYTES,
  })
    .split('\n')
    .filter(Boolean)
}

export function readExportAssets(input) {
  const sourcePath = resolveInputPath(input)
  if (extname(sourcePath) === '.ndjson') {
    return {assets: {}, imageMembers: [], sourcePath}
  }

  const members = listTarMembers(sourcePath)
  const assetsMember = members.find((member) => member.endsWith('/assets.json'))
  if (!assetsMember) {
    return {assets: {}, imageMembers: [], sourcePath}
  }

  const assets = JSON.parse(
    execFileSync('tar', ['-xOzf', sourcePath, assetsMember], {
      encoding: 'utf8',
      maxBuffer: MAX_EXPORT_BYTES,
    })
  )

  return {
    assets,
    imageMembers: members.filter((member) => member.includes('/images/')),
    sourcePath,
  }
}

export async function sha256File(filePath) {
  const hash = createHash('sha256')
  for await (const chunk of createReadStream(filePath)) hash.update(chunk)
  return hash.digest('hex')
}

export function stableStringify(value, space = 2) {
  const sort = (node) => {
    if (Array.isArray(node)) return node.map(sort)
    if (!node || typeof node !== 'object') return node
    return Object.fromEntries(
      Object.keys(node)
        .sort()
        .map((key) => [key, sort(node[key])])
    )
  }

  return JSON.stringify(sort(value), null, space)
}
