const fs = require("fs");
const showdown = require('showdown');

const converter = new showdown.Converter();
const stdinBuffer = fs.readFileSync(0);
const changelogAsMarkdown = stdinBuffer.toString();
const RELEASE_REGEX = /([#]+ \[[a-zA-Z0-9.-]+].+)/g;
const HTML_START = '<html><head><link rel="stylesheet" href="changelog.css"></head><body>';
const HTML_END = '</body></html>';


const splitByRelease = changelogAsMarkdown.split(RELEASE_REGEX);
const [header, ...rest] = splitByRelease

console.log(HTML_START);
console.log(buildHeader(header));

[...Array(Math.ceil(rest.length / 2))].map(_ => rest.splice(0,2)).forEach((release) => {
  console.log(buildSection(release));
});

console.log(HTML_END);

function getVersionAndDate(text) {
  const [versionPart] = text.match(/\[([a-zA-Z0-9.-]+)]/g);
  const version = 'v' + versionPart.replace('[', '').replace(']', '').trim();
  const datePart = text.substring(text.lastIndexOf(versionPart) + versionPart.length, text.length).trim();
  const [date] = datePart.match(/\d+-\d+-\d+/g);
  return {version, date};
}

function getHtmlTag(tagName, className, content) {
  return `<${tagName} class="${className}">${content}</${tagName}>`
}

function getDivWithClass(className, content) {
  return getHtmlTag('div', className, content);
}

function buildDivSection(left, right) {
  const leftDiv = getDivWithClass('left', left);
  const rightDiv = getDivWithClass('right', right);
  return getDivWithClass('section', leftDiv + rightDiv);
}

function buildSection([releaseHeader, releaseChangelog]) {
  const left = buildLeftSection(releaseHeader);
  const right = buildRightSection(releaseChangelog)
  return buildDivSection(left, right);
}

function buildLeftSection(releaseHeader) {
  const {version, date} = getVersionAndDate(releaseHeader);
  const versionPart = getHtmlTag('h3', 'version', version);
  const datePart = getHtmlTag('h4', 'date', date);
  return versionPart + datePart;
}

function buildRightSection(releaseChangelog) {
  const rightContent = converter.makeHtml(releaseChangelog)
    .replace(/<h1/g, '<h1 class="change-title"')
    .replace(/<h2/g, '<h2 class="change-title"')
    .replace(/<h3/g, '<h3 class="change-title"')
    .replace(/<ul/g, '<ul class="change-description"');
  return getDivWithClass('right-content', rightContent);
}

function buildHeader(headerMarkdown) {
  const left = '<img src="tipser-logo-berry.png" alt="tipser logo" class="logo" />'
  const right = converter.makeHtml(headerMarkdown)
    .replace(/<h1/g, '<h1 class="header-title"')
    .replace(/<p/g, '<p class="header-text"')
  const rightWithWrapper = getDivWithClass('header-container', right);
  return buildDivSection(left, rightWithWrapper);
}
