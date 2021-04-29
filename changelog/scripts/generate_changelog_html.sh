#!/bin/bash
mkdir -p build
cp -R changelog/resources/* build
node changelog/scripts/changelog-compiler.js > build/changelog.html
