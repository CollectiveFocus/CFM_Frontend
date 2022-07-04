# Git Commit Message Convention

This convention is adapted from:

- [How to Write a Git Commit Message](https://cbea.ms/git-commit/) by Chris Beams
- [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) by Josh Buchea

## synopsis

- commit message header format: `<type>(<scope>): <subject>`
- `subject` must start with a capital letter
- `subject` must not end with a period
- `subject` must not exceed 50 characters

commit header examples:

- `feat: Add hat wobble`
- `wip: Moved commit-convention to docs`

## commit message

A commit message consists of a `header`, `body` and `footer`. The header has a `type`, `scope` and `subject`:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### header

The `header` is mandatory and the `scope` of the header is optional.

```
feat: Add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

#### type

If the type is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

The types are as follows:

- `feat`: new feature for the user, not a new feature for build script
- `fix`: bug fix for the user, not a fix to a build script
- `refactor`: refactoring production code, eg. renaming a variable
- `test`: adding missing tests, refactoring tests; no production code change
- `perf`: performance improvements to production code
- `style`: formatting, missing semi colons, etc; no production code change
- `asset`: changing static assets. ie: css files, images, etc
- `doc`: changes to the documentation
- `ci`: updating CD/CI pipeline; no local script changes
- `chore`: updating grunt tasks etc; no production code change
- `revert`: reverting a previously published commit
- `wip`: work in progress commit

##### revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### scope

The scope could be anything specifying the place of the commit change. For example `dev`, `build`, `workflow`, `cli`, etc. If you don't know what the scope is, leave it blank.

#### subject

1. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Capitalize the subject line
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how

### body

Just as in the `subject`, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

### examples

Appears under "Features" header, `dev` subheader:

```
feat(dev): Add 'comments' option
```

Appears under "Bug Fixes" header, `dev` subheader, with a link to issue #28:

```
fix(dev): Fix dev error

close #28
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(build): Remove 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(compiler): Add 'comments' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```
