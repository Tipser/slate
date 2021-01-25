#!/bin/bash
mkdir -p build
cp -R changelog/resources/* build
cat changelog/tipser-elements/CHANGELOG.md | node changelog/scripts/changelog-compiler.js > build/changelog.html
