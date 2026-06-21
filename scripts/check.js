#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

function rel(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function existsSitePath(value) {
  const clean = value
    .replace(/^\/+/, '')
    .replace(/[?#].*$/, '')
    .trim();

  if (!clean || clean === '.') return true;
  const target = path.join(root, clean);
  return fs.existsSync(target);
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|data:|blob:|javascript:|#)/i.test(value);
}

function checkJson(file) {
  try {
    JSON.parse(read(file).replace(/^\uFEFF/, ''));
  } catch (error) {
    fail(`${file}: JSON invalide (${error.message})`);
  }
}

function checkJs(file) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    fail(`${file}: JavaScript invalide\n${result.stderr.trim()}`);
  }
}

function checkHtmlLinks(file) {
  const html = read(file);
  const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  let match;

  while ((match = attrPattern.exec(html))) {
    const value = match[1];
    if (isExternal(value)) continue;
    if (!existsSitePath(value)) fail(`${file}: fichier local introuvable -> ${value}`);
  }
}

function checkCssUrls(file) {
  const css = read(file);
  const urlPattern = /url\(([^)]+)\)/gi;
  let match;

  while ((match = urlPattern.exec(css))) {
    const value = match[1].replace(/^["']|["']$/g, '').trim();
    if (!value || isExternal(value)) continue;
    const fromCss = path.resolve(root, path.dirname(file), value).replace(/[?#].*$/, '');
    if (!fs.existsSync(fromCss)) fail(`${file}: ressource CSS introuvable -> ${value}`);
  }
}

function iconNames() {
  const source = read('assets/icons/nq-icons.js');
  const objectMatch = source.match(/const paths=\{([\s\S]*?)\};\s*const aliases=/);
  if (!objectMatch) {
    warn('Impossible de lire la liste centrale des icones.');
    return new Set();
  }

  const names = new Set();
  const keyPattern = /(?:^|,)\s*(?:'([^']+)'|"([^"]+)"|([a-zA-Z0-9_-]+))\s*:/g;
  let match;
  while ((match = keyPattern.exec(objectMatch[1]))) {
    names.add(match[1] || match[2] || match[3]);
  }

  const aliasMatch = source.match(/const aliases=\{([\s\S]*?)\};\s*function svg/);
  if (aliasMatch) {
    let alias;
    while ((alias = keyPattern.exec(aliasMatch[1]))) {
      names.add(alias[1] || alias[2] || alias[3]);
    }
  }
  return names;
}

function checkIcons(files) {
  const icons = iconNames();
  if (!icons.size) return;

  for (const file of files) {
    const html = read(file);
    const iconPattern = /data-icon=["']([^"']+)["']/g;
    let match;
    while ((match = iconPattern.exec(html))) {
      if (!icons.has(match[1])) fail(`${file}: icone inconnue -> ${match[1]}`);
    }
  }
}

function checkServiceWorkerShell() {
  const sw = read('sw.js');
  const shellMatch = sw.match(/const SHELL = \[([\s\S]*?)\];/);
  if (!shellMatch) {
    fail('sw.js: liste SHELL introuvable');
    return;
  }

  const urlPattern = /['"]([^'"]+)['"]/g;
  let match;
  while ((match = urlPattern.exec(shellMatch[1]))) {
    const value = match[1];
    if (!value.startsWith('/')) continue;
    if (!existsSitePath(value)) fail(`sw.js: ressource cache introuvable -> ${value}`);
  }

  if (!sw.includes("const OFFLINE_URL = '/offline.html';")) {
    fail('sw.js: OFFLINE_URL doit pointer vers /offline.html');
  }
}

function checkManifest() {
  const manifest = JSON.parse(read('manifest.json').replace(/^\uFEFF/, ''));
  if (manifest.name !== 'NoorQuran') warn('manifest.json: name devrait rester NoorQuran.');
  for (const icon of manifest.icons || []) {
    if (!existsSitePath(icon.src)) fail(`manifest.json: icone introuvable -> ${icon.src}`);
  }
  for (const shortcut of manifest.shortcuts || []) {
    if (!existsSitePath(shortcut.url)) fail(`manifest.json: raccourci introuvable -> ${shortcut.url}`);
  }
}

const htmlFiles = fs.readdirSync(root).filter(file => file.endsWith('.html'));
const jsFiles = [
  'sw.js',
  'assets/icons/nq-icons.js',
  ...fs.readdirSync(path.join(root, 'assets/js')).filter(file => file.endsWith('.js')).map(file => `assets/js/${file}`)
];
const cssFiles = fs.readdirSync(path.join(root, 'assets/css')).filter(file => file.endsWith('.css')).map(file => `assets/css/${file}`);

for (const file of ['manifest.json', 'vercel.json']) checkJson(file);
for (const file of jsFiles) checkJs(file);
for (const file of htmlFiles) checkHtmlLinks(file);
for (const file of cssFiles) checkCssUrls(file);
checkIcons(htmlFiles);
checkServiceWorkerShell();
checkManifest();

if (warnings.length) {
  console.log('Avertissements:');
  for (const message of warnings) console.log(`- ${message}`);
}

if (errors.length) {
  console.error('Echecs de verification:');
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Verification OK: ${htmlFiles.length} pages, ${jsFiles.length} scripts, ${cssFiles.length} feuilles CSS.`);
