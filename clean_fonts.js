const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/fontFamily:\s*"'Anton',\s*sans-serif",?/g, '');
  content = content.replace(/fontFamily:\s*"'Work Sans',\s*sans-serif",?/g, '');
  content = content.replace(/fontFamily:\s*"'IBM Plex Mono',\s*monospace",?/g, '');
  content = content.replace(/style=\{\{\s*\}\}/g, '');
  content = content.replace(/,\s*\}/g, ' }');
  content = content.replace(/style=\{\{\s*color:\s*'#[A-Z0-9]+'\s*\}\}/ig, '');
  content = content.replace(/className="(.*?)"/g, (match, p1) => {
    // Add font-display where Anton was used
    if (content.includes("'Anton'")) {
      return match; // We don't auto-replace classNames cleanly this way, let's just leave it to default tailwind fonts.
    }
    return match;
  });
  fs.writeFileSync(file, content);
});
console.log('Cleaned up inline fonts!');
