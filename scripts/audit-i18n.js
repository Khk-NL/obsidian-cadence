'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '..', 'main.js'), 'utf8');
const start = source.indexOf('function createI18n(');
const end = source.indexOf('function currentObsidianLocale(', start);
if (start < 0 || end < 0) throw new Error('Cannot locate localization function');
const createI18n = vm.runInNewContext(`${source.slice(start, end)}; createI18n`);
const translate = createI18n('zh-CN', 'en').translateText;

const candidates = new Map();
const patterns = [
  /\btext:\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\.set(?:Name|Desc|Placeholder|ButtonText)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\b(?:placeholder|title):\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\b(?:label|plural|desc):\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\.title\s*=\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /new CadenceNotice\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\.set(?:Text|Tooltip|Title|Value)\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
  /\btext:\s*(`(?:\\.|[^`\\])*`)/g,
  /\.setText\(\s*(`(?:\\.|[^`\\])*`)/g,
  /uiText\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g,
];
for (const pattern of patterns) {
  for (const match of source.matchAll(pattern)) {
    let value;
    try { value = vm.runInNewContext(match[1]); } catch (_) { continue; }
    if (typeof value !== 'string' || !/[A-Za-z]{2}/.test(value)) continue;
    const line = source.slice(0, match.index).split('\n').length;
    if (!candidates.has(value)) candidates.set(value, line);
  }
}
const untranslated = [...candidates].filter(([value]) => translate(value) === value);
for (const [value, line] of untranslated) console.log(`${line}: ${value}`);
console.log(`Untranslated: ${untranslated.length}/${candidates.size}`);
