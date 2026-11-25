<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden lg:block w-60 xl:w-64 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 z-20">
    <div class="flex flex-col h-full bg-slate-50 dark:bg-[#0C0F14] border-r border-slate-200 dark:border-[#1D222B] transition-colors">
      <div class="px-4 pt-5 pb-3 flex items-center justify-between border-b border-slate-200 dark:border-[#1D222B]/70">
        <div class="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-600 dark:text-[#94A3B8]">
          <FolderKanban class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
          <span>Categories</span>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        <!-- Skeleton when loading -->
        <div v-if="loading" class="space-y-1.5 pt-0.5">
          <div class="h-9 rounded-lg bg-slate-200/70 dark:bg-[#13171E] animate-pulse flex items-center justify-between px-3">
            <div class="h-3.5 w-16 rounded bg-slate-300/60 dark:bg-white/5" />
            <div class="h-3 w-6 rounded bg-slate-300/40 dark:bg-white/5" />
          </div>
          <div class="my-2 border-t border-slate-200 dark:border-[#1D222B]/60" />
          <div
            v-for="idx in 12"
            :key="idx"
            class="h-9 rounded-lg bg-slate-200/50 dark:bg-[#101319] animate-pulse flex items-center justify-between px-3"
          >
            <div
              class="h-3 rounded bg-slate-300/50 dark:bg-white/5"
              :style="{ width: `${45 + (idx * 17) % 35}%` }"
            />
            <div class="h-2.5 w-5 rounded bg-slate-300/30 dark:bg-white/5" />
          </div>
        </div>

        <template v-else>
          <button
            type="button"
            @click="$emit('select-category', 'All')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
            :class="selectedCategory === 'All'
              ? 'bg-white dark:bg-[#151C24] text-slate-900 dark:text-[#F1F5F9] font-medium ring-1 ring-teal-600/35 dark:ring-[#2DD4BF]/35 shadow-xs dark:shadow-none'
              : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
          >
            <span class="truncate">All Icons</span>
            <span
              class="font-mono text-xs tabular-nums"
              :class="selectedCategory === 'All' ? 'text-teal-700 dark:text-[#2DD4BF]' : 'text-slate-400 dark:text-[#64748B]'"
            >
              {{ totalCount }}
            </span>
          </button>

          <div class="my-2 border-t border-slate-200 dark:border-[#1D222B]/60" />

          <button
            v-for="cat in categories"
            :key="cat.name"
            type="button"
            @click="$emit('select-category', cat.name)"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
            :class="selectedCategory === cat.name
              ? 'bg-white dark:bg-[#151C24] text-slate-900 dark:text-[#F1F5F9] font-medium ring-1 ring-teal-600/35 dark:ring-[#2DD4BF]/35 shadow-xs dark:shadow-none'
              : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
          >
            <span class="truncate pr-2">{{ cat.name }}</span>
            <span
              class="font-mono text-xs tabular-nums shrink-0"
              :class="selectedCategory === cat.name ? 'text-teal-700 dark:text-[#2DD4BF]' : 'text-slate-400 dark:text-[#64748B]'"
            >
              {{ cat.count }}
            </span>
          </button>
        </template>
      </div>

      <div class="px-4 py-3 border-t border-slate-200 dark:border-[#1D222B] text-[11px] text-slate-500 dark:text-[#64748B] flex items-center justify-between">
        <span>24×24 Grid</span>
        <span aria-hidden="true">·</span>
        <span v-if="loading" class="h-3 w-14 rounded bg-slate-300/50 dark:bg-white/5 animate-pulse inline-block" />
        <span v-else class="font-mono tabular-nums">{{ totalCount }} icons</span>
      </div>
    </div>
  </aside>

  <!-- Mobile Drawer -->
  <Teleport to="body">
    <div v-if="mobileOpen" class="fixed inset-0 z-50 lg:hidden flex">
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-xs"
        @click="$emit('close-mobile')"
      />
      <div class="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl">
        <div class="flex flex-col h-full bg-slate-50 dark:bg-[#0C0F14] border-r border-slate-200 dark:border-[#1D222B] transition-colors">
          <div class="px-4 pt-5 pb-3 flex items-center justify-between border-b border-slate-200 dark:border-[#1D222B]/70">
            <div class="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-600 dark:text-[#94A3B8]">
              <FolderKanban class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
              <span>Categories</span>
            </div>
            <button
              type="button"
              @click="$emit('close-mobile')"
              aria-label="Close categories"
              class="lg:hidden p-1.5 rounded-md text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-200/70 dark:hover:bg-[#161B23]"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
            <!-- Skeleton when loading -->
            <div v-if="loading" class="space-y-1.5 pt-0.5">
              <div class="h-9 rounded-lg bg-slate-200/70 dark:bg-[#13171E] animate-pulse flex items-center justify-between px-3">
                <div class="h-3.5 w-16 rounded bg-slate-300/60 dark:bg-white/5" />
                <div class="h-3 w-6 rounded bg-slate-300/40 dark:bg-white/5" />
              </div>
              <div class="my-2 border-t border-slate-200 dark:border-[#1D222B]/60" />
              <div
                v-for="idx in 12"
                :key="idx"
                class="h-9 rounded-lg bg-slate-200/50 dark:bg-[#101319] animate-pulse flex items-center justify-between px-3"
              >
                <div
                  class="h-3 rounded bg-slate-300/50 dark:bg-white/5"
                  :style="{ width: `${45 + (idx * 17) % 35}%` }"
                />
                <div class="h-2.5 w-5 rounded bg-slate-300/30 dark:bg-white/5" />
              </div>
            </div>

            <template v-else>
              <button
                type="button"
                @click="handleMobileSelect('All')"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                :class="selectedCategory === 'All'
                  ? 'bg-white dark:bg-[#151C24] text-slate-900 dark:text-[#F1F5F9] font-medium ring-1 ring-teal-600/35 dark:ring-[#2DD4BF]/35 shadow-xs dark:shadow-none'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
              >
                <span class="truncate">All Icons</span>
                <span
                  class="font-mono text-xs tabular-nums"
                  :class="selectedCategory === 'All' ? 'text-teal-700 dark:text-[#2DD4BF]' : 'text-slate-400 dark:text-[#64748B]'"
                >
                  {{ totalCount }}
                </span>
              </button>

              <div class="my-2 border-t border-slate-200 dark:border-[#1D222B]/60" />

              <button
                v-for="cat in categories"
                :key="cat.name"
                type="button"
                @click="handleMobileSelect(cat.name)"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                :class="selectedCategory === cat.name
                  ? 'bg-white dark:bg-[#151C24] text-slate-900 dark:text-[#F1F5F9] font-medium ring-1 ring-teal-600/35 dark:ring-[#2DD4BF]/35 shadow-xs dark:shadow-none'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
              >
                <span class="truncate pr-2">{{ cat.name }}</span>
                <span
                  class="font-mono text-xs tabular-nums shrink-0"
                  :class="selectedCategory === cat.name ? 'text-teal-700 dark:text-[#2DD4BF]' : 'text-slate-400 dark:text-[#64748B]'"
                >
                  {{ cat.count }}
                </span>
              </button>
            </template>
          </div>

          <div class="px-4 py-3 border-t border-slate-200 dark:border-[#1D222B] text-[11px] text-slate-500 dark:text-[#64748B] flex items-center justify-between">
            <span>24×24 Grid</span>
            <span aria-hidden="true">·</span>
            <span v-if="loading" class="h-3 w-14 rounded bg-slate-300/50 dark:bg-white/5 animate-pulse inline-block" />
            <span v-else class="font-mono tabular-nums">{{ totalCount }} icons</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { FolderKanban, X } from 'lucide-vue-next';

export interface CategoryCount {
  name: string;
  count: number;
}

interface Props {
  loading?: boolean;
  categories: CategoryCount[];
  totalCount: number;
  selectedCategory: string;
  mobileOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'select-category': [category: string];
  'close-mobile': [];
  'open-json-studio': [tab: 'guide' | 'import' | 'add' | 'embed'];
}>();

const handleMobileSelect = (category: string) => {
  emit('select-category', category);
  emit('close-mobile');
};
</script>
