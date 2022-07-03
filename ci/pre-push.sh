#!/bin/sh

# This hook is called with the following parameters:
#
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
#
# If pushing without using a named remote those arguments will be equal.
#
# Information about the commits which are being pushed is supplied as lines to
# the standard input in the form:
#
#   <local ref> <local sha1> <remote ref> <remote sha1>
#

remote="$1"
url="$2"

z40=0000000000000000000000000000000000000000

while read local_ref local_sha remote_ref remote_sha
do
	if [ "$local_sha" = $z40 ]
	then
		# Handle delete
		:
	else
		if [ "$remote_sha" = $z40 ]
		then
			# New branch, examine all commits
      files=(`git ls-tree --name-only --full-name -r $local_sha`)
		else
			# Update to existing branch, examine new commits
			files=(`git diff-tree --diff-filter=AM --no-commit-id --name-only -r $remote_sha $local_sha`)
		fi

    # filter in Js, JSX files
    onlyJSfiles=$(printf '%s\n' "${files[@]}" | sed -E '/js[x]{0,1}$/!d')

    # next lint is a wrapper for eslint. therefore, eslint is in ./node_modules
    npx eslint --ignore-pattern '!.lintstagedrc.js' --rule 'react/prop-types: error' $onlyJSfiles
	fi
done

exit 0
