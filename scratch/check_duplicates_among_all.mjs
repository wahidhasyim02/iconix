import fs from 'node:fs';
import path from 'node:path';

const svgDir = path.resolve('public/assets/icons');
const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

function normalize(svg) {
  return svg
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const map = new Map();
const duplicates = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(svgDir, file), 'utf-8');
  const norm = normalize(content);
  if (map.has(norm)) {
    duplicates.push({ file1: map.get(norm), file2: file });
  } else {
    map.set(norm, file);
  }
}

console.log(`Scanned ${files.length} SVGs.`);
console.log(`Found ${duplicates.length} exact geometric duplicates:`);
for (const d of duplicates) {
  console.log(` - ${d.file1} <==> ${d.file2}`);
}
