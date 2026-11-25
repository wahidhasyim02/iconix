<template>
  <aside
    v-if="icon"
    aria-label="Icon preview and export studio"
    class="fixed inset-y-0 right-0 z-40 w-full sm:w-[400px] xl:sticky xl:top-14 xl:h-[calc(100vh-3.5rem)] xl:z-10 bg-white dark:bg-[#0C0F14] border-l border-slate-200 dark:border-[#1D222B] flex flex-col shadow-2xl xl:shadow-none transition-colors"
  >
    <!-- Header -->
    <div class="px-5 py-4 border-b border-slate-200 dark:border-[#1D222B] flex items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <h2 class="font-mono text-base font-semibold text-slate-900 dark:text-[#F1F5F9] truncate">
            {{ icon.name }}
          </h2>
          <button
            type="button"
            @click="handleCopyFilename(false)"
            title="Copy icon name"
            class="p-1 rounded text-slate-400 dark:text-[#64748B] hover:text-teal-600 dark:hover:text-[#2DD4BF] hover:bg-slate-100 dark:hover:bg-[#161B23] transition-colors cursor-pointer shrink-0"
          >
            <Check v-if="recentAction === 'copy-name'" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
            <Copy v-else class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-[#64748B]">
          <span>{{ icon.category }}</span>
          <span aria-hidden="true">·</span>
          <span class="capitalize">{{ styleVariant.replace('-', ' ') }}</span>
          <span aria-hidden="true">·</span>
          <span class="font-mono tabular-nums">{{ settings.size }}px</span>
        </div>
      </div>

      <button
        type="button"
        @click="$emit('close')"
        aria-label="Close inspector"
        class="p-1.5 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#171C24] transition-colors cursor-pointer shrink-0"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Scrollable Body -->
    <div class="flex-1 overflow-y-auto p-5 space-y-5">
      <!-- Live Preview Stage -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1 p-0.5 rounded-md bg-slate-100 dark:bg-[#12161E] border border-slate-200 dark:border-[#1E2430]">
            <button
              v-for="bg in (['dark', 'light', 'checker'] as PreviewBackdrop[])"
              :key="bg"
              type="button"
              @click="backdrop = bg"
              class="px-2 py-1 rounded text-[11px] font-medium capitalize transition-colors cursor-pointer"
              :class="backdrop === bg
                ? 'bg-white dark:bg-[#1D2430] text-slate-900 dark:text-[#F1F5F9] shadow-2xs dark:shadow-none'
                : 'text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-[#CBD5E1]'"
            >
              {{ bg }}
            </button>
          </div>

          <div class="flex items-center gap-1 p-0.5 rounded-md bg-slate-100 dark:bg-[#12161E] border border-slate-200 dark:border-[#1E2430]">
            <button
              v-for="z in [1, 1.5, 2, 3]"
              :key="z"
              type="button"
              @click="previewZoom = z"
              class="px-1.5 py-1 rounded font-mono text-[11px] tabular-nums transition-colors cursor-pointer"
              :class="previewZoom === z
                ? 'bg-white dark:bg-[#1D2430] text-teal-600 dark:text-[#2DD4BF] shadow-2xs dark:shadow-none'
                : 'text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-[#CBD5E1]'"
            >
              {{ z }}x
            </button>
          </div>
        </div>

        <div
          class="h-44 rounded-xl border flex items-center justify-center relative overflow-hidden transition-colors"
          :class="backdropClass"
        >
          <SvgIconix
            :raw-svg="icon.svg"
            :style-variant="styleVariant"
            :settings="settings"
            :override-size="previewiconixSize"
          />
          <span
            class="absolute bottom-2 right-2.5 font-mono text-[10px] tabular-nums"
            :class="backdrop === 'light' || (backdrop === 'checker' && theme === 'light') ? 'text-slate-500' : 'text-[#64748B]'"
          >
            {{ previewiconixSize }}×{{ previewiconixSize }}px preview
          </span>
        </div>

        <div
          v-if="lowContrastLight"
          class="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-[11px] text-amber-800 dark:text-amber-300"
        >
          <span>Light ink on light backdrop has low contrast.</span>
          <button
            type="button"
            @click="$emit('update-settings', { primaryColor: '#0F172A' })"
            class="font-semibold underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            Use Dark Ink
          </button>
        </div>
      </div>

      <!-- 5-Variant Strip -->
      <div class="space-y-2">
        <div class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
          Style Variants
        </div>
        <div class="grid grid-cols-5 gap-1.5">
          <button
            v-for="variant in VARIANT_LIST"
            :key="variant.id"
            type="button"
            @click="$emit('style-change', variant.id)"
            class="py-2 px-1 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
            :class="styleVariant === variant.id
              ? 'bg-teal-50/70 dark:bg-[#141D26] border-teal-600/60 dark:border-[#2DD4BF]/60 text-slate-900 dark:text-[#F1F5F9]'
              : 'bg-slate-50 dark:bg-[#101319] border-slate-200 dark:border-[#1D222B] text-slate-600 dark:text-[#94A3B8] hover:border-slate-300 dark:hover:border-[#2B3342] hover:text-slate-900 dark:hover:text-[#E2E8F0]'"
          >
            <SvgIconix
              :raw-svg="icon.svg"
              :style-variant="variant.id"
              :settings="settings"
              :override-size="20"
            />
            <span class="text-[9px] font-medium leading-none truncate max-w-full">
              {{ variant.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Primary & Secondary Export Buttons -->
      <div class="space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            @click="handleCopySvg"
            class="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-xs font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Check v-if="recentAction === 'copy-svg'" class="w-3.5 h-3.5" />
            <Copy v-else class="w-3.5 h-3.5" />
            <span>{{ recentAction === 'copy-svg' ? 'Copied SVG' : 'Copy SVG' }}</span>
          </button>

          <button
            type="button"
            @click="handleCopyPng"
            class="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-100 dark:bg-[#151A23] border border-slate-200 dark:border-[#252D3B] text-slate-800 dark:text-[#E2E8F0] text-xs font-medium hover:bg-slate-200/80 dark:hover:bg-[#1B222E] hover:border-slate-300 dark:hover:border-[#344054] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Check v-if="recentAction === 'copy-png'" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
            <ImageDown v-else class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
            <span>{{ recentAction === 'copy-png' ? 'Copied PNG' : 'Copy PNG' }}</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            @click="handleDownloadSvg"
            class="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#161B24] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
            <span>.SVG</span>
          </button>

          <button
            type="button"
            @click="handleDownloadPng"
            class="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#161B24] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
            <span>.PNG</span>
          </button>

          <button
            type="button"
            @click="handleCopyFilename(false)"
            :title="`Copy icon name &quot;${icon.name}&quot;`"
            class="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#161B24] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Check v-if="recentAction === 'copy-name'" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
            <FileCode2 v-else class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
            <span>Copy Name</span>
          </button>

          <button
            type="button"
            @click="handleShare"
            class="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-[#101319] border border-slate-200 dark:border-[#1D222B] text-xs text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#161B24] hover:border-slate-300 dark:hover:border-[#2C3545] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Check v-if="recentAction === 'share'" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
            <Share2 v-else class="w-3.5 h-3.5 text-slate-500 dark:text-[#94A3B8]" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <!-- Code Output Tabs -->
      <!-- Code Output Block with Integrated Header & Copy Button -->
      <div class="space-y-2">
        <!-- Tabs Bar -->
        <div class="flex items-center justify-between px-2 gap-1 p-0.5 rounded-md bg-slate-100 dark:bg-[#12161E] border border-slate-200 dark:border-[#1E2430] w-full">
          <button
            v-for="tab in (['svg', 'nuxt', 'vue', 'react', 'tag'] as CodeTab[])"
            :key="tab"
            type="button"
            @click="codeTab = tab"
            class="px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap"
            :class="codeTab === tab
              ? 'bg-white dark:bg-[#1D2430] text-slate-900 dark:text-[#F1F5F9] shadow-2xs dark:shadow-none'
              : 'text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-[#CBD5E1]'"
          >
            {{ tab === 'svg' ? 'SVG' : tab === 'nuxt' ? 'Nuxt' : tab === 'vue' ? 'Vue 3' : tab === 'react' ? 'React' : '<ix-icon>' }}
          </button>
        </div>

        <!-- Integrated Code Box with Copy Header -->
        <div class="rounded-lg bg-slate-900 dark:bg-[#090B0E] border border-slate-800 dark:border-[#1A2029] overflow-hidden">
          <div class="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 dark:bg-[#11141A] border-b border-slate-800 dark:border-[#1A2029] text-[11px]">
            <div class="flex items-center gap-2">
              <span class="text-slate-400 dark:text-[#64748B] font-mono text-[10px] uppercase tracking-wider">
                {{ codeTab === 'svg' ? 'SVG' : codeTab === 'nuxt' ? 'Nuxt Component' : codeTab === 'vue' ? 'Vue 3 Component' : codeTab === 'react' ? 'React TSX' : '<ix-icon>' }}
              </span>
              <div v-if="codeTab === 'nuxt'" class="inline-flex items-center p-0.5 rounded bg-slate-800 dark:bg-[#1A202A] text-[10px]">
                <button
                  type="button"
                  @click="nuxtFlavor = 'uicon'"
                  class="px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                  :class="nuxtFlavor === 'uicon' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-200'"
                >
                  &lt;UIcon&gt;
                </button>
                <button
                  type="button"
                  @click="nuxtFlavor = 'icon'"
                  class="px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                  :class="nuxtFlavor === 'icon' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-200'"
                >
                  &lt;Icon&gt;
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="handleCopyCodeTab"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-teal-600 dark:bg-[#181D26] dark:hover:bg-[#2DD4BF] text-slate-200 dark:text-[#CBD5E1] hover:text-white dark:hover:text-[#090B0E] text-[11px] font-medium transition-all cursor-pointer shadow-xs"
              :title="'Copy ' + (codeTab === 'svg' ? 'SVG' : codeTab === 'tag' ? '<ix-icon>' : codeTab === 'nuxt' ? (nuxtFlavor === 'uicon' ? '<UIcon>' : '<Icon>') : codeTab) + ' to clipboard'"
            >
              <Check v-if="recentAction === 'copy-code'" class="w-3.5 h-3.5 text-teal-400 dark:text-[#090B0E]" />
              <Copy v-else class="w-3.5 h-3.5" />
              <span>{{ recentAction === 'copy-code' ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>
          <pre class="p-3 text-[11px] leading-relaxed font-mono text-slate-100 dark:text-[#CBD5E1] overflow-x-auto max-h-44"><code>{{ codeOutput }}</code></pre>
        </div>
      </div>

      <!-- Unboxed Tags Metadata -->
      <div class="pt-2 border-t border-slate-200 dark:border-[#1D222B] space-y-1.5">
        <div class="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
          Tags
        </div>
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 dark:text-[#64748B]">
          <span v-for="(tag, idx) in icon.tags" :key="tag" class="inline-flex items-center gap-2">
            <span v-if="idx > 0" aria-hidden="true">·</span>
            <button
              type="button"
              @click="$emit('tag-click', tag)"
              class="text-slate-600 dark:text-[#94A3B8] hover:text-teal-600 dark:hover:text-[#2DD4BF] hover:underline transition-colors cursor-pointer"
            >
              {{ tag }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Check,
  Code2,
  Copy,
  Download,
  FileCode2,
  ImageDown,
  Share2,
  X,
} from 'lucide-vue-next';
import type {
  CodeTab,
  IconEntry,
  IconSettings,
  IconStyleVariant,
  PreviewBackdrop,
} from '~/types/icon';
import {
  buildReactComponentCode,
  buildStyledSvg,
  buildVueComponentCode,
  copySvgToClipboard,
  formatPrettySvg,
  isLightHexColor,
  svgToPngBlob,
} from '~/utils/svgEngine';
import SvgIconix from '~/components/SvgIconix.vue';

interface Props {
  theme: 'dark' | 'light';
  icon: IconEntry | null;
  styleVariant: IconStyleVariant;
  settings: IconSettings;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'style-change': [variant: IconStyleVariant];
  'update-settings': [patch: Partial<IconSettings>];
  'close': [];
  'tag-click': [tag: string];
  'notify': [message: string, tone?: 'success' | 'info' | 'error'];
}>();

const backdrop = ref<PreviewBackdrop>(props.theme === 'light' ? 'light' : 'dark');
const previewZoom = ref<number>(2);
const codeTab = ref<CodeTab>('svg');
const nuxtFlavor = ref<'uicon' | 'icon'>('uicon');
const recentAction = ref<string | null>(null);

const VARIANT_LIST: { id: IconStyleVariant; label: string }[] = [
  { id: 'duotone', label: 'Dualtone' },
  { id: 'duotone-linear', label: 'Duo Linear' },
  { id: 'line-duotone', label: 'Line Duo' },
  { id: 'linear', label: 'Linear' },
  { id: 'solid', label: 'Solid' },
];

const styledSvg = computed(() => {
  if (!props.icon) return '';
  return buildStyledSvg(props.icon.svg, props.styleVariant, props.settings, {
    uniqueSuffix: `inspect-${props.icon.name}`,
  });
});

const codeOutput = computed(() => {
  if (!props.icon || !styledSvg.value) return '';
  if (codeTab.value === 'svg') {
    return formatPrettySvg(styledSvg.value);
  }
  if (codeTab.value === 'nuxt') {
    if (nuxtFlavor.value === 'uicon') {
      return `<UIcon name="i-iconix-${props.icon.name}" class="w-6 h-6" />`;
    }
    return `<Icon name="iconix:${props.icon.name}" size="${props.settings.size}" />`;
  }
  if (codeTab.value === 'vue') {
    return buildVueComponentCode(props.icon.name, styledSvg.value);
  }
  if (codeTab.value === 'react') {
    return buildReactComponentCode(props.icon.name, styledSvg.value);
  }
  if (codeTab.value === 'tag') {
    return `<ix-icon name="${props.icon.name}" variant="${props.styleVariant}" size="${props.settings.size}"></ix-icon>`;
  }
  return `<!-- ${props.icon.name}.svg -->\n${formatPrettySvg(styledSvg.value)}`;
});

const previewiconixSize = computed(() =>
  Math.min(128, Math.max(32, Math.round(props.settings.size * previewZoom.value)))
);

const lowContrastLight = computed(
  () => backdrop.value === 'light' && isLightHexColor(props.settings.primaryColor)
);

const backdropClass = computed(() => {
  if (backdrop.value === 'light') return 'bg-[#F8FAFC] border-slate-300';
  if (backdrop.value === 'checker') {
    return props.theme === 'light'
      ? 'bg-checkerboard-light border-slate-300'
      : 'bg-checkerboard-dark border-[#232A36]';
  }
  return 'bg-[#0C0F14] bg-studio-dots border-[#1F2632]';
});

const markAction = (id: string) => {
  recentAction.value = id;
  window.setTimeout(() => {
    if (recentAction.value === id) recentAction.value = null;
  }, 1500);
};

const handleCopySvg = async () => {
  if (!props.icon) return;
  try {
    const code = formatPrettySvg(styledSvg.value);
    await copySvgToClipboard(code);
    markAction('copy-svg');
    emit('notify', `Copied SVG for Figma & code ("${props.icon.name}")`);
  } catch {
    emit('notify', 'Clipboard access blocked by browser', 'error');
  }
};

const handleCopyFilename = async (withExt: boolean) => {
  if (!props.icon) return;
  const value = withExt ? `${props.icon.name}.svg` : props.icon.name;
  try {
    await navigator.clipboard.writeText(value);
    markAction(withExt ? 'copy-file' : 'copy-name');
    emit('notify', `Copied "${value}"`);
  } catch {
    emit('notify', 'Clipboard access blocked by browser', 'error');
  }
};

const handleDownloadSvg = () => {
  if (!props.icon) return;
  const blob = new Blob([formatPrettySvg(styledSvg.value)], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.icon.name}-${props.styleVariant}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  markAction('dl-svg');
  emit('notify', `Downloaded ${props.icon.name}-${props.styleVariant}.svg`);
};

const handleDownloadPng = async () => {
  if (!props.icon) return;
  try {
    const exportPx = Math.max(256, props.settings.size * 4);
    const pngBlob = await svgToPngBlob(styledSvg.value, exportPx);
    const url = URL.createObjectURL(pngBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.icon.name}-${props.styleVariant}-${exportPx}px.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    markAction('dl-png');
    emit('notify', `Downloaded ${exportPx}×${exportPx} PNG`);
  } catch (err) {
    console.error('PNG download error:', err);
    emit('notify', 'Failed to generate PNG download', 'error');
  }
};

const handleCopyPng = async () => {
  if (!props.icon) return;
  try {
    const exportPx = Math.max(256, props.settings.size * 4);
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      let item: ClipboardItem;
      try {
        // Modern Chrome/Safari: pass Promise directly to preserve transient user activation
        const pngPromise = svgToPngBlob(styledSvg.value, exportPx);
        item = new ClipboardItem({ 'image/png': pngPromise });
      } catch {
        const pngBlob = await svgToPngBlob(styledSvg.value, exportPx);
        item = new ClipboardItem({ 'image/png': pngBlob });
      }
      await navigator.clipboard.write([item]);
      markAction('copy-png');
      emit('notify', `Copied ${exportPx}×${exportPx} PNG image to clipboard`);
    } else {
      emit('notify', 'PNG clipboard write is not supported in this browser; use Download PNG', 'info');
    }
  } catch (err) {
    console.error('Copy PNG error:', err);
    emit('notify', 'Unable to copy PNG to clipboard in this browser; try Download PNG', 'info');
  }
};

const handleShare = async () => {
  if (!props.icon) return;
  const params = new URLSearchParams({
    icon: props.icon.name,
    style: props.styleVariant,
    size: String(props.settings.size),
    stroke: String(props.settings.strokeWidth),
    opacity: String(props.settings.duotoneOpacity),
    color: props.settings.primaryColor,
    tone: props.settings.secondaryColor,
  });
  const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${props.icon.name} — Iconix`,
        text: `Check out the "${props.icon.name}" (${props.styleVariant}) icon`,
        url: shareUrl,
      });
      markAction('share');
      return;
    }
  } catch {
    // Fallback to clipboard
  }

  try {
    await navigator.clipboard.writeText(shareUrl);
    markAction('share');
    emit('notify', 'Shareable icon link copied to clipboard');
  } catch {
    emit('notify', 'Could not copy share URL', 'error');
  }
};

const handleCopyCodeTab = async () => {
  try {
    await navigator.clipboard.writeText(codeOutput.value);
    markAction('copy-code');
    const label =
      codeTab.value === 'nuxt'
        ? (nuxtFlavor.value === 'uicon' ? '<UIcon> component' : '<Icon> component')
        : `${codeTab.value.toUpperCase()} snippet`;
    emit('notify', `Copied ${label}`);
  } catch {
    emit('notify', 'Clipboard access blocked', 'error');
  }
};
</script>
