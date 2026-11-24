import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.resolve('public/assets/icons');
const dataIconsDir = path.resolve('data/icons');

// Helper to clean raw Figma SVG
function cleanSvg(raw) {
  let cleaned = raw
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();

  // If missing standard outer SVG attributes
  if (!cleaned.startsWith('<svg')) {
    cleaned = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n${cleaned}\n</svg>`;
  }
  return cleaned;
}

// Category mapping helper adhering strictly to public/admin/config.yml
function resolveCategory(iconName) {
  if (
    iconName.startsWith('message') ||
    iconName.startsWith('send') ||
    iconName === 'reply' ||
    iconName.startsWith('share') ||
    iconName.startsWith('mail') ||
    iconName.startsWith('phone')
  ) {
    return 'Communication & Social';
  }
  if (
    iconName.startsWith('play') ||
    iconName === 'pause' ||
    iconName === 'fast-forward' ||
    iconName.startsWith('skip-') ||
    iconName.startsWith('step-')
  ) {
    return 'Media & Audio';
  }
  if (iconName.startsWith('arrow') || iconName.startsWith('a-arrow-') || iconName.startsWith('refresh-')) return 'Arrows';
  if (iconName.startsWith('chevron') || iconName.startsWith('list-chevron')) return 'Navigation';
  if (iconName.startsWith('align') || iconName.startsWith('between-')) return 'Alignment';
  if (iconName.startsWith('alarm') || iconName.startsWith('clock') || iconName.startsWith('calendar')) return 'Time & Alarms';
  if (
    iconName.startsWith('bell') ||
    iconName === 'ambulance' ||
    iconName === 'siren' ||
    iconName.includes('exclamation-point') ||
    iconName.includes('question-mark')
  ) {
    return 'Emergency & Alerts';
  }
  if (
    ['plus', 'minus', 'x', 'check'].includes(iconName) ||
    iconName.startsWith('circle') ||
    iconName.startsWith('check') ||
    iconName.startsWith('triangle') ||
    iconName.startsWith('medal') ||
    iconName.startsWith('square-power')
  ) {
    return 'Shapes & Badges';
  }
  if (
    iconName.startsWith('save') ||
    iconName.startsWith('file') ||
    iconName.startsWith('folder')
  ) {
    return 'Files & Folders';
  }
  if (
    iconName.startsWith('pen') ||
    iconName.startsWith('pencil') ||
    iconName.includes('brush') ||
    iconName === 'highlighter'
  ) {
    return 'Design & Tools';
  }
  if (
    iconName.startsWith('monitor') ||
    iconName.startsWith('laptop') ||
    iconName.startsWith('bot') ||
    iconName.startsWith('tv') ||
    iconName.startsWith('tablet') ||
    iconName.startsWith('smartphone') ||
    iconName.startsWith('pc') ||
    iconName.startsWith('speaker') ||
    iconName.startsWith('air-') ||
    iconName.startsWith('airplay') ||
    iconName.startsWith('video') ||
    iconName.startsWith('camera') ||
    iconName === 'lens' ||
    iconName.startsWith('plug') ||
    iconName.startsWith('wifi') ||
    iconName.startsWith('power')
  ) {
    return 'Devices & Tech';
  }
  if (
    iconName.startsWith('shield') ||
    iconName.startsWith('lock') ||
    iconName.startsWith('key') ||
    iconName.startsWith('cctv') ||
    iconName === 'log-in' ||
    iconName === 'log-out'
  ) {
    return 'Security & System';
  }
  if (
    iconName.startsWith('mirror') ||
    iconName.startsWith('plane') ||
    iconName.startsWith('airlines') ||
    ['amphora', 'anchor', 'anvil', 'angle', 'aperture', 'blocks', 'bus', 'car'].includes(iconName)
  ) {
    return 'Objects & Geometry';
  }
  if (
    iconName.startsWith('code')
  ) {
    return 'Development & Code';
  }
  if (
    ['a-large-small', 'ampersand', 'ampersands', 'case-sensitive', 'case-lower', 'case-upper', 'line-height', 'text-initial', 'square-dashed-text', 'letter-spacing', 'whole-word'].includes(iconName) ||
    iconName.startsWith('case-') ||
    iconName.startsWith('list-indent') ||
    iconName.startsWith('text-align')
  ) {
    return 'Typography';
  }
  if (
    iconName.startsWith('chart-') ||
    iconName.startsWith('graph-') ||
    iconName.startsWith('speedometer-') ||
    ['kanban', 'gauge'].includes(iconName)
  ) {
    return 'E-Commerce & Finance';
  }
  if (['accessibility', 'activity', 'trash', 'trash-off'].includes(iconName)) {
    return 'Interface & Health';
  }
  if (iconName.startsWith('cloud') || iconName === 'apple' || iconName === 'sun' || iconName.startsWith('moon')) {
    return 'Weather & Nature';
  }
  if (
    iconName.startsWith('search') ||
    iconName.startsWith('bookmark') ||
    iconName.startsWith('funnel') ||
    iconName.startsWith('user') ||
    iconName.startsWith('house') ||
    iconName.startsWith('flag') ||
    ['group', 'heart', 'app-window', 'app-window-mac', 'download', 'upload', 'menu', 'bookmark', 'star'].includes(iconName)
  ) {
    return 'General UI';
  }
  return 'General UI';
}

// 1. Scan and normalize any iconix-*.svg to iconix_*.svg
for (const f of fs.readdirSync(assetsDir)) {
  if (f.startsWith('iconix-') && f.endsWith('.svg')) {
    const fixed = f.replace(/^iconix-/, 'iconix_');
    fs.renameSync(path.join(assetsDir, f), path.join(assetsDir, fixed));
  }
}
const svgFiles = fs.readdirSync(assetsDir).filter((f) => f.startsWith('iconix_') && f.endsWith('.svg'));
console.log(`Scanning ${svgFiles.length} SVG icons in ${assetsDir}...`);

let cleanedSvgCount = 0;
for (const file of svgFiles) {
  const filePath = path.join(assetsDir, file);
  const rawSvg = fs.readFileSync(filePath, 'utf8');
  const cleaned = cleanSvg(rawSvg);
  if (rawSvg !== cleaned) {
    fs.writeFileSync(filePath, cleaned + '\n', 'utf8');
    cleanedSvgCount++;
  }
}
if (cleanedSvgCount > 0) {
  console.log(`Cleaned ${cleanedSvgCount} SVGs in assets folder.`);
}

// 2. Sync all SVGs into data/icons/*.json
let createdCount = 0;
let updatedCount = 0;

for (const svgFile of svgFiles) {
  const iconName = svgFile.replace(/^iconix_/, '').replace(/\.svg$/, '');
  const jsonPath = path.join(dataIconsDir, `${iconName}.json`);
  const svgPath = path.join(assetsDir, svgFile);
  const cleanedSvg = cleanSvg(fs.readFileSync(svgPath, 'utf8'));

  let item;
  if (fs.existsSync(jsonPath)) {
    item = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let changed = false;

    // Harmonize legacy categories if invalid or outdated
    const legacyCategoryFixes = {
      Notifications: 'Time & Alarms',
      Layout: 'Alignment',
      Devices: 'Devices & Tech',
      General: 'Emergency & Alerts',
      Media: 'Devices & Tech',
    };
    if (legacyCategoryFixes[item.category]) {
      item.category = legacyCategoryFixes[item.category];
      changed = true;
    }

    const resolvedCat = resolveCategory(iconName);
    if (item.category !== resolvedCat) {
      item.category = resolvedCat;
      changed = true;
    }

    if (item.svg !== cleanedSvg) {
      item.svg = cleanedSvg;
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2) + '\n', 'utf8');
      updatedCount++;
    }
  } else {
    // Brand new icon definition
    const category = resolveCategory(iconName);
    const parts = iconName.split('-');
    const tagSet = new Set(['iconix', iconName, ...parts]);

    if (iconName.includes('plus')) tagSet.add('add');
    if (iconName.includes('minus')) tagSet.add('remove');

    item = {
      name: iconName,
      category,
      tags: Array.from(tagSet),
      svg: cleanedSvg,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2) + '\n', 'utf8');
    createdCount++;
    console.log(`✨ Created data/icons/${iconName}.json [${category}]`);
  }
}

console.log(`Sync status: ${createdCount} created, ${updatedCount} updated.`);
