// Prints the body of one version's section of CHANGELOG.md.
// Usage: node scripts/changelog-section.mjs 0.1.2
import { readFileSync } from 'node:fs'

const version = process.argv[2]
if (!version) {
  console.error('usage: node scripts/changelog-section.mjs <version>')
  process.exit(1)
}

const lines = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8').split(/\r?\n/)
const start = lines.findIndex((line) => line.startsWith(`## ${version} `) || line === `## ${version}`)
if (start === -1) {
  console.error(`CHANGELOG.md has no "## ${version}" section`)
  process.exit(1)
}
let end = lines.findIndex((line, i) => i > start && line.startsWith('## '))
if (end === -1) end = lines.length

const body = lines.slice(start + 1, end).join('\n').trim()
if (!body) {
  console.error(`CHANGELOG.md section for ${version} is empty`)
  process.exit(1)
}
console.log(body)
