import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';

const GEOMETRIC_TAGS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);

interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  area: number;
}

function getPathBBox(d: string): BBox | null {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const cmdRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match: RegExpExecArray | null;
  let curX = 0;
  let curY = 0;

  while ((match = cmdRegex.exec(d)) !== null) {
    const cmd = match[1];
    const isRel = cmd === cmd.toLowerCase();
    const c = cmd.toUpperCase();
    const rawArgs = match[2].trim().match(/-?[\d.]+(?:e-?\d+)?/g);
    const args = rawArgs ? rawArgs.map(Number) : [];

    if (c === 'H') {
      for (const val of args) {
        curX = isRel ? curX + val : val;
        minX = Math.min(minX, curX);
        maxX = Math.max(maxX, curX);
      }
    } else if (c === 'V') {
      for (const val of args) {
        curY = isRel ? curY + val : val;
        minY = Math.min(minY, curY);
        maxY = Math.max(maxY, curY);
      }
    } else if (c === 'M' || c === 'L' || c === 'T') {
      for (let i = 0; i < args.length; i += 2) {
        curX = isRel ? curX + args[i] : args[i];
        curY = isRel ? curY + args[i + 1] : args[i + 1];
        minX = Math.min(minX, curX);
        maxX = Math.max(maxX, curX);
        minY = Math.min(minY, curY);
        maxY = Math.max(maxY, curY);
      }
    } else if (c === 'C') {
      for (let i = 0; i < args.length; i += 6) {
        for (let k = 0; k < 6; k += 2) {
          const x = isRel ? curX + args[i + k] : args[i + k];
          const y = isRel ? curY + args[i + k + 1] : args[i + k + 1];
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
        curX = isRel ? curX + args[i + 4] : args[i + 4];
        curY = isRel ? curY + args[i + 5] : args[i + 5];
      }
    } else if (c === 'S' || c === 'Q') {
      for (let i = 0; i < args.length; i += 4) {
        for (let k = 0; k < 4; k += 2) {
          const x = isRel ? curX + args[i + k] : args[i + k];
          const y = isRel ? curY + args[i + k + 1] : args[i + k + 1];
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
        curX = isRel ? curX + args[i + 2] : args[i + 2];
        curY = isRel ? curY + args[i + 3] : args[i + 3];
      }
    } else if (c === 'A') {
      for (let i = 0; i < args.length; i += 7) {
        curX = isRel ? curX + args[i + 5] : args[i + 5];
        curY = isRel ? curY + args[i + 6] : args[i + 6];
        minX = Math.min(minX, curX);
        maxX = Math.max(maxX, curX);
        minY = Math.min(minY, curY);
        maxY = Math.max(maxY, curY);
      }
    }
  }

  if (minX === Infinity || minY === Infinity) return null;
  const width = Math.max(0, maxX - minX);
  const height = Math.max(0, maxY - minY);
  return { minX, minY, maxX, maxY, width, height, area: width * height };
}

function getElementBBox(el: Element): BBox | null {
  const tag = el.tagName.toLowerCase();
  if (tag === 'circle') {
    const cx = parseFloat(el.getAttribute('cx') || '0');
    const cy = parseFloat(el.getAttribute('cy') || '0');
    const r = parseFloat(el.getAttribute('r') || '0');
    return { minX: cx - r, minY: cy - r, maxX: cx + r, maxY: cy + r, width: 2 * r, height: 2 * r, area: Math.PI * r * r };
  }
  if (tag === 'rect') {
    const x = parseFloat(el.getAttribute('x') || '0');
    const y = parseFloat(el.getAttribute('y') || '0');
    const w = parseFloat(el.getAttribute('width') || '0');
    const h = parseFloat(el.getAttribute('height') || '0');
    return { minX: x, minY: y, maxX: x + w, maxY: y + h, width: w, height: h, area: w * h };
  }
  if (tag === 'ellipse') {
    const cx = parseFloat(el.getAttribute('cx') || '0');
    const cy = parseFloat(el.getAttribute('cy') || '0');
    const rx = parseFloat(el.getAttribute('rx') || '0');
    const ry = parseFloat(el.getAttribute('ry') || '0');
    return { minX: cx - rx, minY: cy - ry, maxX: cx + rx, maxY: cy + ry, width: 2 * rx, height: 2 * ry, area: Math.PI * rx * ry };
  }
  if (tag === 'line') {
    const x1 = parseFloat(el.getAttribute('x1') || '0');
    const y1 = parseFloat(el.getAttribute('y1') || '0');
    const x2 = parseFloat(el.getAttribute('x2') || '0');
    const y2 = parseFloat(el.getAttribute('y2') || '0');
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY, area: 0 };
  }
  if (tag === 'path') {
    return getPathBBox(el.getAttribute('d') || '');
  }
  return null;
}

function isBBoxInside(inner: BBox | null, outer: BBox | null, margin = 0.5): boolean {
  if (!inner || !outer) return false;
  return (
    inner.minX >= outer.minX - margin &&
    inner.maxX <= outer.maxX + margin &&
    inner.minY >= outer.minY - margin &&
    inner.maxY <= outer.maxY + margin
  );
}

function isTrulyClosedPathString(d: string): boolean {
  if (!d) return false;
  const subpaths = d.trim().split(/(?=[Mm])/).filter(Boolean);
  if (subpaths.length === 0) return false;
  // If ANY subpath does not have Z or z, it contains open stroke segments.
  // Filling such paths with stroke="none" deletes the open strokes (like anchor stem)
  // or creates ugly blob fills (like ampersand).
  return subpaths.every((sp) => /[zZ]/.test(sp));
}

function isLikelyClosedPath(el: Element): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === 'circle' || tag === 'rect' || tag === 'ellipse' || tag === 'polygon') {
    return true;
  }
  if (tag === 'path') {
    return isTrulyClosedPathString(el.getAttribute('d') || '');
  }
  return false;
}

function hashId(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function sanitizeGeometryAttrs(el: Element): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i];
    const name = attr.name;
    if (
      name === 'stroke' ||
      name === 'stroke-width' ||
      name === 'fill' ||
      name === 'fill-opacity' ||
      name === 'stroke-opacity' ||
      name === 'opacity' ||
      name.startsWith('data-')
    ) {
      continue;
    }
    attrs[name] = attr.value;
  }
  return attrs;
}

function serializeAttrs(attrs: Record<string, string>): string {
  return Object.entries(attrs)
    .map(([k, v]) => `${k}="${v.replace(/"/g, '&quot;')}"`)
    .join(' ');
}

interface ParsedShape {
  tag: string;
  attrs: Record<string, string>;
  role: 'base' | 'accent';
  isCutout: boolean;
  isClosed: boolean;
  isDot: boolean;
  isFilledOnly: boolean;
}

function isFigmaFrameBackgroundRect(el: Element): boolean {
  if (el.tagName.toLowerCase() !== 'rect' || el.hasAttribute('data-duotone')) {
    return false;
  }
  const w = el.getAttribute('width');
  const h = el.getAttribute('height');
  const x = el.getAttribute('x') || '0';
  const y = el.getAttribute('y') || '0';
  const hasStroke = el.hasAttribute('stroke') && el.getAttribute('stroke') !== 'none';
  const rx = el.getAttribute('rx');
  const isFullCanvas = (w === '24' || w === '100%') && (h === '24' || h === '100%') && x === '0' && y === '0';
  return isFullCanvas && !hasStroke && !rx;
}

function parseIconShapesFallback(rawSvg: string): { viewBox: string; shapes: ParsedShape[] } {
  const vbMatch = rawSvg.match(/viewBox="([^"]+)"/i);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';
  const tagMatches = rawSvg.match(/<(path|circle|rect|line|polyline|polygon|ellipse)[^>]*>/gi) || [];

  const rawElements = tagMatches.map((t) => {
    const tag = t.match(/<([a-z]+)/i)![1].toLowerCase();
    const attrs: Record<string, string> = {};
    const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
    let m: RegExpExecArray | null;
    while ((m = attrRegex.exec(t)) !== null) {
      attrs[m[1]] = m[2];
    }
    const isClosed = tag === 'circle' || tag === 'rect' || tag === 'ellipse' || tag === 'polygon' || (tag === 'path' && isTrulyClosedPathString(attrs.d || ''));
    let bbox: BBox | null = null;
    if (tag === 'circle') {
      const cx = parseFloat(attrs.cx || '0'), cy = parseFloat(attrs.cy || '0'), r = parseFloat(attrs.r || '0');
      bbox = { minX: cx - r, minY: cy - r, maxX: cx + r, maxY: cy + r, width: 2 * r, height: 2 * r, area: Math.PI * r * r };
    } else if (tag === 'rect') {
      const x = parseFloat(attrs.x || '0'), y = parseFloat(attrs.y || '0'), w = parseFloat(attrs.width || '0'), h = parseFloat(attrs.height || '0');
      bbox = { minX: x, minY: y, maxX: x + w, maxY: y + h, width: w, height: h, area: w * h };
    } else if (tag === 'path') {
      bbox = getPathBBox(attrs.d || '');
    }
    return { tag, attrs, isClosed, bbox };
  }).filter((e) => !(e.tag === 'rect' && (e.attrs.width === '24' || e.attrs.width === '100%') && !e.attrs.stroke));

  const hasExplicitRoles = rawElements.some((el) => 'data-duotone' in el.attrs);
  const closedShapes = rawElements.filter((e) => e.isClosed && e.bbox && e.bbox.area > 0);
  let container = closedShapes.length > 0
    ? closedShapes.reduce((max, cur) => (cur.bbox!.area > max.bbox!.area ? cur : max), closedShapes[0])
    : null;

  // If container is just a small dot while there is a much larger frame (e.g. monitor-dot where monitor has a cut)
  if (container && container.bbox && container.bbox.area < 50) {
    const largeFrame = rawElements.find(
      (item) => item.bbox && item.bbox.area > 120 && item.bbox.width >= 12 && item.bbox.height >= 10
    );
    if (largeFrame) {
      container = largeFrame;
    }
  }

  const shapes: ParsedShape[] = rawElements.map((el, index) => {
    const { tag, attrs, isClosed, bbox } = el;
    const isDot = attrs['data-dot'] === 'true';
    const rawFill = attrs.fill;
    const rawStroke = attrs.stroke;
    const isFilledOnly = !hasExplicitRoles && Boolean(rawFill && rawFill !== 'none') && (!rawStroke || rawStroke === 'none');

    let role: 'base' | 'accent' = 'accent';
    if (hasExplicitRoles) {
      role = attrs['data-duotone'] === 'base' ? 'base' : 'accent';
    } else if (container) {
      role = el === container ? 'base' : 'accent';
    } else {
      role = rawElements.length >= 2 && index === 0 ? 'base' : 'accent';
    }

    const explicitCutout = attrs['data-cutout'];
    let isCutout = false;
    if (explicitCutout === 'true') {
      isCutout = true;
    } else if (explicitCutout === 'false') {
      isCutout = false;
    } else if (!hasExplicitRoles && container && el !== container && container.bbox && bbox) {
      if (isBBoxInside(bbox, container.bbox)) {
        if (!isClosed || bbox.area < 0.35 * container.bbox.area) {
          isCutout = true;
        }
      }
    }

    const cleanAttrs: Record<string, string> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (
        k === 'stroke' ||
        k === 'stroke-width' ||
        k === 'fill' ||
        k === 'fill-opacity' ||
        k === 'stroke-opacity' ||
        k === 'opacity' ||
        k.startsWith('data-')
      ) {
        continue;
      }
      cleanAttrs[k] = v;
    }

    return {
      tag,
      attrs: cleanAttrs,
      role,
      isCutout,
      isClosed,
      isDot,
      isFilledOnly,
    };
  });

  return { viewBox, shapes };
}

function parseIconShapes(rawSvg: string): { viewBox: string; shapes: ParsedShape[] } {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return parseIconShapesFallback(rawSvg);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  if (!svgEl) {
    return parseIconShapesFallback(rawSvg);
  }

  const viewBox = svgEl.getAttribute('viewBox') || '0 0 24 24';
  const rawElements: Element[] = [];

  const walk = (node: Element) => {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const tag = child.tagName.toLowerCase();
      if (GEOMETRIC_TAGS.has(tag)) {
        if (!isFigmaFrameBackgroundRect(child)) {
          rawElements.push(child);
        }
      } else if (tag === 'g') {
        walk(child);
      }
    }
  };
  walk(svgEl);

  const hasExplicitRoles = rawElements.some((el) => el.hasAttribute('data-duotone'));
  const elementInfos = rawElements.map((el, index) => {
    const isClosed = isLikelyClosedPath(el);
    const bbox = getElementBBox(el);
    return { el, index, isClosed, bbox };
  });

  // Find container shape (largest closed shape) for inner cutout detection
  const closedContainers = elementInfos.filter((item) => item.isClosed && item.bbox && item.bbox.area > 0);
  let container = closedContainers.length > 0
    ? closedContainers.reduce((max, cur) => (cur.bbox!.area > max.bbox!.area ? cur : max), closedContainers[0])
    : null;

  // If container is just a small dot while there is a much larger frame (e.g. monitor-dot where monitor has a cut)
  if (container && container.bbox && container.bbox.area < 50) {
    const largeFrame = elementInfos.find(
      (item) => item.bbox && item.bbox.area > 120 && item.bbox.width >= 12 && item.bbox.height >= 10
    );
    if (largeFrame) {
      container = largeFrame;
    }
  }

  const shapes: ParsedShape[] = elementInfos.map(({ el, index, isClosed, bbox }) => {
    const tag = el.tagName.toLowerCase();
    const isDot = el.getAttribute('data-dot') === 'true';
    const rawFill = el.getAttribute('fill');
    const rawStroke = el.getAttribute('stroke');
    const isFilledOnly =
      !hasExplicitRoles &&
      Boolean(rawFill && rawFill !== 'none') &&
      (!rawStroke || rawStroke === 'none');

    let role: 'base' | 'accent' = 'accent';
    if (hasExplicitRoles) {
      role = el.getAttribute('data-duotone') === 'base' ? 'base' : 'accent';
    } else if (container) {
      role = container.index === index ? 'base' : 'accent';
    } else {
      // Multi-stroke icon with no closed shapes: assign first path as base so Dualtone uses both colors
      role = rawElements.length >= 2 && index === 0 ? 'base' : 'accent';
    }

    const explicitCutout = el.getAttribute('data-cutout');
    let isCutout = false;
    if (explicitCutout === 'true') {
      isCutout = true;
    } else if (explicitCutout === 'false') {
      isCutout = false;
    } else if (!hasExplicitRoles && container && container.index !== index && container.bbox && bbox) {
      // Automatic inference: element must be geometrically inside the container
      if (isBBoxInside(bbox, container.bbox)) {
        // If it's a closed shape, it is only a cutout if it's small (e.g. hole/dot < 35% container area)
        if (!isClosed || bbox.area < 0.35 * container.bbox.area) {
          isCutout = true;
        }
      }
    }

    return {
      tag,
      attrs: sanitizeGeometryAttrs(el),
      role,
      isCutout,
      isClosed,
      isDot,
      isFilledOnly,
    };
  });

  return { viewBox, shapes };
}

export function isLightHexColor(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

export function buildStyledSvg(
  rawSvg: string,
  style: IconStyleVariant,
  settings: IconSettings,
  options?: { uniqueSuffix?: string; overrideSize?: number }
): string {
  const { viewBox, shapes } = parseIconShapes(rawSvg);
  const size = options?.overrideSize ?? settings.size;
  const stroke = Number(settings.strokeWidth.toFixed(2));
  const primary = settings.primaryColor;
  const secondary = settings.secondaryColor;
  const opacity = Number(settings.duotoneOpacity.toFixed(2));

  if (shapes.length === 0) {
    return rawSvg;
  }

  const hasBaseShape = shapes.some((s) => s.role === 'base' && s.isClosed && !s.isFilledOnly);
  const cutoutShapes = shapes.filter((s) => s.isCutout);
  const needsMask = style === 'solid' && hasBaseShape && cutoutShapes.length > 0;
  const maskId = `ix-mask-${hashId(rawSvg)}-${options?.uniqueSuffix ?? 'export'}`;

  const parts: string[] = [];

  if (needsMask) {
    const maskInner = cutoutShapes
      .map((s) => {
        const baseAttrs = serializeAttrs(s.attrs);
        if (s.isDot || s.isClosed) {
          return `<${s.tag} ${baseAttrs} fill="black" stroke="black" stroke-width="${stroke}" />`;
        }
        return `<${s.tag} ${baseAttrs} fill="none" stroke="black" stroke-width="${Math.max(1.75, stroke)}" stroke-linecap="round" stroke-linejoin="round" />`;
      })
      .join('');
    parts.push(`<defs><mask id="${maskId}"><rect width="24" height="24" fill="white" />${maskInner}</mask></defs>`);
  }

  for (const s of shapes) {
    const baseAttrs = serializeAttrs(s.attrs);

    if (style === 'linear') {
      if (s.isDot || s.isFilledOnly) {
        parts.push(`<${s.tag} ${baseAttrs} fill="${primary}" stroke="none" />`);
      } else {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="none" stroke="${primary}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
        );
      }
      continue;
    }

    if (style === 'line-duotone') {
      if (s.role === 'base') {
        if (s.isDot || s.isFilledOnly) {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="${secondary}" fill-opacity="${opacity}" stroke="none" />`
          );
        } else {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="none" stroke="${secondary}" stroke-opacity="${opacity}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
          );
        }
      } else {
        if (s.isDot || s.isFilledOnly) {
          parts.push(`<${s.tag} ${baseAttrs} fill="${primary}" stroke="none" />`);
        } else {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="none" stroke="${primary}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
          );
        }
      }
      continue;
    }

    if (style === 'solid') {
      if (s.isCutout && hasBaseShape) {
        // Rendered inside the mask to carve negative space
        continue;
      }

      if (s.role === 'base' && s.isClosed && !s.isFilledOnly) {
        const maskAttr = needsMask ? ` mask="url(#${maskId})"` : '';
        parts.push(
          `<${s.tag} ${baseAttrs} fill="${primary}" stroke="${primary}" stroke-width="${stroke}" stroke-linejoin="round"${maskAttr} />`
        );
      } else if (s.isClosed) {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="${primary}" stroke="${primary}" stroke-width="${stroke}" stroke-linejoin="round" />`
        );
      } else {
        const boldStroke = Math.min(3.5, Number((stroke + 0.65).toFixed(2)));
        parts.push(
          `<${s.tag} ${baseAttrs} fill="none" stroke="${primary}" stroke-width="${boldStroke}" stroke-linecap="round" stroke-linejoin="round" />`
        );
      }
      continue;
    }

    if (style === 'duotone') {
      if (s.role === 'base') {
        if (s.isClosed) {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="${secondary}" fill-opacity="${opacity}" stroke="none" />`
          );
        } else {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="none" stroke="${secondary}" stroke-opacity="${opacity}" stroke-width="${Math.max(1.75, stroke)}" stroke-linecap="round" stroke-linejoin="round" />`
          );
        }
      } else {
        if (s.isClosed) {
          parts.push(`<${s.tag} ${baseAttrs} fill="${primary}" stroke="none" />`);
        } else {
          parts.push(
            `<${s.tag} ${baseAttrs} fill="none" stroke="${primary}" stroke-width="${Math.max(1.5, stroke)}" stroke-linecap="round" stroke-linejoin="round" />`
          );
        }
      }
      continue;
    }

    // duotone-linear
    if (s.role === 'base') {
      if (s.isFilledOnly) {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="${secondary}" fill-opacity="${opacity}" stroke="none" />`
        );
      } else if (s.isClosed) {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="${secondary}" fill-opacity="${opacity}" stroke="${primary}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
        );
      } else {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="none" stroke="${secondary}" stroke-opacity="${opacity}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
        );
      }
    } else {
      if (s.isDot || s.isFilledOnly) {
        parts.push(`<${s.tag} ${baseAttrs} fill="${primary}" stroke="none" />`);
      } else {
        parts.push(
          `<${s.tag} ${baseAttrs} fill="none" stroke="${primary}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" />`
        );
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none">${parts.join('')}</svg>`;
}

export function formatPrettySvg(svgString: string): string {
  return svgString
    .replace(/></g, '>\n  <')
    .replace(/\n  <\/svg>/g, '\n</svg>')
    .replace(/<defs>/g, '<defs>\n    ')
    .replace(/<\/defs>/g, '\n  </defs>');
}

export function toPascalCase(name: string): string {
  return (
    name
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Icon'
  );
}

/**
 * Copies SVG markup to the system clipboard in both 'text/html' and 'text/plain' formats.
 * Writing 'text/html' allows Figma (and other vector/design software) to detect the SVG markup
 * and paste it directly as native, editable vector nodes/layers instead of plain text strings.
 */
export async function copySvgToClipboard(svgString: string): Promise<boolean> {
  const cleanSvg = svgString.trim();

  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    try {
      const types: Record<string, Blob> = {
        'text/plain': new Blob([cleanSvg], { type: 'text/plain' }),
        'text/html': new Blob([cleanSvg], { type: 'text/html' }),
      };

      try {
        if ('supports' in ClipboardItem && (ClipboardItem as any).supports('image/svg+xml')) {
          types['image/svg+xml'] = new Blob([cleanSvg], { type: 'image/svg+xml' });
        }
      } catch {}

      const item = new ClipboardItem(types);
      await navigator.clipboard.write([item]);
      return true;
    } catch {
      // Fallback below if multi-type ClipboardItem is not permitted
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(cleanSvg);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = cleanSvg;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
}

export function buildVueComponentCode(iconName: string, svgString: string): string {
  const componentName = toPascalCase(iconName);
  const formattedSvg = formatPrettySvg(svgString).replace(
    /<svg\s+/,
    '<svg\n    v-bind="$attrs"\n    '
  );
  return `<template>\n  ${formattedSvg}\n</template>\n\n<script setup lang="ts">\n// ${componentName}\n</script>`;
}

export function buildReactComponentCode(iconName: string, svgString: string): string {
  const componentName = toPascalCase(iconName);
  const jsxSvg = formatPrettySvg(svgString)
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/xmlns="[^"]*"\s*/g, '')
    .replace(/<svg\s+/, '<svg\n      {...props}\n      ');

  const indentedSvg = jsxSvg
    .split('\n')
    .map((line, idx) => (idx === 0 ? `    ${line}` : `    ${line}`))
    .join('\n');

  return `import type { SVGProps } from 'react';\n\nexport function ${componentName}(props: SVGProps<SVGSVGElement>) {\n  return (\n${indentedSvg}\n  );\n}`;
}

export async function svgToPngBlob(svgString: string, targetPx = 256): Promise<Blob> {
  let exportSvg = svgString.trim();
  if (!exportSvg.includes('xmlns=')) {
    exportSvg = exportSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  exportSvg = exportSvg
    .replace(/width="[^"]*"/, `width="${targetPx}"`)
    .replace(/height="[^"]*"/, `height="${targetPx}"`);

  // Convert SVG to Base64 data URL to avoid blob URL lifetime & tainted canvas issues in browsers
  const base64 =
    typeof window !== 'undefined'
      ? window.btoa(unescape(encodeURIComponent(exportSvg)))
      : Buffer.from(exportSvg).toString('base64');
  const dataUrl = `data:image/svg+xml;base64,${base64}`;

  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetPx;
        canvas.height = targetPx;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.clearRect(0, 0, targetPx, targetPx);
        ctx.drawImage(img, 0, 0, targetPx, targetPx);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            // Direct Base64 to Blob fallback if toBlob returns null
            try {
              const dataUri = canvas.toDataURL('image/png');
              const byteString = atob(dataUri.split(',')[1]);
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              resolve(new Blob([ab], { type: 'image/png' }));
            } catch (err) {
              reject(err);
            }
          }
        }, 'image/png');
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => {
      reject(new Error('Failed to rasterize SVG to PNG'));
    };
    img.src = dataUrl;
  });
}

export function validateIconsJson(data: unknown): { valid: boolean; icons: IconEntry[]; error?: string } {
  let list: unknown[] = [];
  if (Array.isArray(data)) {
    list = data;
  } else if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>).icons)) {
    list = (data as Record<string, unknown>).icons as unknown[];
  } else {
    return {
      valid: false,
      icons: [],
      error: 'Root JSON value must be an array of icon objects or an object with an "icons" array.',
    };
  }

  const parsed: IconEntry[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item || typeof item !== 'object') {
      return { valid: false, icons: [], error: `Item at index ${i} is not an object.` };
    }
    const obj = item as Record<string, unknown>;
    if (typeof obj.name !== 'string' || !obj.name.trim()) {
      return { valid: false, icons: [], error: `Item at index ${i} is missing a valid "name" string.` };
    }
    if (typeof obj.category !== 'string' || !obj.category.trim()) {
      return { valid: false, icons: [], error: `Item "${obj.name}" is missing a valid "category" string.` };
    }
    if (!Array.isArray(obj.tags)) {
      return { valid: false, icons: [], error: `Item "${obj.name}" must have a "tags" array.` };
    }
    if (typeof obj.svg !== 'string' || !obj.svg.includes('<svg')) {
      return { valid: false, icons: [], error: `Item "${obj.name}" is missing a valid "<svg>...</svg>" string.` };
    }

    parsed.push({
      name: obj.name.trim(),
      category: obj.category.trim(),
      tags: obj.tags.map((t) => String(t).trim()).filter(Boolean),
      svg: obj.svg.trim(),
    });
  }

  if (parsed.length === 0) {
    return { valid: false, icons: [], error: 'JSON array is empty.' };
  }

  return { valid: true, icons: parsed };
}

/**
 * Format total icon count into a rounded marketing tier (e.g. 88 -> "80+", 101 -> "100+", 1301 -> "1,300+")
 * - < 10: exact count (e.g. "9")
 * - 10..99: nearest 10 (e.g. 88 -> "80+")
 * - 100..999: nearest 100 (e.g. 101 -> "100+", 250 -> "200+")
 * - >= 1000: nearest 100 (e.g. 1001 -> "1,000+", 1301 -> "1,300+", 1311 -> "1,300+")
 */
export function formatIconMilestone(count: number): string {
  if (!count || count <= 0) return '0+';
  if (count < 10) return `${count}`;
  if (count < 100) {
    return `${Math.floor(count / 10) * 10}+`;
  }
  if (count < 1000) {
    return `${Math.floor(count / 100) * 100}+`;
  }
  const rounded = Math.floor(count / 100) * 100;
  return `${rounded.toLocaleString('en-US')}+`;
}
