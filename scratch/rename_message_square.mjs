import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.resolve('public/assets/icons');

// 1. Rename mapping for the 30 message-circle-*-1 icons to message-square-*
const renames = [
  ['iconix_message-circle-1.svg', 'iconix_message-square.svg'],
  ['iconix_message-circle-check-1.svg', 'iconix_message-square-check.svg'],
  ['iconix_message-circle-check-right-1.svg', 'iconix_message-square-check-right.svg'],
  ['iconix_message-circle-code-1.svg', 'iconix_message-square-code.svg'],
  ['iconix_message-circle-code-right-1.svg', 'iconix_message-square-code-right.svg'],
  ['iconix_message-circle-dashed-1.svg', 'iconix_message-square-dashed.svg'],
  ['iconix_message-circle-dashed-check-1.svg', 'iconix_message-square-dashed-check.svg'],
  ['iconix_message-circle-dashed-check-right-1.svg', 'iconix_message-square-dashed-check-right.svg'],
  ['iconix_message-circle-dashed-right-1.svg', 'iconix_message-square-dashed-right.svg'],
  ['iconix_message-circle-exclamation-point-1.svg', 'iconix_message-square-exclamation-point.svg'],
  ['iconix_message-circle-exclamation-point-right-1.svg', 'iconix_message-square-exclamation-point-right.svg'],
  ['iconix_message-circle-heart-1.svg', 'iconix_message-square-heart.svg'],
  ['iconix_message-circle-heart-right-1.svg', 'iconix_message-square-heart-right.svg'],
  ['iconix_message-circle-more-1.svg', 'iconix_message-square-more.svg'],
  ['iconix_message-circle-more-right-1.svg', 'iconix_message-square-more-right.svg'],
  ['iconix_message-circle-off-1.svg', 'iconix_message-square-off.svg'],
  ['iconix_message-circle-off-right-1.svg', 'iconix_message-square-off-right.svg'],
  ['iconix_message-circle-plus-1.svg', 'iconix_message-square-plus.svg'],
  ['iconix_message-circle-plus-right-1.svg', 'iconix_message-square-plus-right.svg'],
  ['iconix_message-circle-question-mark-1.svg', 'iconix_message-square-question-mark.svg'],
  ['iconix_message-circle-question-mark-right-1.svg', 'iconix_message-square-question-mark-right.svg'],
  ['iconix_message-circle-reply-1.svg', 'iconix_message-square-reply.svg'],
  ['iconix_message-circle-reply-right-1.svg', 'iconix_message-square-reply-right.svg'],
  ['iconix_message-circle-right-1.svg', 'iconix_message-square-right.svg'],
  ['iconix_message-circle-text-1.svg', 'iconix_message-square-text.svg'],
  ['iconix_message-circle-text-right-1.svg', 'iconix_message-square-text-right.svg'],
  ['iconix_message-circle-x-1.svg', 'iconix_message-square-x.svg'],
  ['iconix_message-circle-x-right-1.svg', 'iconix_message-square-x-right.svg'],
  ['iconix_messages-circle-1.svg', 'iconix_messages-square.svg'],
  ['iconix_messages-circle-right-1.svg', 'iconix_messages-square-right.svg']
];

for (const [oldName, newName] of renames) {
  const oldPath = path.join(assetsDir, oldName);
  const newPath = path.join(assetsDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`Already renamed or missing: ${oldName}`);
  }
}
