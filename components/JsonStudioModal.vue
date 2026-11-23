<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="fixed inset-0 bg-black/65 backdrop-blur-xs"
      @click="$emit('close')"
    />
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manage icons.json"
      class="relative z-10 w-full max-w-2xl max-h-[88vh] bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1F2632] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-[#1D222B] flex items-center justify-between gap-4">
        <div>
          <h2 class="font-display text-base font-semibold text-slate-900 dark:text-[#F1F5F9]">
            icons.json Studio
          </h2>
          <p class="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
            Active library:
            <span class="font-mono tabular-nums text-slate-900 dark:text-[#E2E8F0]">
              {{ icons.length }}
            </span>
            icons
            {{ isCustomDataset ? ' (Custom imported JSON)' : ' (Built-in /public/icons.json)' }}
          </p>
        </div>

        <button
          type="button"
          @click="$emit('close')"
          aria-label="Close modal"
          class="p-1.5 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#171C24] cursor-pointer"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Navigation Tabs -->
      <div class="px-6 pt-3 border-b border-slate-200 dark:border-[#1D222B] flex items-center gap-6 text-xs font-medium overflow-x-auto">
        <button
          v-for="item in [
            { id: 'guide', label: 'How icons.json Works' },
            { id: 'import', label: 'Import JSON' },
            { id: 'add', label: 'Add Icon' },
            { id: 'embed', label: 'HTML Tag Usage' },
          ]"
          :key="item.id"
          type="button"
          @click="tab = item.id as 'guide' | 'import' | 'add' | 'embed'"
          class="pb-3 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          :class="tab === item.id
            ? 'border-teal-600 dark:border-[#2DD4BF] text-slate-900 dark:text-[#F1F5F9]'
            : 'border-transparent text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-[#CBD5E1]'"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
        <!-- Guide Tab -->
        <div v-if="tab === 'guide'" class="space-y-4">
          <div class="space-y-2 text-slate-700 dark:text-[#CBD5E1] leading-relaxed text-[13px]">
            <p>
              All icons are loaded from
              <code class="font-mono text-teal-700 dark:text-[#2DD4BF]">/public/icons.json</code> as an
              array of objects with 4 fields:
              <code class="font-mono font-semibold text-slate-900 dark:text-[#F1F5F9]">name</code>,
              <code class="font-mono font-semibold text-slate-900 dark:text-[#F1F5F9]">category</code>,
              <code class="font-mono font-semibold text-slate-900 dark:text-[#F1F5F9]">tags</code>, and
              <code class="font-mono font-semibold text-slate-900 dark:text-[#F1F5F9]">svg</code>.
            </p>
            <p class="text-slate-600 dark:text-[#94A3B8]">
              <strong>data-duotone is optional:</strong> plain Figma SVGs automatically infer their base and accent layers. Add
              <code class="font-mono text-teal-700 dark:text-[#2DD4BF]">data-duotone=&quot;base&quot;</code> or
              <code class="font-mono text-teal-700 dark:text-[#2DD4BF]">data-duotone=&quot;accent&quot;</code> only when you want exact manual control over which layer gets the secondary opacity tone.
            </p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-600 dark:text-[#94A3B8] font-medium">
                Format Example (icons.json)
              </span>
              <button
                type="button"
                @click="handleCopySchema"
                class="inline-flex items-center gap-1.5 text-slate-600 dark:text-[#94A3B8] hover:text-teal-600 dark:hover:text-[#2DD4BF] cursor-pointer"
              >
                <Check v-if="copiedSchema" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ copiedSchema ? 'Copied' : 'Copy snippet' }}</span>
              </button>
            </div>
            <pre class="p-3.5 rounded-xl bg-slate-900 dark:bg-[#090B0E] border border-slate-800 dark:border-[#1B212B] font-mono text-[11px] leading-relaxed text-slate-100 dark:text-[#CBD5E1] overflow-x-auto"><code>{{ SCHEMA_EXAMPLE }}</code></pre>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-[#1D222B]">
            <span class="text-xs text-slate-500 dark:text-[#64748B]">
              Export the active dataset anytime to replace <code class="font-mono">public/icons.json</code>.
            </span>
            <button
              type="button"
              @click="handleDownloadJson"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-xs font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors cursor-pointer"
            >
              <Download class="w-3.5 h-3.5" />
              <span>Download icons.json</span>
            </button>
          </div>
        </div>

        <!-- Import Tab -->
        <div v-if="tab === 'import'" class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
              Upload a local <code class="font-mono text-slate-900 dark:text-[#CBD5E1]">.json</code> file or paste JSON below to preview your own icon set immediately.
            </p>
            <div class="flex items-center gap-2">
              <input
                ref="fileInputRef"
                type="file"
                accept=".json,application/json"
                @change="handleFileUpload"
                class="hidden"
              />
              <button
                type="button"
                @click="fileInputRef?.click()"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#151A23] border border-slate-200 dark:border-[#252E3D] text-xs font-medium text-slate-800 dark:text-[#E2E8F0] hover:bg-slate-200 dark:hover:bg-[#1C2330] cursor-pointer"
              >
                <FileUp class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Upload .json File</span>
              </button>
            </div>
          </div>

          <textarea
            v-model="jsonInput"
            :placeholder="SCHEMA_EXAMPLE"
            rows="9"
            class="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1D222B] font-mono text-xs text-slate-900 dark:text-[#E2E8F0] placeholder-slate-400 dark:placeholder-[#475569] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70"
          />

          <p v-if="importError" class="text-xs text-red-600 dark:text-[#F87171]">{{ importError }}</p>

          <div class="flex items-center justify-between gap-3 pt-2">
            <button
              v-if="isCustomDataset"
              type="button"
              @click="handleRestore"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#12161E] border border-slate-200 dark:border-[#1F2632] text-xs text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] cursor-pointer"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span>Restore Built-in icons.json</span>
            </button>
            <span v-else />

            <button
              type="button"
              @click="handleImportText"
              :disabled="!jsonInput.trim()"
              class="px-4 py-2 rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-xs font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Load Pasted JSON
            </button>
          </div>
        </div>

        <!-- Add Icon Tab -->
        <form v-if="tab === 'add'" @submit.prevent="handleCreateIcon" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label class="space-y-1.5">
              <span class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                Icon Name
              </span>
              <input
                type="text"
                v-model="newName"
                placeholder="e.g. shield-check"
                class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1D222B] font-mono text-xs text-slate-900 dark:text-[#F1F5F9] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70"
              />
            </label>

            <label class="space-y-1.5">
              <span class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
                Category
              </span>
              <input
                type="text"
                v-model="newCategory"
                placeholder="e.g. Security"
                class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-900 dark:text-[#F1F5F9] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70"
              />
            </label>
          </div>

          <label class="block space-y-1.5">
            <span class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
              Tags (comma-separated)
            </span>
            <input
              type="text"
              v-model="newTags"
              placeholder="badge, verify, check"
              class="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-900 dark:text-[#F1F5F9] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70"
            />
          </label>

          <label class="block space-y-1.5">
            <span class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
              SVG Markup (Paste directly from Figma — 24×24 viewBox)
            </span>
            <textarea
              v-model="newSvg"
              rows="4"
              class="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1D222B] font-mono text-[11px] text-slate-900 dark:text-[#E2E8F0] focus:outline-none focus:border-teal-500 dark:focus:border-[#2DD4BF]/70"
            />
          </label>

          <div class="space-y-2">
            <span class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
              Live 5-Variant Preview
            </span>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div
                v-for="v in [
                  { id: 'duotone', label: 'Dualtone' },
                  { id: 'duotone-linear', label: 'Dualtone Linear' },
                  { id: 'line-duotone', label: 'Line Duotone' },
                  { id: 'linear', label: 'Linear' },
                  { id: 'solid', label: 'Solid' },
                ]"
                :key="v.id"
                class="py-3 px-2 rounded-lg bg-slate-50 dark:bg-[#090B0E] border border-slate-200 dark:border-[#1B212B] flex flex-col items-center gap-1.5"
              >
                <SvgIconix
                  :raw-svg="newSvg"
                  :style-variant="v.id as IconStyleVariant"
                  :settings="settings"
                  :override-size="26"
                />
                <span class="text-[10px] text-slate-500 dark:text-[#64748B]">
                  {{ v.label }}
                </span>
              </div>
            </div>
          </div>

          <p v-if="addError" class="text-xs text-red-600 dark:text-[#F87171]">{{ addError }}</p>

          <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-[#1D222B]">
            <button
              type="button"
              @click="handleDownloadJson"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#141922] border border-slate-200 dark:border-[#232B39] text-xs text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] cursor-pointer"
            >
              <Download class="w-3.5 h-3.5" />
              <span>Download icons.json</span>
            </button>

            <button
              type="submit"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-xs font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>Add to Library</span>
            </button>
          </div>
        </form>

        <!-- Embed Tab -->
        <div v-if="tab === 'embed'" class="space-y-4">
          <div class="space-y-2 text-[13px] text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
            <p>
              To call icons anywhere by name like Google Fonts (e.g.
              <code class="font-mono text-teal-700 dark:text-[#2DD4BF]">
                &lt;ix-icon name=&quot;home&quot;&gt;&lt;/ix-icon&gt;
              </code>
              ), register a lightweight <strong>Custom Web Component</strong> that reads from your hosted
              <code class="font-mono">icons.json</code> (similar to Iconify or Lucide).
            </p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-600 dark:text-[#94A3B8] font-medium">
                Web Component Loader + HTML Tag Example
              </span>
              <button
                type="button"
                @click="handleCopyEmbed"
                class="inline-flex items-center gap-1.5 text-slate-600 dark:text-[#94A3B8] hover:text-teal-600 dark:hover:text-[#2DD4BF] cursor-pointer"
              >
                <Check v-if="copiedEmbed" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ copiedEmbed ? 'Copied' : 'Copy snippet' }}</span>
              </button>
            </div>
            <pre class="p-3.5 rounded-xl bg-slate-900 dark:bg-[#090B0E] border border-slate-800 dark:border-[#1B212B] font-mono text-[11px] leading-relaxed text-slate-100 dark:text-[#CBD5E1] overflow-x-auto"><code>{{ EMBED_TAG_EXAMPLE }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { Check, Copy, Download, FileUp, Plus, RotateCcw, X } from 'lucide-vue-next';
import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';
import { validateIconsJson } from '~/utils/svgEngine';
import SvgIconix from '~/components/SvgIconix.vue';

interface Props {
  open: boolean;
  initialTab?: 'guide' | 'import' | 'add' | 'embed';
  icons: IconEntry[];
  isCustomDataset: boolean;
  settings: IconSettings;
}

const props = withDefaults(defineProps<Props>(), {
  initialTab: 'guide',
});

const emit = defineEmits<{
  'close': [];
  'replace-dataset': [icons: IconEntry[]];
  'add-icon': [icon: IconEntry];
  'restore-built-in': [];
  'notify': [message: string, tone?: 'success' | 'info' | 'error'];
}>();

const siteOrigin = ref(typeof window !== 'undefined' ? window.location.origin : '');
onMounted(() => {
  if (typeof window !== 'undefined' && window.location.origin) {
    siteOrigin.value = window.location.origin;
  }
});

const tab = ref<'guide' | 'import' | 'add' | 'embed'>(props.initialTab);
watch(
  () => props.initialTab,
  (newTab) => {
    if (newTab) tab.value = newTab;
  }
);

const SCHEMA_EXAMPLE = `[
  {
    "name": "bell-alert",
    "category": "Communication",
    "tags": ["bell", "notification", "alert", "ring"],
    "svg": "<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\"><path data-duotone=\\"base\\" d=\\"M12 3C8.7 3 6 5.7 6 9V14L4 17H20L18 14V9C18 5.7 15.3 3 12 3Z\\"/><path data-duotone=\\"accent\\" d=\\"M10 19.5A2 2 0 0 0 14 19.5\\"/></svg>"
  }
]`;

const EMBED_TAG_EXAMPLE = computed(() => `<!-- 1. Include this loader script once in your HTML -->
<script type="module">
  const res = await fetch('${siteOrigin.value}/icons.json');
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.icons || []);
  const map = new Map(list.map(i => [i.name, i.svg]));

  class IxIcon extends HTMLElement {
    connectedCallback() {
      const name = (this.getAttribute('name') || '').replace(/^(iconix:|ix:|glyph:)/, '');
      const size = this.getAttribute('size') || '24';
      const variant = (this.getAttribute('variant') || this.getAttribute('style') || 'linear').trim();
      const raw = map.get(name);
      if (!raw) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);

      const elements = svg.querySelectorAll('path, circle, rect, polygon');
      if (variant === 'solid') {
        const isClosed = (e) => e.tagName !== 'line' && (e.tagName !== 'path' || /z\\s*$/i.test(e.getAttribute('d') || ''));
        const closed = Array.from(elements).find(isClosed);
        const cutouts = Array.from(elements).filter(e => e !== closed);

        if (closed && cutouts.length > 0) {
          const mId = 'ix-m-' + Math.random().toString(36).slice(2, 8);
          const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
          mask.setAttribute('id', mId);
          mask.setAttribute('maskUnits', 'userSpaceOnUse');
          mask.innerHTML = '<rect width=\"24\" height=\"24\" fill=\"white\"/>';
          cutouts.forEach(c => {
            const clone = c.cloneNode(true);
            const isClosed = clone.tagName !== 'line' && (clone.tagName !== 'path' || /z\\s*$/i.test(clone.getAttribute('d') || ''));
            clone.setAttribute('fill', isClosed ? 'black' : 'none');
            clone.setAttribute('stroke', 'black');
            clone.setAttribute('stroke-width', '2');
            clone.setAttribute('stroke-linecap', 'round');
            clone.setAttribute('stroke-linejoin', 'round');
            mask.appendChild(clone);
            c.remove();
          });
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          defs.appendChild(mask);
          svg.prepend(defs);
          closed.setAttribute('fill', 'currentColor');
          closed.setAttribute('stroke', 'currentColor');
          closed.setAttribute('stroke-width', '2');
          closed.setAttribute('stroke-linejoin', 'round');
          closed.setAttribute('mask', 'url(#' + mId + ')');
        } else if (closed) {
          closed.setAttribute('fill', 'currentColor');
          closed.setAttribute('stroke', 'currentColor');
          closed.setAttribute('stroke-width', '2');
          closed.setAttribute('stroke-linejoin', 'round');
        }
      } else {
        elements.forEach((el, idx) => {
          const isClosed = el.tagName !== 'line' && (el.tagName !== 'path' || /z\\s*$/i.test(el.getAttribute('d') || ''));
          const isBase = el.getAttribute('data-duotone') === 'base' || idx === 0;

          if (variant === 'line-duotone' && isBase) {
            el.setAttribute('fill', 'none');
            el.setAttribute('stroke', 'currentColor');
            el.setAttribute('stroke-opacity', '0.35');
            el.setAttribute('stroke-width', '2');
          } else if (variant === 'duotone' && isBase && isClosed) {
            el.setAttribute('fill', 'currentColor');
            el.setAttribute('fill-opacity', '0.25');
            el.removeAttribute('stroke');
          } else if (variant === 'duotone-linear' && isBase && isClosed) {
            el.setAttribute('fill', 'currentColor');
            el.setAttribute('fill-opacity', '0.25');
            el.setAttribute('stroke', 'currentColor');
            el.setAttribute('stroke-width', '2');
          } else {
            el.setAttribute('fill', 'none');
            el.setAttribute('stroke', 'currentColor');
            el.setAttribute('stroke-width', '2');
          }
        });
      }

      this.innerHTML = svg.outerHTML;
      this.style.display = 'inline-flex';
      this.style.verticalAlign = 'middle';
    }
  }
  customElements.define('ix-icon', IxIcon);
  customElements.define('iconix-icon', class extends IxIcon {});
<\/script>

<!-- 2. Call icons in any style: linear, line-duotone, solid, duotone, or duotone-linear! -->
<ix-icon name="circle-plus" variant="linear" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="line-duotone" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="solid" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="duotone" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="duotone-linear" size="24"></ix-icon>`);

const SAMPLE_NEW_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect data-duotone="base" x="3" y="4" width="18" height="16" rx="4"/><path data-duotone="accent" data-cutout="true" d="M8.5 12L11 14.5L15.5 9.5"/></svg>';

const jsonInput = ref('');
const importError = ref<string | null>(null);
const copiedSchema = ref(false);
const copiedEmbed = ref(false);

const newName = ref('custom-badge-check');
const newCategory = ref('Interface');
const newTags = ref('badge, verify, check, custom');
const newSvg = ref(SAMPLE_NEW_SVG);
const addError = ref<string | null>(null);

const fileInputRef = ref<HTMLInputElement | null>(null);

const handleCopySchema = async () => {
  try {
    await navigator.clipboard.writeText(SCHEMA_EXAMPLE);
    copiedSchema.value = true;
    window.setTimeout(() => (copiedSchema.value = false), 1500);
    emit('notify', 'Copied icons.json schema example');
  } catch {
    emit('notify', 'Clipboard access blocked', 'error');
  }
};

const handleCopyEmbed = async () => {
  try {
    await navigator.clipboard.writeText(EMBED_TAG_EXAMPLE.value);
    copiedEmbed.value = true;
    window.setTimeout(() => (copiedEmbed.value = false), 1500);
    emit('notify', 'Copied <ix-icon> Web Component snippet');
  } catch {
    emit('notify', 'Clipboard access blocked', 'error');
  }
};

const handleDownloadJson = () => {
  const content = JSON.stringify(props.icons, null, 2);
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'icons.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  emit('notify', `Downloaded icons.json (${props.icons.length} icons)`);
};

const handleImportText = () => {
  importError.value = null;
  try {
    const parsed = JSON.parse(jsonInput.value);
    const result = validateIconsJson(parsed);
    if (!result.valid) {
      importError.value = result.error || 'Invalid JSON structure.';
      return;
    }
    emit('replace-dataset', result.icons);
    emit('notify', `Loaded ${result.icons.length} icons from custom JSON`);
    emit('close');
  } catch (err) {
    importError.value = err instanceof Error ? err.message : 'Invalid JSON syntax.';
  }
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || '');
    jsonInput.value = text;
    importError.value = null;
    try {
      const parsed = JSON.parse(text);
      const result = validateIconsJson(parsed);
      if (!result.valid) {
        importError.value = result.error || 'Invalid JSON structure.';
        return;
      }
      emit('replace-dataset', result.icons);
      emit('notify', `Imported ${result.icons.length} icons from ${file.name}`);
      emit('close');
    } catch (err) {
      importError.value = err instanceof Error ? err.message : 'Could not parse JSON file.';
    }
  };
  reader.readAsText(file);
};

const handleRestore = () => {
  emit('restore-built-in');
  emit('close');
};

const handleCreateIcon = () => {
  addError.value = null;

  const trimmedName = newName.value.trim().toLowerCase().replace(/\s+/g, '-');
  const trimmedCategory = newCategory.value.trim();
  const parsedTags = newTags.value
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!trimmedName) {
    addError.value = 'Icon name is required.';
    return;
  }
  if (!trimmedCategory) {
    addError.value = 'Category is required.';
    return;
  }
  if (!newSvg.value.includes('<svg')) {
    addError.value = 'SVG field must contain a valid <svg>...</svg> element.';
    return;
  }

  emit('add-icon', {
    name: trimmedName,
    category: trimmedCategory,
    tags: parsedTags.length > 0 ? parsedTags : [trimmedName],
    svg: newSvg.value.trim(),
  });
  emit('notify', `Added "${trimmedName}" to active library — download icons.json to save`);
  emit('close');
};
</script>
