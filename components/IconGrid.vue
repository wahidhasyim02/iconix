<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" class="p-4 lg:p-6">
      <div
        class="border-t border-l border-slate-200 dark:border-[#1A202A] rounded-xl overflow-hidden bg-white dark:bg-[#090B0E]"
      >
        <div :class="['grid gap-0', currentZoom.colsClass]">
          <div
            v-for="idx in 72"
            :key="idx"
            :class="[
              currentZoom.tileHeightClass,
              'border-r border-b border-slate-200 dark:border-[#1A202A] bg-slate-50/50 dark:bg-[#0C0F14] animate-pulse flex items-center justify-center'
            ]"
          >
            <div class="w-6 h-6 rounded-md bg-slate-200 dark:bg-white/5" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-8 lg:p-16 flex flex-col items-center justify-center text-center">
      <div class="max-w-md space-y-3">
        <h2 class="font-display text-lg font-semibold text-slate-900 dark:text-[#F1F5F9]">
          Unable to load icons.json
        </h2>
        <p class="text-sm text-slate-600 dark:text-[#94A3B8]">{{ error }}</p>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="icons.length === 0" class="p-10 lg:p-20 flex flex-col items-center justify-center text-center">
      <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#12161E] border border-slate-200 dark:border-[#1E2430] flex items-center justify-center mb-4">
        <SearchX class="w-5 h-5 text-slate-400 dark:text-[#64748B]" />
      </div>
      <h2 class="font-display text-base font-semibold text-slate-900 dark:text-[#F1F5F9]">
        No icons match your search
      </h2>
      <p class="mt-1.5 text-sm text-slate-600 dark:text-[#94A3B8] max-w-sm">
        Try a broader keyword or clear the active category filter to browse the full library.
      </p>
      <button
        type="button"
        @click="$emit('reset-filters')"
        class="mt-5 px-4 py-2 rounded-lg bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-xs font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors cursor-pointer"
      >
        Reset Search &amp; Filters
      </button>
    </div>

    <!-- Grouped / Filtered icons list -->
    <div v-else class="p-4 lg:p-6 space-y-8">
      <section v-for="(categoryIcons, categoryName) in groupedIcons" :key="categoryName" class="space-y-3">
        <div
          v-if="groupByCategory || (selectedCategory && selectedCategory !== 'All')"
          class="flex items-baseline justify-between border-b border-slate-200 dark:border-[#181D26] pb-2"
        >
          <h2 class="font-display text-sm font-semibold text-slate-700 dark:text-[#CBD5E1]">
            {{ categoryName }}
          </h2>
          <span class="font-mono text-xs tabular-nums text-slate-400 dark:text-[#64748B]">
            {{ categoryIcons.length }}
          </span>
        </div>
        <div
          class="border-t border-l border-slate-200 dark:border-[#1A202A] rounded-xl  bg-white dark:bg-[#090B0E] shadow-2xs"
        >
          <div :class="['grid gap-0', currentZoom.colsClass]">
            <div
              v-for="icon in categoryIcons"
              :key="icon.name"
              class="relative group border-r border-b border-slate-200 dark:border-[#1A202A] transition-colors [content-visibility:auto] [contain-intrinsic-size:96px]"
              :class="[
                currentZoom.tileHeightClass,
                selectedIconName === icon.name
                  ? 'z-10 bg-teal-50/80 dark:bg-[#131D26] ring-1 ring-teal-600/80 dark:ring-[#2DD4BF]/80'
                  : 'hover:z-10 hover:bg-slate-100/70 dark:hover:bg-[#121620] hover:ring-1 hover:ring-teal-500/40 dark:hover:ring-[#2DD4BF]/50'
              ]"
            >
              <button
                type="button"
                @click="$emit('icon-click', icon)"
                :title="`${icon.name} · ${icon.category}`"
                class="w-full h-full p-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-[#2DD4BF]"
              >
                <div class="flex items-center justify-center transition-transform duration-150 group-hover:scale-105">
                  <SvgIconix
                    :raw-svg="icon.svg"
                    :style-variant="styleVariant"
                    :settings="settings"
                    :override-size="renderSize"
                  />
                </div>

                <span
                  v-if="currentZoom.showName && showLabels"
                  class="w-full px-1 text-center font-mono text-[10.5px] leading-tight text-slate-500 dark:text-[#8492A6] group-hover:text-slate-900 dark:group-hover:text-[#CBD5E1] truncate"
                >
                  {{ icon.name }}
                </span>
              </button>

              <!-- 4-Corner Selection / Transform Dots (Figma / Vuesax style) -->
              <span
                class="pointer-events-none absolute -top-1 -left-1 w-2 h-2 rounded-[2px] bg-slate-900 dark:bg-white ring-1 ring-teal-500/40 dark:ring-[#2DD4BF]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20"
                :class="{ '!opacity-100': selectedIconName === icon.name }"
              />
              <span
                class="pointer-events-none absolute -top-1 -right-1 w-2 h-2 rounded-[2px] bg-slate-900 dark:bg-white ring-1 ring-teal-500/40 dark:ring-[#2DD4BF]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20"
                :class="{ '!opacity-100': selectedIconName === icon.name }"
              />
              <span
                class="pointer-events-none absolute -bottom-1 -left-1 w-2 h-2 rounded-[2px] bg-slate-900 dark:bg-white ring-1 ring-teal-500/40 dark:ring-[#2DD4BF]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20"
                :class="{ '!opacity-100': selectedIconName === icon.name }"
              />
              <span
                class="pointer-events-none absolute -bottom-1 -right-1 w-2 h-2 rounded-[2px] bg-slate-900 dark:bg-white ring-1 ring-teal-500/40 dark:ring-[#2DD4BF]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20"
                :class="{ '!opacity-100': selectedIconName === icon.name }"
              />

              <!-- Inspect Quick Button -->
              <button
                type="button"
                @click.stop="$emit('inspect-only', icon)"
                :title="`Preview ${icon.name}`"
                :aria-label="`Preview ${icon.name}`"
                class="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute top-1.5 right-1.5 p-1 rounded-md bg-white/95 dark:bg-[#161B23]/90 border border-slate-200 dark:border-[#262E3B] text-slate-500 dark:text-[#94A3B8] hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-opacity cursor-pointer z-15"
              >
                <Eye class="w-3 h-3" />
              </button>

              <!-- Copied Indicator -->
              <div
                v-if="copiedIconName === icon.name"
                class="pointer-events-none absolute inset-x-2 top-2 z-20 flex items-center justify-center gap-1 py-0.5 rounded-md bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-[10px] font-semibold shadow-md"
              >
                <Check class="w-3 h-3 stroke-[2.5]" />
                <span>Copied</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Check, Eye, SearchX } from 'lucide-vue-next';
import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';
import SvgIconix from '~/components/SvgIconix.vue';

interface Props {
  icons: IconEntry[];
  loading: boolean;
  error: string | null;
  styleVariant: IconStyleVariant;
  settings: IconSettings;
  gridZoom: number;
  selectedIconName: string | null;
  copiedIconName: string | null;
  groupByCategory: boolean;
  selectedCategory?: string;
  showLabels?: boolean;
}

const props = defineProps<Props>();

defineEmits<{
  'icon-click': [icon: IconEntry];
  'inspect-only': [icon: IconEntry];
  'reset-filters': [];
}>();

const ZOOM_CONFIG: Record<
  number,
  { colsClass: string; tileHeightClass: string; previewBoost: number; showName: boolean }
> = {
  1: {
    colsClass: 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12',
    tileHeightClass: 'h-20',
    previewBoost: 0,
    showName: false,
  },
  2: {
    colsClass: 'grid-cols-3 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9',
    tileHeightClass: 'h-24',
    previewBoost: 4,
    showName: true,
  },
  3: {
    colsClass: 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7',
    tileHeightClass: 'h-28',
    previewBoost: 12,
    showName: true,
  },
  4: {
    colsClass: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
    tileHeightClass: 'h-36',
    previewBoost: 22,
    showName: true,
  },
};

const currentZoom = computed(() => ZOOM_CONFIG[props.gridZoom] ?? ZOOM_CONFIG[2]);
const renderSize = computed(() =>
  Math.min(72, Math.max(16, props.settings.size + currentZoom.value.previewBoost))
);

const groupedIcons = computed<Record<string, IconEntry[]>>(() => {
  if (!props.groupByCategory) {
    const label =
      props.selectedCategory && props.selectedCategory !== 'All'
        ? props.selectedCategory
        : 'All Icons';
    return { [label]: props.icons };
  }
  const result: Record<string, IconEntry[]> = {};
  for (const item of props.icons) {
    if (!result[item.category]) {
      result[item.category] = [];
    }
    result[item.category].push(item);
  }
  return result;
});
</script>
