import fs from 'node:fs';
import path from 'node:path';

const list = [
  'between-horizontal-end',
  'between-horizontal-start',
  'between-vertical-end',
  'between-vertical-start',
  'bot-check',
  'bot-message-square',
  'bot-minus',
  'bot-off',
  'bot-plus',
  'bot-x',
  'bot',
  'bus',
  'car',
  'funnel-minus',
  'funnel-plus',
  'funnel-x',
  'funnel'
];

for (const name of list) {
  const p = path.resolve('public/assets/icons', 'iconix_' + name + '.svg');
  if (!fs.existsSync(p)) {
    console.log(`[MISSING] ${name}`);
  } else {
    const raw = fs.readFileSync(p, 'utf-8');
    const has24 = raw.includes('width="24"') && raw.includes('height="24"');
    const hasViewBox = raw.includes('viewBox="0 0 24 24"');
    console.log(`[OK] ${name} (24x24: ${has24}, viewBox: ${hasViewBox})`);
  }
}
