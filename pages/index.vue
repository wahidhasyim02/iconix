<template>
  <div class="min-h-screen bg-[#F8FAFC] dark:bg-[#090B0E] text-slate-900 dark:text-[#F1F5F9] flex flex-col transition-colors">
    <!-- Top Navbar -->
    <TopBar
      :active-section="activeSection"
      :theme="theme"
      @change-section="handleSectionChange"
      @open-json-studio="handleOpenJsonStudio"
      @reset-all="handleResetAll"
      @toggle-theme="handleToggleTheme"
    />

    <!-- Style Guide View -->
    <main v-if="activeSection === 'guide'" class="flex-1">
      <StyleGuideView
        :sample-icons="icons"
        :settings="settings"
        @select-style-and-browse="handleStyleSelectAndBrowse"
      />
    </main>

    <!-- Full Documentation View -->
    <main v-else-if="activeSection === 'docs'" class="flex-1">
      <DocumentationView
        :icons="icons"
        :settings="settings"
        @notify="notify"
        @navigate-to-browse="handleSectionChange('browse')"
      />
    </main>

    <!-- Browse Icon Library View -->
    <div v-else class="flex-1 flex items-start">
      <CategorySidebar
        :loading="loading"
        :categories="categories"
        :total-count="icons.length"
        :selected-category="selectedCategory"
        :mobile-open="mobileSidebarOpen"
        @select-category="selectedCategory = $event"
        @close-mobile="mobileSidebarOpen = false"
        @open-json-studio="handleOpenJsonStudio"
      />

      <main class="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-3.5rem)]">
        <StudioToolbar
          :theme="theme"
          :search-query="searchQuery"
          :matched-count="filteredIcons.length"
          :total-count="icons.length"
          :style-variant="styleVariant"
          :settings="settings"
          :grid-zoom="gridZoom"
          :click-to-copy="clickToCopy"
          :selected-category="selectedCategory"
          :group-by-category="groupByCategory"
          :show-labels="showLabels"
          @toggle-theme="handleToggleTheme"
          @search-change="searchQuery = $event"
          @style-change="styleVariant = $event"
          @update-settings="handleUpdateSettings"
          @reset-settings="handleResetSettings"
          @grid-zoom-change="gridZoom = $event"
          @toggle-click-to-copy="clickToCopy = !clickToCopy"
          @open-mobile-categories="mobileSidebarOpen = true"
          @view-mode-change="groupByCategory = $event"
          @toggle-labels="showLabels = !showLabels"
        />

        <IconGrid
          :icons="filteredIcons"
          :loading="loading"
          :error="loadError"
          :style-variant="styleVariant"
          :settings="settings"
          :grid-zoom="gridZoom"
          :selected-icon-name="selectedIcon?.name ?? null"
          :copied-icon-name="copiedIconName"
          :group-by-category="groupByCategory && selectedCategory === 'All' && !searchQuery.trim()"
          :selected-category="selectedCategory"
          :show-labels="showLabels"
          @icon-click="handleIconClick"
          @inspect-only="handleInspectOnly"
          @reset-filters="handleResetFilters"
        />

        <!-- Discreet Footer -->
        <footer class="mt-auto px-6 py-6 border-t border-slate-200 dark:border-[#1D222B] text-xs text-slate-500 dark:text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-700 dark:text-[#94A3B8]">Iconix</span>
            <span>&copy; {{ new Date().getFullYear() }}</span>
            <span>&middot;</span>
            <span>Open SVG Icon System</span>
          </div>

          <div class="flex items-center gap-4 text-xs">
            <button
              type="button"
              @click="handleSectionChange('docs')"
              class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
            >
              Documentation
            </button>
            <a
              href="/icons.json"
              target="_blank"
              class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors"
            >
              icons.json
            </a>
            <a
              href="/iconix.json"
              target="_blank"
              class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors"
              title="Official Universal Iconify Collection for Nuxt UI (@nuxt/icon), Next.js (@iconify/react), and Svelte"
            >
              iconix.json (Nuxt & Next.js)
            </a>
            <a
              href="/admin/"
              target="_blank"
              class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors"
            >
              CMS Admin
            </a>
            <button
              type="button"
              @click="handleOpenJsonStudio('add')"
              class="text-slate-400 dark:text-[#475569] hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer flex items-center gap-1"
              title="Maintainer SVG Live Tester & Generator"
            >
              <span>SVG Live Lab</span>
            </button>
          </div>
        </footer>
      </main>

      <InspectorPanel
        v-if="selectedIcon"
        :key="`${selectedIcon.name}-${theme}`"
        :theme="theme"
        :icon="selectedIcon"
        :style-variant="styleVariant"
        :settings="settings"
        @style-change="styleVariant = $event"
        @update-settings="handleUpdateSettings"
        @close="selectedIcon = null"
        @tag-click="handleTagClick"
        @notify="notify"
      />
    </div>

    <!-- JSON Studio Modal -->
    <JsonStudioModal
      v-if="jsonModalOpen"
      :key="jsonModalTab"
      :open="jsonModalOpen"
      :initial-tab="jsonModalTab"
      :icons="icons"
      :is-custom-dataset="isCustomDataset"
      :settings="settings"
      @close="jsonModalOpen = false"
      @replace-dataset="handleReplaceDataset"
      @add-icon="handleAddIcon"
      @restore-built-in="handleRestoreBuiltIn"
      @notify="notify"
    />

    <!-- Feedback Toast -->
    <div
      v-if="toast"
      role="status"
      aria-live="polite"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-white dark:bg-[#121720] border border-slate-200 dark:border-[#252E3D] shadow-xl flex items-center gap-2.5 text-xs font-medium text-slate-900 dark:text-[#F1F5F9]"
    >
      <Check v-if="toast.tone === 'success'" class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF] shrink-0" />
      <Info v-else-if="toast.tone === 'info'" class="w-3.5 h-3.5 text-sky-600 dark:text-[#38BDF8] shrink-0" />
      <AlertCircle v-else-if="toast.tone === 'error'" class="w-3.5 h-3.5 text-red-600 dark:text-[#F87171] shrink-0" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { AlertCircle, Check, Info } from 'lucide-vue-next';
import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';
import {
  buildStyledSvg,
  copySvgToClipboard,
  formatPrettySvg,
  validateIconsJson,
} from '~/utils/svgEngine';

useHead({
  title: 'Iconix — SVG Icon Studio',
  meta: [
    {
      name: 'description',
      content:
        'Dark-mode SVG icon browser supporting Linear, Solid, Dualtone, and Dualtone Linear styles with live stroke, opacity, color, zoom, and instant SVG/PNG export.',
    },
    { property: 'og:title', content: 'Iconix — SVG Icon Studio' },
    {
      property: 'og:description',
      content:
        'Dark-mode SVG icon browser supporting Linear, Solid, Dualtone, and Dualtone Linear styles with live stroke, opacity, color, zoom, and instant SVG/PNG export.',
    },
    { property: 'og:image', content: '/og-iconix.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Iconix — Modern SVG Icon Studio' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/og-iconix.png' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap',
    },
  ],
  bodyAttrs: {
    class:
      'bg-[#F8FAFC] dark:bg-[#090B0E] text-slate-900 dark:text-[#F1F5F9] antialiased selection:bg-[#2DD4BF]/25 selection:text-teal-900 dark:selection:text-[#5EEAD4]',
  },
});

const DARK_DEFAULT_SETTINGS: IconSettings = {
  size: 28,
  strokeWidth: 1.75,
  primaryColor: '#F1F5F9',
  secondaryColor: '#2DD4BF',
  duotoneOpacity: 0.35,
};

const LIGHT_DEFAULT_SETTINGS: IconSettings = {
  size: 28,
  strokeWidth: 1.75,
  primaryColor: '#0F172A',
  secondaryColor: '#0D9488',
  duotoneOpacity: 0.35,
};

const VALID_STYLES = new Set<IconStyleVariant>([
  'linear',
  'line-duotone',
  'solid',
  'duotone',
  'duotone-linear',
]);

const STORAGE_KEY_PREFS = 'iconix_preferences';

interface StoredPreferences {
  theme?: 'dark' | 'light';
  styleVariant?: IconStyleVariant;
  settings?: Partial<IconSettings>;
  gridZoom?: number;
  clickToCopy?: boolean;
  groupByCategory?: boolean;
  showLabels?: boolean;
}

interface ToastState {
  id: number;
  message: string;
  tone: 'success' | 'info' | 'error';
}

interface PageProps {
  initialSection?: 'browse' | 'guide' | 'docs';
}

const pageProps = withDefaults(defineProps<PageProps>(), {
  initialSection: 'browse',
});

const route = useRoute();
const router = useRouter();

const getInitialSection = (): 'browse' | 'guide' | 'docs' => {
  if (pageProps.initialSection && pageProps.initialSection !== 'browse') {
    return pageProps.initialSection;
  }
  const p = (route.path || '').toLowerCase().replace(/\/$/, '');
  if (p === '/docs' || p === '/documentation' || route.query.section === 'docs') return 'docs';
  if (p === '/guide' || p === '/styles' || p === '/style-variants' || route.query.section === 'guide') return 'guide';
  return 'browse';
};

const theme = ref<'dark' | 'light'>('dark');
const icons = useState<IconEntry[]>('iconix-icons', () => []);
const loading = ref(icons.value.length === 0);
const loadError = ref<string | null>(null);
const isCustomDataset = ref(false);

const activeSection = ref<'browse' | 'guide' | 'docs'>(getInitialSection());

const handleSectionChange = (section: 'browse' | 'guide' | 'docs') => {
  activeSection.value = section;
  const targetPath = section === 'docs' ? '/docs' : section === 'guide' ? '/guide' : '/';
  if (route.path !== targetPath) {
    router.push(targetPath);
  }
};

watch(
  () => route.path,
  (newPath) => {
    const p = (newPath || '').toLowerCase().replace(/\/$/, '');
    if (p === '/docs' || p === '/documentation') {
      activeSection.value = 'docs';
    } else if (p === '/guide' || p === '/styles' || p === '/style-variants') {
      activeSection.value = 'guide';
    } else {
      activeSection.value = 'browse';
    }
  }
);

const selectedCategory = ref<string>('All');
const searchQuery = ref<string>('');
const styleVariant = ref<IconStyleVariant>('line-duotone'); // Default: Line Dualtone
const settings = ref<IconSettings>({ ...DARK_DEFAULT_SETTINGS });
const gridZoom = ref<number>(2);
const clickToCopy = ref<boolean>(true);
const groupByCategory = ref<boolean>(false); // Default: flat alphabetical grid
const showLabels = ref<boolean>(false); // Default: tanpa label (klik tag/toggle untuk tampilkan label)

const isHydrated = ref(false);

const savePreferences = () => {
  if (!isHydrated.value || typeof window === 'undefined') return;
  try {
    const data: StoredPreferences = {
      theme: theme.value,
      styleVariant: styleVariant.value,
      settings: settings.value,
      gridZoom: gridZoom.value,
      clickToCopy: clickToCopy.value,
      groupByCategory: groupByCategory.value,
      showLabels: showLabels.value,
    };
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(data));
  } catch {
    // Ignore private browsing or storage quota errors
  }
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedSavePreferences = () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    savePreferences();
    saveTimer = null;
  }, 350);
};

watch(
  [theme, styleVariant, settings, gridZoom, clickToCopy, groupByCategory, showLabels],
  () => {
    debouncedSavePreferences();
  },
  { deep: true }
);

const selectedIcon = ref<IconEntry | null>(null);
const copiedIconName = ref<string | null>(null);
const mobileSidebarOpen = ref(false);

const jsonModalOpen = ref(false);
const jsonModalTab = ref<'guide' | 'import' | 'add' | 'embed'>('guide');
const toast = ref<ToastState | null>(null);

const applyThemeClass = (newTheme: 'dark' | 'light') => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }
};

watch(theme, (newTheme) => {
  applyThemeClass(newTheme);
});

const notify = (message: string, tone: 'success' | 'info' | 'error' = 'success') => {
  const id = Date.now();
  toast.value = { id, message, tone };
  window.setTimeout(() => {
    if (toast.value?.id === id) {
      toast.value = null;
    }
  }, 2400);
};

const fetchBuiltInIcons = async () => {
  if (icons.value.length > 0) {
    loading.value = false;
    return icons.value;
  }
  loading.value = true;
  loadError.value = null;
  try {
    const config = useRuntimeConfig();
    const basePath = (config.app.baseURL || '/').replace(/\/$/, '');
    const response = await fetch(`${basePath}/icons.json`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while loading /icons.json`);
    }
    const data: unknown = await response.json();
    const validation = validateIconsJson(data);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid icons.json format');
    }
    icons.value = validation.icons;
    isCustomDataset.value = false;
    return validation.icons;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load icons.json';
    loadError.value = message;
    return [];
  } finally {
    loading.value = false;
  }
};

const categories = computed(() => {
  const counts = new Map<string, number>();
  for (const icon of icons.value) {
    counts.set(icon.category, (counts.get(icon.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const filteredIcons = computed(() => {
  const rawQ = searchQuery.value.trim().toLowerCase();
  const activeCategory = selectedCategory.value;

  // 1. Filter by active category first
  const baseList = icons.value.filter((icon) => {
    if (activeCategory !== 'All' && icon.category !== activeCategory) {
      return false;
    }
    return true;
  });

  if (!rawQ) {
    return baseList.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 2. Tokenize search query (supports multi-word e.g. "camera off", "arrow down", etc.)
  const tokens = rawQ.replace(/[-_]/g, ' ').split(/\s+/).filter(Boolean);
  const hyphenQ = rawQ.replace(/\s+/g, '-');

  const scoredList: { icon: IconEntry; score: number }[] = [];

  for (const icon of baseList) {
    const name = icon.name.toLowerCase();
    const nameSegments = name.split(/[-_]/);
    const nameWords = nameSegments.join(' ');
    const cat = (icon.category || '').toLowerCase();
    // Exclude brand prefix 'iconix' from tags so searching single letters like 'x', 'i', 'c', 'o', 'n' doesn't match every single icon!
    const tags = (icon.tags || [])
      .map((t) => t.toLowerCase())
      .filter((t) => t !== 'iconix');

    // Check if EVERY token matches name, natural name words, category, or tags (AND-matching)
    const matchesAllTokens = tokens.every((token) => {
      if (token.length === 1) {
        // Single-character query (e.g. 'x'): match distinct segment or exact tag!
        return (
          nameSegments.includes(token) ||
          cat.split(/\s+/).includes(token) ||
          tags.includes(token)
        );
      }
      return (
        name.includes(token) ||
        nameWords.includes(token) ||
        cat.includes(token) ||
        tags.some((t) => t.includes(token))
      );
    });

    if (!matchesAllTokens) continue;

    // Relevance scoring for best search ordering
    let score = 0;
    if (name === rawQ || name === hyphenQ) {
      score += 100; // Exact full match
    } else if (name.startsWith(rawQ) || name.startsWith(hyphenQ)) {
      score += 60; // Name starts with query
    } else if (nameWords.startsWith(rawQ)) {
      score += 50; // Natural words start with query
    } else if (name.includes(rawQ) || name.includes(hyphenQ)) {
      score += 40; // Name contains query as a single chunk
    } else if (tokens.every((t) => name.includes(t))) {
      score += 30; // All tokens exist in name
    } else if (tokens.some((t) => name.includes(t))) {
      score += 20; // Some tokens in name, rest in tags
    } else {
      score += 10; // Matched entirely via tags / category
    }

    scoredList.push({ icon, score });
  }

  return scoredList
    .sort((a, b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name))
    .map((item) => item.icon);
});

const handleUpdateSettings = (patch: Partial<IconSettings>) => {
  settings.value = { ...settings.value, ...patch };
};

const handleToggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark';
  theme.value = next;

  const curr = settings.value;
  const isDefaultLightInk = curr.primaryColor.toUpperCase() === '#F1F5F9';
  const isDefaultDarkInk = curr.primaryColor.toUpperCase() === '#0F172A';
  if (next === 'light' && isDefaultLightInk) {
    settings.value = {
      ...curr,
      primaryColor: '#0F172A',
      secondaryColor: curr.secondaryColor === '#2DD4BF' ? '#0D9488' : curr.secondaryColor,
    };
  } else if (next === 'dark' && isDefaultDarkInk) {
    settings.value = {
      ...curr,
      primaryColor: '#F1F5F9',
      secondaryColor: curr.secondaryColor === '#0D9488' ? '#2DD4BF' : curr.secondaryColor,
    };
  }
};

const handleResetSettings = () => {
  settings.value = theme.value === 'dark' ? { ...DARK_DEFAULT_SETTINGS } : { ...LIGHT_DEFAULT_SETTINGS };
  gridZoom.value = 2;
  styleVariant.value = 'line-duotone';
  groupByCategory.value = false;
  showLabels.value = false;
  selectedCategory.value = 'All';
  searchQuery.value = '';
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFS);
    } catch {}
  }
  notify('Studio view & settings reset to defaults', 'info');
};

const handleResetFilters = () => {
  selectedCategory.value = 'All';
  searchQuery.value = '';
};

const handleResetAll = () => {
  handleResetFilters();
  selectedIcon.value = null;
};

const handleIconClick = async (icon: IconEntry) => {
  selectedIcon.value = icon;

  if (!clickToCopy.value) {
    return;
  }

  const svgCode = formatPrettySvg(
    buildStyledSvg(icon.svg, styleVariant.value, settings.value, {
      uniqueSuffix: `copy-${icon.name}`,
    })
  );

  try {
    await copySvgToClipboard(svgCode);
    copiedIconName.value = icon.name;
    window.setTimeout(() => {
      if (copiedIconName.value === icon.name) {
        copiedIconName.value = null;
      }
    }, 1300);
    notify(`Copied SVG for "${icon.name}"`);
  } catch {
    notify('Clipboard blocked by browser — copy from preview panel', 'info');
  }
};

const handleInspectOnly = (icon: IconEntry) => {
  selectedIcon.value = icon;
};

const handleOpenJsonStudio = (tab: 'guide' | 'import' | 'add' | 'embed' = 'guide') => {
  jsonModalTab.value = tab;
  jsonModalOpen.value = true;
};

const handleReplaceDataset = (newIcons: IconEntry[]) => {
  icons.value = newIcons;
  isCustomDataset.value = true;
  selectedCategory.value = 'All';
  searchQuery.value = '';
  selectedIcon.value = newIcons[0] ?? null;
};

const handleAddIcon = (newIcon: IconEntry) => {
  const withoutDup = icons.value.filter((i) => i.name !== newIcon.name);
  icons.value = [newIcon, ...withoutDup];
  selectedIcon.value = newIcon;
  activeSection.value = 'browse';
};

const handleRestoreBuiltIn = async () => {
  const restored = await fetchBuiltInIcons();
  selectedCategory.value = 'All';
  searchQuery.value = '';
  selectedIcon.value = null;
  if (restored.length > 0) {
    notify(`Restored built-in icons.json (${restored.length} icons)`, 'info');
  }
};

const handleStyleSelectAndBrowse = (style: IconStyleVariant) => {
  styleVariant.value = style;
  activeSection.value = 'browse';
};

const handleTagClick = (tag: string) => {
  selectedCategory.value = 'All';
  searchQuery.value = tag;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (jsonModalOpen.value) {
      jsonModalOpen.value = false;
    } else if (selectedIcon.value) {
      selectedIcon.value = null;
    }
  }
};

onMounted(() => {
  // 1. Restore saved studio preferences from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PREFS);
    if (saved) {
      const parsed = JSON.parse(saved) as StoredPreferences;
      if (parsed.theme === 'dark' || parsed.theme === 'light') {
        theme.value = parsed.theme;
      }
      if (parsed.styleVariant && VALID_STYLES.has(parsed.styleVariant)) {
        styleVariant.value = parsed.styleVariant;
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        const s = parsed.settings;
        const base = theme.value === 'dark' ? DARK_DEFAULT_SETTINGS : LIGHT_DEFAULT_SETTINGS;
        settings.value = {
          size: typeof s.size === 'number' && s.size >= 16 && s.size <= 64 ? s.size : base.size,
          strokeWidth: typeof s.strokeWidth === 'number' && s.strokeWidth >= 0.75 && s.strokeWidth <= 3 ? s.strokeWidth : base.strokeWidth,
          primaryColor: typeof s.primaryColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(s.primaryColor) ? s.primaryColor : base.primaryColor,
          secondaryColor: typeof s.secondaryColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(s.secondaryColor) ? s.secondaryColor : base.secondaryColor,
          duotoneOpacity: typeof s.duotoneOpacity === 'number' && s.duotoneOpacity >= 0.1 && s.duotoneOpacity <= 1 ? s.duotoneOpacity : base.duotoneOpacity,
        };
      }
      if (typeof parsed.gridZoom === 'number' && parsed.gridZoom >= 1 && parsed.gridZoom <= 4) {
        gridZoom.value = parsed.gridZoom;
      }
      if (typeof parsed.clickToCopy === 'boolean') {
        clickToCopy.value = parsed.clickToCopy;
      }
      if (typeof parsed.groupByCategory === 'boolean') {
        groupByCategory.value = parsed.groupByCategory;
      }
      if (typeof parsed.showLabels === 'boolean') {
        showLabels.value = parsed.showLabels;
      }
    }
  } catch {
    // Ignore localStorage read errors
  }

  isHydrated.value = true;
  applyThemeClass(theme.value);
  window.addEventListener('keydown', handleKeyDown);

  fetchBuiltInIcons().then((loadedIcons) => {
    if (loadedIcons.length === 0) return;

    // 2. URL parameters take precedence over stored preferences for shared links
    const params = new URLSearchParams(window.location.search);
    const sharedStyle = params.get('style') as IconStyleVariant | null;
    if (sharedStyle && VALID_STYLES.has(sharedStyle)) {
      styleVariant.value = sharedStyle;
    }

    const patch: Partial<IconSettings> = {};
    const sizeParam = Number(params.get('size'));
    if (Number.isFinite(sizeParam) && sizeParam >= 16 && sizeParam <= 64) {
      patch.size = sizeParam;
    }
    const strokeParam = Number(params.get('stroke'));
    if (Number.isFinite(strokeParam) && strokeParam >= 0.75 && strokeParam <= 3) {
      patch.strokeWidth = strokeParam;
    }
    const opacityParam = Number(params.get('opacity'));
    if (Number.isFinite(opacityParam) && opacityParam >= 0.1 && opacityParam <= 1) {
      patch.duotoneOpacity = opacityParam;
    }
    const colorParam = params.get('color');
    if (colorParam && /^#[0-9a-fA-F]{6}$/.test(colorParam)) {
      patch.primaryColor = colorParam;
    }
    const toneParam = params.get('tone');
    if (toneParam && /^#[0-9a-fA-F]{6}$/.test(toneParam)) {
      patch.secondaryColor = toneParam;
    }
    if (Object.keys(patch).length > 0) {
      settings.value = { ...settings.value, ...patch };
    }

    const iconParam = params.get('icon');
    if (iconParam) {
      const found = loadedIcons.find((i) => i.name === iconParam);
      if (found) {
        selectedIcon.value = found;
      }
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
