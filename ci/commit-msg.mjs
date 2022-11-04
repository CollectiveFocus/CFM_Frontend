// Invoked on the commit-msg git hook by simple-git-hooks.

import { readFileSync } from 'fs';
import colors from 'picocolors';

// get $1 from commit-msg script
const msgFilePath = process.argv[2];
const msgFileContents = readFileSync(msgFilePath, 'utf-8');
const commitTitle = msgFileContents.split(/\r?\n/)[0];

const commitRE =
  /^(revert: )?(feat|fix|refactor|test|perf|style|asset|doc|ci|chore|wip)(\(.+\))?: [A-Z].{1,68}[^.]$/;

if (!commitRE.test(commitTitle)) {
  console.log();
  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.white(
      `Invalid commit title format or length.`
    )}\n\n` +
      colors.white(
        `  Commit messages must under 70 characters and have the following format:\n\n`
      ) +
      `    ${colors.green(`feat: Add 'comments' option`)}\n` +
      `    ${colors.green(`fix: Handle events on blur (close #28)`)}\n\n` +
      colors.white(`  See ./docs/commit-convention.md for more details.\n`)
  );
  process.exit(1);
}
