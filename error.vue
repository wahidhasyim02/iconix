<template>
  <div
    class="min-h-screen bg-[#F8FAFC] dark:bg-[#090B0E] text-slate-900 dark:text-[#F1F5F9] flex flex-col transition-colors selection:bg-teal-500/20 selection:text-teal-600 dark:selection:text-[#2DD4BF]">
    <!-- Minimal Header with Logo and Theme Toggle -->
    <header
      class="border-b border-slate-200 dark:border-[#1D222B] bg-white/80 dark:bg-[#090B0E]/80 backdrop-blur-md sticky top-0 z-20">
      <div class="h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <!-- Brand Link -->
        <button type="button" @click="handleClearError('/')"
          class="flex items-center gap-2.5 text-left rounded-md cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-[#2DD4BF]">
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true"
            class="shrink-0 transition-transform group-hover:scale-105">
            <circle cx="31.7715" cy="12.5714" r="9.37143" class="fill-slate-800 dark:fill-[#D9D9D9]" />
            <path
              d="M60.4082 29.6528C59.3713 29.3372 58.2564 29.1648 57.0951 29.1648C51.5755 29.1649 47.1012 33.0429 47.1011 37.8262C47.1012 42.6095 51.5755 46.487 57.0951 46.4871C58.2156 46.4871 59.293 46.3276 60.2987 46.0328L50.1953 60.8C40.1557 56.8102 33.1823 48.0243 33.1823 37.8262C33.1823 27.605 40.187 18.8016 50.2633 14.8245L60.4082 29.6528Z"
              fill="#0D9488" />
            <path
              d="M13.2815 14.8675C23.3002 18.8646 30.2556 27.6413 30.2556 37.8262C30.2556 47.9881 23.3316 56.7479 13.3495 60.7575L3.30741 46.0803C4.26472 46.3444 5.28449 46.4871 6.3428 46.4871C11.8624 46.4871 16.3367 42.6096 16.3368 37.8262C16.3367 33.0429 11.8624 29.1649 6.3428 29.1648C5.24487 29.1648 4.18826 29.3184 3.20001 29.6018L13.2815 14.8675Z"
              fill="#0D9488" />
          </svg>
          <span class="font-display text-base font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
            Iconix
          </span>
        </button>

        <!-- Right Side: Navigation & Theme Toggle -->
        <div class="flex items-center gap-3 sm:gap-4">
          <button type="button" @click="handleClearError('/docs')"
            class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            Dokumentasi
          </button>
          <button type="button" @click="handleClearError('/guide')"
            class="hidden sm:inline-block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            Style Variants
          </button>

          <!-- Theme Toggle Button -->
          <button type="button" @click="toggleTheme" aria-label="Toggle theme"
            class="h-8 w-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <!-- Sun Icon (Light) -->
            <svg v-if="isDark" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <!-- Moon Icon (Dark) -->
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 404 Hero Content -->
    <main class="flex-1 flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden">
      <!-- Background Decorative Radial Glow -->
      <div aria-hidden="true"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10">
      </div>

      <div class="max-w-xl w-full text-center flex flex-col items-center">
        <!-- Illustrated Icon Display (Large Lens) -->
        <div class="relative mb-6 flex flex-col items-center group">
          <!-- Big Search Question Mark Vector from User -->
          <svg
            class="w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 text-teal-600 dark:text-[#2DD4BF] transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(13,148,136,0.15)] dark:drop-shadow-[0_15px_35px_rgba(45,212,191,0.25)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="9" stroke-width="2" stroke="currentColor" />
            <path
              d="M17.5 18.5L20.6569 21.6569"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="currentColor"
            />
            <path
              d="M9 9.05714V8.78149C9 8.51164 9.0613 8.24532 9.17927 8.00263C9.47742 7.38931 10.0995 7 10.7815 7H10.9497C12.0821 7 13 7.91795 13 9.0503V9.15358C13 9.92849 12.5424 10.6303 11.8333 10.9429L11.2941 11.1806C10.9128 11.3487 10.6667 11.7261 10.6667 12.1429M10.6667 14.84V15"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="currentColor"
            />
          </svg>

          <!-- Badge 404 Floating Pill -->
          <div
            class="mt-4 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-teal-300 dark:bg-[#2DD4BF] dark:text-slate-950 shadow-md border border-slate-700/50 dark:border-teal-400"
          >
            {{ is404 ? '404' : (error?.statusCode || 'Error') }}
          </div>
        </div>

        <!-- Headline -->
        <h1
          class="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9] mb-3">
          {{ is404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
        </h1>

        <!-- Subtitle / Friendly Message -->
        <p
          class="font-sans text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-md mx-auto mb-8 leading-relaxed">
          {{
            is404
              ? 'Tautan yang Anda cari mungkin sudah dipindahkan, diubah namanya, atau belum tersedia di koleksi Iconix.'
              : (error?.message || 'Maaf, terjadi masalah saat memuat halaman ini.')
          }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <!-- Back to Home Button -->
          <button type="button" @click="handleClearError('/')"
            class="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-teal-600 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>

            Kembali ke Beranda
          </button>

          <!-- Browse Icons Button -->
          <button type="button" @click="handleClearError('/?category=All')"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Jelajahi {{ totalIcons }} Ikon
          </button>
        </div>

        <!-- Additional Help / Quick Links -->
        <div
          class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-sm flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <button type="button" @click="handleClearError('/docs')"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer">
            Web Component & API
          </button>
          <span>•</span>
          <button type="button" @click="handleClearError('/guide')"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer">
            Panduan Style
          </button>
          <span>•</span>
          <a href="https://github.com/wahidhasyim02/iconix" target="_blank" rel="noopener noreferrer"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors inline-flex items-center gap-1">
            GitHub
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="border-t border-slate-200 dark:border-[#1D222B] py-4 text-center text-xs text-slate-500 dark:text-slate-400">
      <p>Iconix — {{ totalIcons }} Open-Source Vector Icons for Modern Interfaces.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { computed, ref, onMounted } from 'vue';

const props = defineProps<{
  error?: NuxtError;
}>();

const is404 = computed(() => {
  return !props.error || props.error.statusCode === 404;
});

const isDark = ref(true);
const totalIcons = ref(900);

onMounted(async () => {
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark');
  }
  try {
    const res = await $fetch<unknown[]>('/icons.json');
    if (Array.isArray(res) && res.length > 0) {
      totalIcons.value = res.length;
    }
  } catch {
    // Keep fallback count if offline or error
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark.value);
  }
};

const handleClearError = (targetPath: string = '/') => {
  clearError({ redirect: targetPath });
};

useHead({
  title: computed(() => (is404.value ? '404 — Halaman Tidak Ditemukan | Iconix' : 'Terjadi Kesalahan | Iconix')),
  meta: [
    {
      name: 'description',
      content: 'Halaman yang Anda tuju tidak ditemukan di Iconix Icon Studio.',
    },
  ],
});
</script>
