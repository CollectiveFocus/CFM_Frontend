# Contributing: Community Fridge Map

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Community Fridge Map, which is hosted by the [Collective Focus](https://github.com/CollectiveFocus) organization on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in the [#frontend](https://discord.com/channels/955884900655972463/955886184159125534) channel on Discord.

**Table of Contents**

1. [Join the communication channels](#join-the-communication-channels)
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

- [Trello for project management](https://trello.com/b/UhEoUpnD/community-fridge-map-dev)
- [Figma for design blueprints](https://www.figma.com/file/LL2Ny1FZ4YLSMB2yKwDVY7/NYC-Fridge-2)
- [Discord for developer communication](https://discord.com/channels/955884900655972463/955884900655972468)
- [GitHub for the frontend repository](https://github.com/CollectiveFocus/CFM_Frontend)
- [GitHub for the backend repository](https://github.com/CollectiveFocus/CFM_Backend)

Email <info@collectivefocus.site> regarding account invites. In that email please include:

- your discord account name
- your github account name
- whether you will be contributing to the frontend, backend, or both.

## Configure git

This configuration sets up VS Code as your git editor, diff and merge tool. These settings are not requirements of the project. They are provided as a service for people who are [new to git](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners).

```bash
git config --global user.name '<name you use on your resume>'
git config --global user.email 'myemail@example.com'

git config --global core.autocrlf false
git config --global core.filemode false
git config --global core.editor 'code --wait'

git config --global default.push current
git config --global default.pull current
git config --global pull.ff only

git config --global diff.guitool vscode
git config --global difftool.prompt false
git config --global difftool.vscode.cmd 'code --wait --diff "$LOCAL" "$REMOTE"'
git config --global difftool.meld.cmd 'meld "$LOCAL" "$BASE" --output "$BASE"'

git config --global merge.guitool vscode
git config --global mergetool.prompt false
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
git config --global mergetool.vscode.keepbackup false
git config --global mergetool.vscode.trustexitcode true
git config --global mergetool.meld.cmd 'meld "$LOCAL" "$BASE" "$REMOTE" --output "$MERGED"'
git config --global mergetool.meld.keepbackup true
```

## Configure development environment

Running the CFM webapp requires Node. The CFM webapp should be [setup by following the instructions in the readme](./README.md#system-setup).

Contributing to the project requires a unix shell. On Windows, we recommend using [git-bash](https://gitforwindows.org/) because it consumes minimal system resources.

Communicating with project maintainers requires Discord and Figma. Both have webapp versions. However, the desktop versions offer significant performance and UI enhancements.

## Select a task

We use [Trello](https://trello.com/b/UhEoUpnD/community-fridge-map-dev) to keep track of tasks.

- Backlog : A list of tasks that cannot be started
- Todo : A list of tasks that can be started
- In Progress : Tasks currently being worked on
- Code Review : Tasks waiting for review
- Done : Completed tasks

You can pick any task from the `Todo` column that does not already have members. Tasks are grouped by color:

- Yellow : Frontend
- Red : Backend
- Blue : Administrative
- Purple : UI/UX
- Black : Blocked
- Teal : Duplicate

Once you begin working on a task, add yourself as a member, and move it to `In Progress`.

## Create a feature branch

Create a feature branch for the task you are working on. Branch names must be in lowercase and in this format: `cfm_<task number>_<initials>`. The task number is in the task title `[CFM_#]`. The initials come from the name you use on your resume. For example, if Jean Paul starts work on `[CFM_22]`, he would use the following commands to create a feature branch:

```bash
git fetch --prune
git checkout origin/dev --no-track -b cfm_22_jp
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
- subject must not exceed 50 characters

commit header examples:

- `feat: Add hat wobble`
- `wip: Move commit-convention to docs`

The complete details on commit messages can be found in the [commit convention](./commit-convention.md).

## Update the feature branch for code review

While it is very useful to create multiple commits during development; for effective code management, every feature needs to be in its own commit. Follow these steps to create atomic commits and incorporate the latest changes from `origin/dev` before submitting your feature branch for review. The feature branch must include a demo of the feature as a single commit. Reach out on [Discord](https://discord.com/channels/955884900655972463/955886184159125534) if you need help with this process.

1. Ensure that all work complies with the [review criteria](./review-criteria.md)
1. Ensure that all work is committed and the branch is clean

   ```bash
   # display changed files
   git status

   # commit changes to the current branch
   git add --all
   git commit -m 'wip: Current work'
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
   git reset --soft @~5 && git commit -m 'feat: Create FridgeMap component'
   ```

1. Fetch the most recent commits from origin

   ```bash
   git fetch origin --prune
   ```

1. Rebase the feature branch on top of origin/dev

   ```bash
   git rebase origin/dev
   ```

1. Resolve all merge conflicts.

   ```bash
   # to view every conflicting file
   git mergetool --gui

   # continue rebase
   git rebase --continue
   ```

1. Delete the merge backup files

   ```bash
   find . -type d '(' -name .git -o -name node_modules -o -name .next ')' -prune -o -type f -name "*.orig" -print | xargs rm
   ```

1. Commit the demo page

   ```bash
   # add the demo page
   git add src/pages/demo/*

   # commit changes to the current branch
   git commit -m 'wip: Demo'
   ```

1. Push the feature branch and move the associated [Trello](https://trello.com/b/UhEoUpnD/community-fridge-map-dev) card to 'Code Review'

   ```bash
   git push origin -uf
   ```

## Request a code review

Post a review request in the [#frontend](https://discord.com/channels/955884900655972463/955886184159125534) channel on Discord. If this is your first contribution, include your time zone and availability in the request.

## Programmer Reference

### Architecture

- [Architecture](https://docs.google.com/document/d/1yZVGAxVn4CEZyyce_Zuha3oYOOU8ey7ArBvLbm7l4bw/edit)
- [API Contract](../src/schema/cfm/api.yaml)

### Library

- Application Framework: [Next.js](https://nextjs.org/docs/)

  - [Next.js tutorial](https://nextjs.org/learn)
  - [Next.js repository](https://github.com/vercel/next.js/)

- UI Components: [MUI](https://mui.com/material-ui/)

- Type Checking: [prop-types](https://github.com/facebook/prop-types)

  - [prop-types tutorial](https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/)

- Geographical Maps: [Leaflet](https://leafletjs.com/), [React Leaflet](https://react-leaflet.js.org/)

  - [Leaflet quick start tutorial](https://leafletjs.com/examples/quick-start/)
  - [Leaflet mobile tutorial](https://leafletjs.com/examples/mobile/)
  - [Leaflet custom markers tutorial](https://leafletjs.com/examples/)

- Input Framework: [Formik](https://formik.org/docs/overview)

  - [Formik tutorial](https://formik.org/docs/tutorial)

- Input Validation: [Yup](https://github.com/jquense/yup)

- REST API: [OpenAPI 3.0](https://swagger.io/docs/specification/about/)

  - [API Primer](https://restfulapi.net/)
  - [API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

### Design philosophy

- [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
