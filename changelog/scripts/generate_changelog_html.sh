#!/bin/bash
cp changelog/resources/github-markdown.css build
(echo "<html><head><link rel=\"stylesheet\" href=\"github-markdown.css\"></head><body class=\"markdown-body\">"; showdown makehtml -i changelog/tipser-elements/CHANGELOG.md -a; echo "</body><html>") > build/changelog.html
