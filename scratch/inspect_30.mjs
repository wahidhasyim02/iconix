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

for (const n of newOnes) {
  const filePath = path.resolve('public/assets/icons', 'iconix_' + n + '.svg');
  const content = fs.readFileSync(filePath, 'utf-8');
  // Check if it has a square bubble path (e.g. M2 22V6C2 3.79086... or H18C20.2091...)
  const isSquare = content.includes('C2 3.79086') || content.includes('H18C20.2091') || content.includes('H6C3.79086');
  console.log(`${n} -> isSquareBubble: ${isSquare}`);
}
