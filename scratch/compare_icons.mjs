import fs from 'node:fs';
import path from 'node:path';

const newOnes = [
  'message-circle-1',
  'message-circle-check-1',
  'message-circle-check-right-1',
  'message-circle-code-1',
  'message-circle-code-right-1',
  'message-circle-dashed-1',
  'message-circle-dashed-check-1',
  'message-circle-dashed-check-right-1',
  'message-circle-dashed-right-1',
  'message-circle-exclamation-point-1',
  'message-circle-exclamation-point-right-1',
  'message-circle-heart-1',
  'message-circle-heart-right-1',
  'message-circle-more-1',
  'message-circle-more-right-1',
  'message-circle-off-1',
  'message-circle-off-right-1',
  'message-circle-plus-1',
  'message-circle-plus-right-1',
  'message-circle-question-mark-1',
  'message-circle-question-mark-right-1',
  'message-circle-reply-1',
  'message-circle-reply-right-1',
  'message-circle-right-1',
  'message-circle-text-1',
  'message-circle-text-right-1',
  'message-circle-x-1',
  'message-circle-x-right-1',
  'messages-circle-1',
  'messages-circle-right-1'
];

function normalize(svg) {
  return svg
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('=== Comparing 30 message-circle-*-1 icons against their base ===');
let exactMatches = 0;
let diffMatches = 0;

for (const n of newOnes) {
  const base = n.replace(/-1$/, '');
  const newSvgPath = path.resolve('public/assets/icons', 'iconix_' + n + '.svg');
  const oldSvgPath = path.resolve('public/assets/icons', 'iconix_' + base + '.svg');

  if (!fs.existsSync(oldSvgPath)) {
    console.log(`[NOT FOUND] Base icon for ${n} does not exist at ${oldSvgPath}`);
    continue;
  }

  const newRaw = fs.readFileSync(newSvgPath, 'utf-8');
  const oldRaw = fs.readFileSync(oldSvgPath, 'utf-8');

  const normNew = normalize(newRaw);
  const normOld = normalize(oldRaw);

  if (normNew === normOld) {
    exactMatches++;
    console.log(`[EXACT MATCH] ${n} === ${base}`);
  } else {
    diffMatches++;
    console.log(`[DIFFERENT] ${n} vs ${base}`);
    console.log(`   OLD: ${normOld.slice(0, 100)}...`);
    console.log(`   NEW: ${normNew.slice(0, 100)}...`);
  }
}

console.log(`\nSummary: exact matches = ${exactMatches}, different = ${diffMatches}`);
