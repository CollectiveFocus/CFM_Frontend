# Contributing: Fridge Finder

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in the [#frontend](https://discord.com/channels/955884900655972463/955886184159125534) channel on Discord.

**Table of Contents**

1. [Join the communication channels](#join-the-communication-channels)
1. [Configure shell](#configure-shell)
1. [Configure git](#configure-git)
1. [Configure development environment](#configure-development-environment)
1. [Select a task](#select-a-task)
1. [Create a feature branch](#create-a-feature-branch)
1. [Create a commit](#create-a-commit)
1. [Update the feature branch for code review](#update-the-feature-branch-for-code-review)
1. [Request a code review](#request-a-code-review)
1. [Programmer Reference](#programmer-reference)

## Join the communication channels

You need permissions to the following accounts to contribute to the project.

- [Trello for project management](https://trello.com/b/UhEoUpnD/community-fridge-map-dev). Click this [Trello invite link](https://trello.com/invite/b/UhEoUpnD/75290c9c5fda3402fc3c0ac97a2bdd99/community-fridge-map-dev) to join.
- [Discord for developer communication](https://discord.com/channels/955884900655972463/955884900655972468)
- [Figma for design blueprints](https://www.figma.com/file/LL2Ny1FZ4YLSMB2yKwDVY7/NYC-Fridge-2)
- [GitHub for the frontend repository](https://github.com/CollectiveFocus/CFM_Frontend)
- [GitHub for the backend repository](https://github.com/CollectiveFocus/CFM_Backend)

Email <info@collectivefocus.site> regarding account invites. In that email please include:

- your discord account name
- your github account name
- whether you will be contributing to the frontend, backend, or both.

Communicating with project maintainers requires Discord and Figma. Both have webapp versions. We recommend installing the desktop version of [Discord](https://discord.com/download) and [Figma](https://www.figma.com/downloads/) because they offer significant performance and UI enhancements.

## Configure shell

Contributing to the project requires a shell terminal. On Windows, we recommend using [git-bash](https://gitforwindows.org/) because it consumes minimal system resources.

## Configure git

These settings are not requirements of the project. They are provided as a service for people who are [new to git](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners).

This configuration sets up VS Code 1.70 and above as your git editor, diff and merge tool. These commands can be run in any shell terminal.

```bash
git config --global user.name "full name. the name on your resume"
git config --global user.email "myemail@example.com"

git config --global core.autocrlf false
git config --global core.filemode false
git config --global core.editor "code --wait"

git config --global push.default current
git config --global pull.default matching
git config --global pull.ff only

git config --global pretty.all "format:%C(auto)%h %C(green)%<(15,trunc)%aN %C(reset)%<(80,trunc)%s %C(yellow)%<(30,trunc)%S %C(auto)%d"
git config --global pretty.summary "format:%C(auto)%h %C(green)%<(15,trunc)%aN %C(reset)%<(80,trunc)%s %C(auto)%d"

git config --global diff.guitool vscode
git config --global merge.guitool vscode

git config --global difftool.prompt false
git config --global mergetool.prompt false
git config --global mergetool.keepBackup false

git config --global difftool.vscode.cmd 'code --wait --diff "$LOCAL" "$REMOTE"'
git config --global mergetool.vscode.cmd 'code --wait --merge "$REMOTE" "$LOCAL" "$BASE" "$MERGED"'
git config --global mergetool.vscode.trustexitcode true
```

Run these commands only if you are using Windows Command or PowerShell as your shell terminal:

```shell
git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"
git config --global mergetool.vscode.cmd "code --wait --merge $REMOTE $LOCAL $BASE $MERGED"
```

The following creates git aliases for the bash and zsh shells. Add these lines to your shell configuration file. Type `code ~/.bashrc` to open the bash shell configuration file. Type `code ~/.zshrc` to open the zsh configuration file.

```bash
# --- git
alias ga='   f() { git add $@; git --no-pager status --short; };f'
alias gaa='  git add --all; git --no-pager status --short'
alias gb='   git branch'
alias gc='   f() { git commit -m "$*"; };f'
alias gca='  git commit --amend -C HEAD'
alias gcam=' f() { git commit --amend -m "$*"; };f'
alias gcp='  f() { git cherry-pick --no-commit $@; git --no-pager status --short; };f'
alias gd='   git difftool --gui'
alias gdn='  git --no-pager diff --name-only'
alias gm='   git mergetool --gui'
alias gl='   git log --pretty=summary --use-mailmap'
alias gla='  git log --pretty=all     --use-mailmap --source --all'
alias gln='  git log --pretty=summary --name-status -n 5'
alias glf='  git --no-pager log --follow --oneline -- '
alias go='   git checkout'
alias gpop=' git stash pop'
alias gpush='git stash push'
alias gpls=' git --no-pager stash list'
alias gs='   git status --short; echo; git --no-pager log --pretty=summary -n 3'
alias gsls=' git status --porcelain | /usr/bin/cut -c4-'
alias gh='   git show'
alias ghn='  git --no-pager show --name-status'
alias gri='  git rebase --interactive --autosquash'
alias gra='  git rebase --abort'
alias grc='  git rebase --continue'
alias gr-d=' git fetch --prune && git rebase --interactive origin/dev'
alias gop='  git push origin -u'
alias gol='  git pull --ff-only'
alias gof='  f() { git fetch --prune $@; git gc --auto; };f'
alias clean='f() { find . -type d \( -name .git -o -name node_modules -o -name .next \) -prune -o -type f -name "*.orig" -print | xargs -I % rm %; git gc --aggressive; };f'

HISTIGNORE="$HISTIGNORE:gaa:gca:gm:gpop;gpush:gs:gra:grc:gr-d:gof:clean"

```

## Configure development environment

Running the Fridge Finder webapp requires [Node](https://nodejs.org/en/download/). The Fridge Finder webapp should be [setup by following the instructions in the readme](./README.md#system-setup).

## Select a task

We use [Trello](https://trello.com/b/UhEoUpnD/community-fridge-map-dev) to keep track of tasks.

- Backlog : A list of tasks that cannot be started
- Todo : A list of tasks that can be started
- In Progress : Tasks currently being worked on
- Code Review : Tasks waiting for review
- Done : Completed tasks

You can pick any task from the `Todo` column that does not already have members. Once you begin working on a task, add yourself as a member, and move it to `In Progress`.

## Create a feature branch

Create a feature branch for the task you are working on. Branch names must be in lowercase and in this format: `cfm_<task number>_<initials>`. The task number is in the task title `[CFM_#]`. The initials come from the name you use on your resume. For example, if Jean Paul starts work on `[CFM_22]`, he would use the following commands to create a feature branch:

```bash
git fetch --prune                               # gof
git checkout origin/dev --no-track -b cfm_22_jp # go origin/dev --no-track -b cfm_22_jp
```

## Create a commit

The commit message header must be in the format: `<type>: <subject>`

`type` is one of the following tags:

- feat : new feature for the user, not a new feature for build script
- fix : bug fix for the user, not a fix to a build script
- refactor : refactoring production code, eg. renaming a variable
- test : adding missing tests, refactoring tests; no production code change
- perf : performance improvements to production code
- style : formatting, missing semi colons, etc; no production code change
- asset : changing static assets. ie css files, images, etc
- doc : changes to the documentation
- ci : updating CD/CI pipeline; no local script changes
- chore : updating grunt tasks etc; no production code change
- revert : reverting a previously published commit

`subject` must abide by the following rules:

- subject must start with a capital letter
- subject must not end with a period
- subject must not exceed 70 characters

commit header examples:

- `feat: Add hat wobble`
- `wip: Move commit-convention to docs`

The complete details on commit messages can be found in the [commit convention](./commit-convention.md).

## Update the feature branch for code review

While it is very useful to create multiple commits during development; for effective code management, every feature needs to be in its own commit. Follow these steps to create atomic commits and incorporate the latest changes from `origin/dev` before submitting your feature branch for review. The feature branch must include a demo of the feature as a single commit. Reach out on [Discord](https://discord.com/channels/955884900655972463/955886184159125534) if you need help with this process.

1. Ensure that all work complies with the [review criteria](./review-criteria.md)
1. Ensure that all work is committed and the branch is clean

   - display changed files

   ```bash
   git status                        # gs
   ```

   - commit changes to the current branch

   ```bash
   git add --all                     # gaa
   git commit -m 'wip: Current work' # gc wip: Current work
   ```

1. Combine all the commits on the feature branch. To do this, count the number of commits, then reset the brach to HEAD~(commit count). For example, Jean Paul made 5 commits to his feature branch `cfm_22_jp`:

   ```
   f557166 Jean Paul       chore: Refactor code and delete extraneous files         (HEAD -> cfm_22_jp)
   e391cf1 Jean Paul       feat: Added FridgeMap Search to filter fridge pins
   7850ecf Jean Paul       feat: Added Fridge Pin SVG to FridgeMap component
   310f581 Jean Paul       feat: Add List view Map view toggle
   53d26af Jean Paul       feat: Created cfm_22 fridgeMap Component
   f5191df Hamaad Chughtai feat: Create FridgeDetailed component
   ```

   His would use the following commands to combine all his commits:

   ```bash
   git reset --soft @~5
   git commit -m 'feat: Create FridgeMap component' # gc feat: Create FridgeMap component
   ```

1. Fetch the most recent commits from origin

   ```bash
   git fetch origin --prune  # gof
   ```

1. Rebase the feature branch on top of origin/dev

   ```bash
   git rebase origin/dev     # gr-d
   ```

1. Resolve all merge conflicts.

   - to view every conflicting file

   ```bash
   git mergetool --gui       # gm
   ```

   - continue rebase

   ```bash
   git rebase --continue     # grc
   ```

1. Delete the merge backup files and optimize repository disk usage

   ```bash
   # clean
   find . -type d \( -name .git -o -name node_modules -o -name .next \) -prune -o -type f -name "*.orig" -print | xargs -I % rm % ; git gc --auto
   ```

1. Create and commit the demo page

   - add the demo page

   ```bash
   git add src/pages/demo/*  # ga src/pages/demo/*
   ```

   - commit changes to the current branch

   ```bash
   git commit -m 'wip: Demo' # gc wip: Demo
   ```

1. Push the feature branch and move the associated [Trello](https://trello.com/b/UhEoUpnD/community-fridge-map-dev) card to 'Code Review'

   ```bash
   git push origin -uf       # gop -f
   ```

## Request a code review

Post a review request in the [#frontend](https://discord.com/channels/955884900655972463/955886184159125534) channel on Discord. If this is your first contribution, include your time zone and availability in the request.

Once your feature branch has been merged into dev, it will automatically be deployed to the [staging website](https://dev.d1zqbru9k8x5eq.amplifyapp.com)

## Programmer Reference

- Production (deployed from main branch): https://fridgefinder.app/
- Staging (deployed from dev branch): https://dev.fridgefinder.app/ or https://dev.d1zqbru9k8x5eq.amplifyapp.com/

### Architecture

- [Architecture](https://docs.google.com/document/d/1yZVGAxVn4CEZyyce_Zuha3oYOOU8ey7ArBvLbm7l4bw)
- [REST API Contract](../src/model/data/fridge/REST.yaml)

### UI Design

- [Aspect Ratio Guide](https://www.cronyxdigital.com/blog/the-ultimate-website-image-guide)

**image aspect ratio (width:height)**

hero image
: aspect ratio is 16:9, preferred size 1366x768

paragraph image
: aspect ratio for mobile is 3:2, preferred size 414x276

fridge photo
: aspect ratio is 1:1.15, exact size 300x345

### Tools

#### HTML Color

- [Color Hex to RGBA converter](https://bl.ocks.org/njvack/02ad8efcb0d552b0230d)

#### REST API

- [API Editor](https://editor-next.swagger.io/)

#### URL Encode

- [Encode SVG as URL](https://yoksel.github.io/url-encoder/)
- [URL encoder/decoder](https://meyerweb.com/eric/tools/dencoder/)

#### Web Analytics

- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### Library

- Application Framework: [Next.js](https://nextjs.org/docs/)

  - [Next.js tutorial](https://nextjs.org/learn)
  - [Next.js repository](https://github.com/vercel/next.js/)

- Type Checking: [prop-types](https://github.com/facebook/prop-types)

  - [prop-types tutorial](https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/)

- UI Components: [MUI](https://mui.com/material-ui/)

- UI Dialogs: [Formik](https://formik.org/docs/overview)

  - [Formik tutorial](https://formik.org/docs/tutorial)

- UI Dialog Validation: [Yup](https://github.com/jquense/yup)

- Geographical Maps: [Leaflet](https://leafletjs.com/), [React Leaflet](https://react-leaflet.js.org/)

  - [Leaflet quick start tutorial](https://leafletjs.com/examples/quick-start/)
  - [Leaflet mobile tutorial](https://leafletjs.com/examples/mobile/)
  - [Leaflet custom markers tutorial](https://leafletjs.com/examples/)

- REST API: [OpenAPI 3.0](https://swagger.io/docs/specification/about/)

  - [API Primer](https://restfulapi.net/)
  - [API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

- REST Mock Server: [json-server](https://github.com/typicode/json-server)

### Design philosophy

- [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
