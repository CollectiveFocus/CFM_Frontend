#!/bin/sh

package=''

which prettier     &>/dev/null || package="$package prettier"
which svgo         &>/dev/null || package="$package svgo"
which only-allow   &>/dev/null || package="$package only-allow"
which lint-staged  &>/dev/null || package="$package lint-staged"

[ -z "$package" ] || npm install --global $package
