// Invoked on the commit-msg git hook by simple-git-hooks.

import { readFileSync } from 'fs'
import colors from 'picocolors'

// get $1 from commit-msg script
const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const commitRE =
  /^(revert: )?(feat|fix|refactor|test|perf|style|asset|doc|ci|chore|wip)(\(.+\))?: [A-Z].{1,49}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.white(
      `Invalid commit message format.`
    )}\n\n` +
      colors.white(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${colors.green(`feat: Add 'comments' option`)}\n` +
      `    ${colors.green(`fix: Handle events on blur (close #28)`)}\n\n` +
      colors.white(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
