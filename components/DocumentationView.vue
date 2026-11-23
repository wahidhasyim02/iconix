<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#090B0E] text-slate-900 dark:text-[#F1F5F9] pb-24 transition-colors">
    <!-- Header Hero Banner -->
    <section class="border-b border-slate-200 dark:border-[#1D222B] bg-white/70 dark:bg-[#0C0F14]/70 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-[#0F2926] text-teal-700 dark:text-[#2DD4BF] border border-teal-200 dark:border-[#1E4D47]">
            <Sparkles class="w-3.5 h-3.5" />
            <span>Developer &amp; Integration Guide</span>
          </span>
          <span class="text-xs font-mono text-slate-500 dark:text-[#64748B]">
            v1.0 &middot; {{ milestoneCount }} Vector Icons
          </span>
        </div>

        <div class="space-y-3 max-w-3xl">
          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
            Build Faster with <span class="text-teal-600 dark:text-[#2DD4BF]">&lt;ix-icon&gt;</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            Iconix offers four unified styles from a single SVG source. Integrate via modern zero-build Web Components, drop-in Vue 3 / React wrappers, or direct REST API data streaming.
          </p>
        </div>

        <!-- Quick Jump Nav Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pt-2 pb-1 text-xs font-medium no-scrollbar">
          <button
            v-for="tab in DOC_TABS"
            :key="tab.id"
            type="button"
            @click="activeTab = tab.id"
            class="px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5"
            :class="activeTab === tab.id
              ? 'bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] font-semibold shadow-xs'
              : 'bg-slate-100 dark:bg-[#13171F] border border-slate-200 dark:border-[#1D222B] text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-200/60 dark:hover:bg-[#1A202C]'"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5 shrink-0" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Main Content Container with Sticky Side Navigation -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Sidebar Navigation (Desktop) -->
        <aside class="hidden lg:block lg:col-span-3 sticky top-20 space-y-6">
          <div class="p-4 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-1">
            <div class="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-[#64748B] px-3 pb-2 border-b border-slate-100 dark:border-[#181D26]">
              Documentation Index
            </div>
            <button
              v-for="tab in DOC_TABS"
              :key="tab.id"
              type="button"
              @click="activeTab = tab.id"
              class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer"
              :class="activeTab === tab.id
                ? 'bg-teal-50 dark:bg-[#151C24] text-teal-700 dark:text-[#2DD4BF] font-semibold ring-1 ring-teal-500/20'
                : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#13171E] hover:text-slate-900 dark:hover:text-[#F1F5F9]'"
            >
              <div class="flex items-center gap-2 truncate">
                <component :is="tab.icon" class="w-3.5 h-3.5 shrink-0" />
                <span class="truncate">{{ tab.label }}</span>
              </div>
              <ChevronRight v-if="activeTab === tab.id" class="w-3.5 h-3.5 shrink-0 text-teal-600 dark:text-[#2DD4BF]" />
            </button>
          </div>

          <!-- Quick Action Card -->
          <div class="p-4 rounded-xl bg-linear-to-br from-teal-500/10 to-transparent border border-teal-500/20 space-y-3">
            <div class="text-xs font-semibold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-1.5">
              <Compass class="w-3.5 h-3.5 text-teal-600 dark:text-[#2DD4BF]" />
              <span>Explore All Icons</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              Looking for a specific icon? Browse our complete {{ milestoneCount }} icon catalog ({{ totalCount }} icons) with instant copy &amp; search.
            </p>
            <button
              type="button"
              @click="$emit('navigate-to-browse')"
              class="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors cursor-pointer"
            >
              <span>Back to Library</span>
              <ArrowRight class="w-3 h-3" />
            </button>
          </div>
        </aside>

        <!-- Main Tab Content Area -->
        <main class="lg:col-span-9 min-w-0 space-y-12">
          <!-- TAB 1: WEB COMPONENT (<ix-icon>) -->
          <section v-if="activeTab === 'web-component'" class="space-y-10">
            <div class="space-y-3">
              <h2 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2.5">
                <Code2 class="w-6 h-6 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Zero-Build Web Component (&lt;ix-icon&gt;)</span>
              </h2>
              <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                The fastest way to use Iconix icons in any HTML page, CMS, Webflow, WordPress, or modern SPA. No bundler or package installation required.
              </p>
            </div>

            <!-- Two Step Quickstart -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal-100 dark:bg-[#142927] text-teal-700 dark:text-[#2DD4BF] font-mono text-xs font-bold flex items-center justify-center">1</span>
                    <h3 class="font-display text-sm font-semibold text-slate-900 dark:text-[#F1F5F9]">Include Loader Script</h3>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-[#64748B] leading-relaxed">
                    Paste this lightweight (~1.5 KB) loader module once before your closing <code class="font-mono text-teal-600">&lt;/body&gt;</code> tag.
                  </p>
                </div>
                <div class="relative">
                  <CodeBlock :code="LOADER_SCRIPT_SNIPPET" lang="html" @copied="$emit('notify', 'Copied loader script to clipboard')" />
                </div>
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3 flex flex-col justify-between">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-teal-100 dark:bg-[#142927] text-teal-700 dark:text-[#2DD4BF] font-mono text-xs font-bold flex items-center justify-center">2</span>
                    <h3 class="font-display text-sm font-semibold text-slate-900 dark:text-[#F1F5F9]">Render Any Icon</h3>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-[#64748B] leading-relaxed">
                    Place <code class="font-mono text-teal-600">&lt;ix-icon&gt;</code> wherever you need an icon. Select any of the 4 adaptive styles via <code class="font-mono text-teal-600">variant</code>.
                  </p>
                </div>
                <div class="relative">
                  <CodeBlock :code="CALL_TAGS_SNIPPET" lang="html" @copied="$emit('notify', 'Copied <ix-icon> tag example')" />
                </div>
              </div>
            </div>

            <!-- Live Interactive Sandbox -->
            <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#181D26] pb-4">
                <div>
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
                    <Sliders class="w-4 h-4 text-teal-600 dark:text-[#2DD4BF]" />
                    <span>Interactive &lt;ix-icon&gt; Sandbox</span>
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-[#64748B] mt-0.5">
                    Customize properties below and watch the live Web Component update immediately.
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-xs text-slate-500 dark:text-[#64748B]">Select Icon:</label>
                  <select
                    v-model="sandboxIcon"
                    class="px-2.5 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-[#141822] border border-slate-200 dark:border-[#222B3A] text-slate-900 dark:text-[#F1F5F9] font-mono cursor-pointer focus:outline-teal-500"
                  >
                    <option v-for="name in SAMPLE_ICON_NAMES" :key="name" :value="name">{{ name }}</option>
                  </select>
                </div>
              </div>

              <!-- Live Preview Stage & Code Side-by-side -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <!-- Visual Canvas -->
                <div class="md:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-slate-100/70 dark:bg-[#080A0E] border border-slate-200 dark:border-[#181D26] min-h-[220px]">
                  <div
                    class="transition-transform duration-200"
                    :style="{ color: sandboxColor === 'currentColor' ? (sandboxDark ? '#2DD4BF' : '#0D9488') : sandboxColor }"
                  >
                    <!-- Actual Live Web Component -->
                    <ix-icon
                      :name="sandboxIcon"
                      :variant="sandboxVariant"
                      :size="sandboxSize"
                      :stroke="sandboxStroke"
                    />
                  </div>
                  <div class="mt-4 font-mono text-[11px] text-slate-500 dark:text-[#64748B] text-center">
                    &lt;ix-icon name="{{ sandboxIcon }}" variant="{{ sandboxVariant }}" size="{{ sandboxSize }}"&gt;
                  </div>
                </div>

                <!-- Controls & Live Code Block -->
                <div class="md:col-span-7 space-y-4">
                  <!-- Variant Selector -->
                  <div class="space-y-1.5">
                    <span class="text-xs font-semibold text-slate-700 dark:text-[#CBD5E1]">Style Variant (variant)</span>
                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      <button
                        v-for="v in VARIANTS"
                        :key="v"
                        type="button"
                        @click="sandboxVariant = v"
                        class="px-2 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer text-center"
                        :class="sandboxVariant === v
                          ? 'bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] font-bold shadow-xs'
                          : 'bg-slate-100 dark:bg-[#141822] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#1B2230]'"
                      >
                        {{ v === 'line-duotone' ? 'Line Duo' : v === 'duotone-linear' ? 'Duo Line' : v }}
                      </button>
                    </div>
                  </div>

                  <!-- Size & Stroke Sliders -->
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between text-xs text-slate-600 dark:text-[#94A3B8]">
                        <span>Size: <strong class="font-mono text-slate-900 dark:text-[#F1F5F9]">{{ sandboxSize }}px</strong></span>
                      </div>
                      <input
                        type="range"
                        v-model.number="sandboxSize"
                        min="16"
                        max="64"
                        step="4"
                        class="w-full studio-slider"
                      />
                    </div>
                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between text-xs text-slate-600 dark:text-[#94A3B8]">
                        <span>Stroke: <strong class="font-mono text-slate-900 dark:text-[#F1F5F9]">{{ sandboxStroke }}px</strong></span>
                      </div>
                      <input
                        type="range"
                        v-model.number="sandboxStroke"
                        min="1"
                        max="3.5"
                        step="0.25"
                        class="w-full studio-slider"
                      />
                    </div>
                  </div>

                  <!-- Live Snippet Output -->
                  <div class="space-y-1.5 pt-2">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-semibold text-slate-700 dark:text-[#CBD5E1]">Ready-to-Use Tag</span>
                    </div>
                    <CodeBlock :code="generatedTagSnippet" lang="html" @copied="$emit('notify', 'Copied tag from sandbox!')" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- TAB 2: FRAMEWORKS (VUE, REACT, HTML) -->
          <section v-else-if="activeTab === 'frameworks'" class="space-y-10">
            <div class="space-y-3">
              <h2 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2.5">
                <Layers class="w-6 h-6 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Modern Framework Integration</span>
              </h2>
              <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Seamless drop-in recipes for your favorite frontend framework with full TypeScript support and reactive props.
              </p>
            </div>

            <!-- Framework Tabs -->
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-[#1D222B] pb-3 overflow-x-auto">
              <button
                v-for="fw in ['nuxt', 'vue', 'react', 'vanilla']"
                :key="fw"
                type="button"
                @click="frameworkTab = fw"
                class="px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                :class="frameworkTab === fw
                  ? 'bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312]'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-[#13171E]'"
              >
                {{ fw === 'nuxt' ? 'Nuxt UI & @nuxt/icon' : fw === 'vue' ? 'Vue 3 / <ix-icon>' : fw === 'react' ? 'React / Next.js' : 'Vanilla HTML / CMS' }}
              </button>
            </div>

            <!-- Nuxt UI & @nuxt/icon Guide -->
            <div v-if="frameworkTab === 'nuxt'" class="space-y-6">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">Option 1: Automatic via Remote Collection (Zero Local Files)</h3>
                    <span class="text-[11px] font-mono text-teal-600 dark:text-[#2DD4BF] bg-teal-50 dark:bg-[#0F2926] px-2 py-0.5 rounded font-semibold">Recommended</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    Create a single plugin file <code class="font-mono text-teal-600">plugins/iconix.client.ts</code> in your Nuxt project. Iconify automatically loads all {{ milestoneCount }} Iconix icons directly from the <code class="font-mono text-teal-600">/iconix.json</code> endpoint:
                  </p>
                </div>
                <CodeBlock :code="NUXT_UI_PLUGIN_SNIPPET" lang="typescript" @copied="$emit('notify', 'Copied Nuxt client plugin recipe')" />
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">Usage in Nuxt UI &lt;UIcon&gt; Components</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    Call any icon using the <code class="font-mono text-teal-600">i-iconix-[name]</code> prefix. The icon color automatically inherits standard Tailwind CSS text color classes:
                  </p>
                </div>
                <CodeBlock :code="NUXT_UI_USAGE_SNIPPET" lang="html" @copied="$emit('notify', 'Copied Nuxt UI usage snippet')" />
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">Option 2: Offline via Nuxt customCollections</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    If you prefer keeping local SVG files within your project repository, configure the official <code class="font-mono text-teal-600">@nuxt/icon</code> module in <code class="font-mono text-teal-600">nuxt.config.ts</code>:
                  </p>
                </div>
                <CodeBlock :code="NUXT_CUSTOM_COLLECTION_SNIPPET" lang="typescript" @copied="$emit('notify', 'Copied customCollections snippet')" />
              </div>
            </div>

            <!-- Vue 3 / Nuxt 3 Guide -->
            <div v-if="frameworkTab === 'vue'" class="space-y-6">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">1. Nuxt 3 Custom Element Configuration</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    In your <code class="font-mono text-teal-600">nuxt.config.ts</code>, tell the Vue compiler that <code class="font-mono text-teal-600">&lt;ix-icon&gt;</code> is a custom element:
                  </p>
                </div>
                <CodeBlock :code="NUXT_CONFIG_SNIPPET" lang="typescript" @copied="$emit('notify', 'Copied Nuxt config recipe')" />
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">2. Client Plugin Registration</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    Save this file as <code class="font-mono text-teal-600">plugins/ix-icon.client.ts</code> so the custom element loads seamlessly on the client:
                  </p>
                </div>
                <CodeBlock :code="VUE_PLUGIN_SNIPPET" lang="typescript" @copied="$emit('notify', 'Copied Vue client plugin recipe')" />
              </div>
            </div>

            <!-- React / Next.js Guide -->
            <div v-else-if="frameworkTab === 'react'" class="space-y-6">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">React TSX Wrapper Component</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    Create a typed wrapper component <code class="font-mono text-teal-600">components/IconixIcon.tsx</code> compatible with Next.js App Router:
                  </p>
                </div>
                <CodeBlock :code="REACT_WRAPPER_SNIPPET" lang="tsx" @copied="$emit('notify', 'Copied React TSX wrapper recipe')" />
              </div>
            </div>

            <!-- Vanilla HTML Guide -->
            <div v-else class="space-y-6">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
                <div class="space-y-1">
                  <h3 class="font-display text-base font-bold text-slate-900 dark:text-[#F1F5F9]">Full HTML Boilerplate</h3>
                  <p class="text-xs text-slate-600 dark:text-[#94A3B8]">
                    A complete minimal HTML5 document illustrating zero-build integration:
                  </p>
                </div>
                <CodeBlock :code="VANILLA_HTML_SNIPPET" lang="html" @copied="$emit('notify', 'Copied Vanilla HTML boilerplate')" />
              </div>
            </div>
          </section>

          <!-- TAB 3: ATTRIBUTES & API REFERENCE -->
          <section v-else-if="activeTab === 'attributes'" class="space-y-10">
            <div class="space-y-3">
              <h2 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2.5">
                <BookOpen class="w-6 h-6 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Attributes &amp; Customization API</span>
              </h2>
              <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Full reference of all attributes supported by the <code class="font-mono text-teal-600">&lt;ix-icon&gt;</code> element.
              </p>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1D222B] bg-white dark:bg-[#0D1016]">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-[#12161F] border-b border-slate-200 dark:border-[#1D222B] text-slate-700 dark:text-[#CBD5E1] font-semibold">
                  <tr>
                    <th class="px-4 py-3.5">Attribute</th>
                    <th class="px-4 py-3.5">Type</th>
                    <th class="px-4 py-3.5">Default</th>
                    <th class="px-4 py-3.5">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-[#181D26] text-slate-600 dark:text-[#94A3B8]">
                  <tr v-for="attr in ATTRIBUTES_TABLE" :key="attr.name" class="hover:bg-slate-50/50 dark:hover:bg-[#11141B]/50 transition-colors">
                    <td class="px-4 py-3 font-mono font-bold text-teal-700 dark:text-[#2DD4BF]">{{ attr.name }}</td>
                    <td class="px-4 py-3 font-mono text-slate-500 dark:text-[#64748B]">{{ attr.type }}</td>
                    <td class="px-4 py-3 font-mono text-amber-700 dark:text-amber-400">{{ attr.default }}</td>
                    <td class="px-4 py-3 leading-relaxed">{{ attr.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Deep Dive: Color & CurrentColor -->
            <div class="p-6 rounded-xl bg-slate-50 dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
              <h3 class="font-display text-sm font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
                <Palette class="w-4 h-4 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Automatic Color Inheritance (currentColor)</span>
              </h3>
              <p class="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                By default, all Iconix icons inherit the text color of their parent container (<code class="font-mono text-teal-600">currentColor</code>). This means you can change the icon color simply using CSS or Tailwind text utilities like <code class="font-mono text-teal-600">class="text-indigo-600 hover:text-indigo-400"</code> without touching SVG markup.
              </p>
              <div class="p-4 rounded-lg bg-slate-100 dark:bg-[#07090D] border border-slate-200 dark:border-[#1D222B] flex flex-wrap items-center gap-6">
                <div class="flex items-center gap-2 text-rose-500 font-semibold text-xs">
                  <ix-icon name="apple" variant="duotone-linear" size="24" />
                  <span>class="text-rose-500"</span>
                </div>
                <div class="flex items-center gap-2 text-teal-500 font-semibold text-xs">
                  <ix-icon name="apple" variant="duotone-linear" size="24" />
                  <span>class="text-teal-500"</span>
                </div>
                <div class="flex items-center gap-2 text-amber-500 font-semibold text-xs">
                  <ix-icon name="apple" variant="duotone-linear" size="24" />
                  <span>class="text-amber-500"</span>
                </div>
              </div>
            </div>
          </section>

          <!-- TAB 4: JSON SCHEMA & API -->
          <section v-else-if="activeTab === 'api'" class="space-y-10">
            <div class="space-y-3">
              <h2 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2.5">
                <FileJson class="w-6 h-6 text-teal-600 dark:text-[#2DD4BF]" />
                <span>JSON Schema &amp; CDN Data Endpoint</span>
              </h2>
              <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Every icon in Iconix is stored and served via a high-performance, single-file JSON catalog hosted on our edge CDN.
              </p>
            </div>

            <!-- CDN Endpoints Card -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-700 dark:text-[#CBD5E1]">Iconix Studio Endpoint</span>
                  <span class="text-[11px] font-mono text-teal-600 dark:text-[#2DD4BF] bg-teal-50 dark:bg-[#0F2926] px-2 py-0.5 rounded font-semibold">Studio Data</span>
                </div>
                <div class="p-3 rounded-lg bg-slate-100 dark:bg-[#080A0E] border border-slate-200 dark:border-[#1D222B] font-mono text-xs flex items-center justify-between">
                  <span class="text-slate-900 dark:text-[#F1F5F9] truncate">/icons.json</span>
                  <a
                    href="/icons.json"
                    target="_blank"
                    class="shrink-0 ml-2 px-2.5 py-1 rounded bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-[11px] font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors"
                  >
                    View
                  </a>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-[#64748B]">
                  Complete dataset containing categories, tags, and raw SVG vector markup.
                </p>
              </div>

              <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-700 dark:text-[#CBD5E1]">Nuxt UI &amp; Iconify Endpoint</span>
                  <span class="text-[11px] font-mono text-teal-600 dark:text-[#2DD4BF] bg-teal-50 dark:bg-[#0F2926] px-2 py-0.5 rounded font-semibold">Iconify Spec</span>
                </div>
                <div class="p-3 rounded-lg bg-slate-100 dark:bg-[#080A0E] border border-slate-200 dark:border-[#1D222B] font-mono text-xs flex items-center justify-between">
                  <span class="text-slate-900 dark:text-[#F1F5F9] truncate">/iconix.json</span>
                  <a
                    href="/iconix.json"
                    target="_blank"
                    class="shrink-0 ml-2 px-2.5 py-1 rounded bg-teal-600 dark:bg-[#2DD4BF] text-white dark:text-[#071312] text-[11px] font-semibold hover:bg-teal-700 dark:hover:bg-[#5EEAD4] transition-colors"
                  >
                    View
                  </a>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-[#64748B]">
                  Official Iconify collection format with automatic <code class="font-mono text-teal-600">currentColor</code> for Nuxt UI &amp; @nuxt/icon.
                </p>
              </div>
            </div>

            <!-- TypeScript Schema Interface -->
            <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3">
              <h3 class="font-display text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">TypeScript Interface</h3>
              <CodeBlock :code="TS_INTERFACE_SNIPPET" lang="typescript" @copied="$emit('notify', 'Copied TypeScript interface')" />
            </div>

            <!-- JSON Schema Example -->
            <div class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-3">
              <h3 class="font-display text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">Payload Structure Example</h3>
              <CodeBlock :code="JSON_PAYLOAD_EXAMPLE" lang="json" @copied="$emit('notify', 'Copied JSON payload example')" />
            </div>
          </section>

          <!-- TAB 5: FIGMA GUIDELINES -->
          <section v-else-if="activeTab === 'figma'" class="space-y-10">
            <div class="space-y-3">
              <h2 class="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2.5">
                <Figma class="w-6 h-6 text-teal-600 dark:text-[#2DD4BF]" />
                <span>Figma &amp; Icon Design Guidelines</span>
              </h2>
              <p class="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Rules and best practices for authoring icons in Figma to ensure perfect rendering across all 5 style variants.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="guide in FIGMA_RULES"
                :key="guide.title"
                class="p-5 rounded-xl bg-white dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-2.5"
              >
                <div class="flex items-center gap-2 text-teal-600 dark:text-[#2DD4BF]">
                  <CheckCircle2 class="w-4 h-4 shrink-0" />
                  <h3 class="font-display text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">{{ guide.title }}</h3>
                </div>
                <p class="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                  {{ guide.description }}
                </p>
              </div>
            </div>

            <!-- Duotone Role Annotation Guide -->
            <div class="p-6 rounded-xl bg-slate-50 dark:bg-[#0D1016] border border-slate-200 dark:border-[#1D222B] space-y-4">
              <h3 class="font-display text-sm font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
                <Layers class="w-4 h-4 text-teal-600 dark:text-[#2DD4BF]" />
                <span>How Duotone &amp; Cutout Layering Works</span>
              </h3>
              <p class="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Iconix automatically detects the base silhouette (closed outer path) and renders it at 25% opacity in duotone variants. For complex composite shapes with holes or inner lines, you can annotate SVG attributes directly:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div class="p-3 rounded-lg bg-slate-100 dark:bg-[#080A0E] border border-slate-200 dark:border-[#1D222B] space-y-1">
                  <div class="text-teal-600 dark:text-[#2DD4BF] font-bold">data-duotone="base"</div>
                  <div class="text-slate-500 dark:text-[#64748B] font-sans">Identifies the primary filled background shape.</div>
                </div>
                <div class="p-3 rounded-lg bg-slate-100 dark:bg-[#080A0E] border border-slate-200 dark:border-[#1D222B] space-y-1">
                  <div class="text-teal-600 dark:text-[#2DD4BF] font-bold">data-cutout="true"</div>
                  <div class="text-slate-500 dark:text-[#64748B] font-sans">Carves transparent negative space in Solid variant.</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- Clean Footer on Documentation Page -->
      <footer class="mt-16 pt-8 border-t border-slate-200 dark:border-[#1D222B] text-xs text-slate-500 dark:text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="font-medium text-slate-700 dark:text-[#94A3B8]">Iconix</span>
          <span>&copy; {{ new Date().getFullYear() }}</span>
          <span>&middot;</span>
          <span>Open SVG Icon System</span>
        </div>

        <div class="flex items-center gap-4 text-xs">
          <button
            type="button"
            @click="$emit('navigate-to-browse')"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors cursor-pointer"
          >
            Explore Icons
          </button>
          <a
            href="/icons.json"
            target="_blank"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors"
          >
            icons.json
          </a>
          <a
            href="/admin/"
            target="_blank"
            class="hover:text-teal-600 dark:hover:text-[#2DD4BF] transition-colors"
          >
            CMS Admin
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import {
  Code2,
  Sliders,
  Layers,
  BookOpen,
  FileJson,
  Figma,
  Sparkles,
  ChevronRight,
  Compass,
  ArrowRight,
  CheckCircle2,
  Palette,
} from 'lucide-vue-next';
import type { IconEntry, IconSettings, IconStyleVariant } from '~/types/icon';
import { formatIconMilestone } from '~/utils/svgEngine';
import CodeBlock from '~/components/CodeBlock.vue';

interface Props {
  icons?: IconEntry[];
  settings?: IconSettings;
}

const props = defineProps<Props>();

const totalCount = computed(() => props.icons?.length ?? 88);
const milestoneCount = computed(() => formatIconMilestone(totalCount.value));

defineEmits<{
  'notify': [message: string];
  'navigate-to-browse': [];
}>();

const activeTab = ref<'web-component' | 'frameworks' | 'attributes' | 'api' | 'figma'>('web-component');
const frameworkTab = ref<'nuxt' | 'vue' | 'react' | 'vanilla'>('nuxt');

const DOC_TABS = [
  { id: 'web-component', label: 'Web Component (<ix-icon>)', icon: Code2 },
  { id: 'frameworks', label: 'Framework Integration', icon: Layers },
  { id: 'attributes', label: 'Attributes & API Reference', icon: BookOpen },
  { id: 'api', label: 'JSON Schema & CDN', icon: FileJson },
  { id: 'figma', label: 'Figma Design Guidelines', icon: Figma },
] as const;

// Interactive Sandbox State
const SAMPLE_ICON_NAMES = ['circle-plus', 'apple', 'siren', 'ambulance', 'anchor', 'air-vent', 'alarm-clock-sleep', 'arrow-big-up-dash'];
const VARIANTS: IconStyleVariant[] = ['linear', 'line-duotone', 'solid', 'duotone', 'duotone-linear'];

const sandboxIcon = ref('circle-plus');
const sandboxVariant = ref<IconStyleVariant>('duotone-linear');
const sandboxSize = ref(36);
const sandboxStroke = ref(2);
const sandboxColor = ref('currentColor');
const sandboxDark = ref(true);

const siteOrigin = ref(typeof window !== 'undefined' ? window.location.origin : '');
onMounted(() => {
  if (typeof window !== 'undefined' && window.location.origin) {
    siteOrigin.value = window.location.origin;
  }
});

const generatedTagSnippet = computed(() => {
  return `<ix-icon name="${sandboxIcon.value}" variant="${sandboxVariant.value}" size="${sandboxSize.value}" stroke="${sandboxStroke.value}"></ix-icon>`;
});

// Snippets
const LOADER_SCRIPT_SNIPPET = computed(() => `<!-- 1. Include this loader script once in your HTML -->
<script type="module">
  const res = await fetch('${siteOrigin.value}/icons.json');
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.icons || []);
  const map = new Map(list.map(i => [i.name, i.svg]));

  class IxIcon extends HTMLElement {
    connectedCallback() {
      const name = (this.getAttribute('name') || '').replace(/^(iconix:|ix:|iconix:)/, '');
      const size = this.getAttribute('size') || '24';
      const stroke = this.getAttribute('stroke') || '2';
      const variant = (this.getAttribute('variant') || 'linear').trim();
      const color = this.getAttribute('color') || 'currentColor';
      const tone = this.getAttribute('tone') || this.getAttribute('secondary') || color;
      const raw = map.get(name);
      if (!raw) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);

      const elements = svg.querySelectorAll('path, circle, rect, polygon, ellipse, line');
      if (variant === 'solid') {
        const isClosed = (e) => e.tagName.toLowerCase() !== 'line' && (e.tagName.toLowerCase() === 'circle' || e.tagName.toLowerCase() === 'rect' || (e.getAttribute('d') && /z\\s*$/i.test(e.getAttribute('d').trim())));
        const closed = Array.from(elements).find(isClosed);
        const cutouts = Array.from(elements).filter(e => e !== closed);
        if (closed && cutouts.length > 0) {
          const mId = 'ix-m-' + Math.random().toString(36).slice(2, 8);
          const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
          mask.setAttribute('id', mId);
          mask.setAttribute('maskUnits', 'userSpaceOnUse');
          mask.innerHTML = '<rect width="24" height="24" fill="white"/>';
          cutouts.forEach(c => {
            const clone = c.cloneNode(true);
            const closedCutout = isClosed(c);
            clone.setAttribute('fill', closedCutout ? 'black' : 'none');
            clone.setAttribute('stroke', 'black');
            clone.setAttribute('stroke-width', stroke);
            clone.setAttribute('stroke-linecap', 'round');
            clone.setAttribute('stroke-linejoin', 'round');
            mask.appendChild(clone);
            c.remove();
          });
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          defs.appendChild(mask);
          svg.prepend(defs);
          closed.setAttribute('fill', color);
          closed.setAttribute('stroke', color);
          closed.setAttribute('stroke-width', stroke);
          closed.setAttribute('mask', 'url(#' + mId + ')');
        } else if (closed) {
          closed.setAttribute('fill', color);
          closed.setAttribute('stroke', color);
          closed.setAttribute('stroke-width', stroke);
        }
      } else {
        elements.forEach((el, idx) => {
          const isClosed = el.tagName.toLowerCase() !== 'line' && (el.tagName.toLowerCase() === 'circle' || el.tagName.toLowerCase() === 'rect' || (el.getAttribute('d') && /z\\s*$/i.test(el.getAttribute('d').trim())));
          const isBase = el.getAttribute('data-duotone') === 'base' || idx === 0;

          if (variant === 'line-duotone') {
            if (isBase) {
              el.setAttribute('fill', 'none');
              el.setAttribute('stroke', tone);
              el.setAttribute('stroke-opacity', '0.35');
              el.setAttribute('stroke-width', stroke);
            } else {
              el.setAttribute('fill', 'none');
              el.setAttribute('stroke', color);
              el.setAttribute('stroke-width', stroke);
            }
          } else if (variant === 'duotone' && isBase && isClosed) {
            el.setAttribute('fill', tone);
            el.setAttribute('fill-opacity', '0.25');
            el.removeAttribute('stroke');
          } else if (variant === 'duotone-linear' && isBase && isClosed) {
            el.setAttribute('fill', tone);
            el.setAttribute('fill-opacity', '0.25');
            el.setAttribute('stroke', color);
            el.setAttribute('stroke-width', stroke);
          } else {
            el.setAttribute('fill', 'none');
            el.setAttribute('stroke', color);
            el.setAttribute('stroke-width', stroke);
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
  customElements.define('gv-icon', class extends IxIcon {});
<\\/script>`);

const CALL_TAGS_SNIPPET = `<!-- 2. Call anywhere with your desired variant -->
<ix-icon name="circle-plus" variant="linear" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="line-duotone" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="solid" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="duotone" size="24"></ix-icon>
<ix-icon name="circle-plus" variant="duotone-linear" size="24"></ix-icon>`;

const NUXT_UI_PLUGIN_SNIPPET = computed(() => `// plugins/iconix.client.ts
import { defineNuxtPlugin } from '#app';
import { addCollection } from '@iconify/vue';

export default defineNuxtPlugin(async () => {
  try {
    // Load the Iconix collection from the live CDN endpoint
    const res = await fetch('${siteOrigin.value}/iconix.json');
    if (res.ok) {
      const collection = await res.json();
      addCollection(collection);
    }
  } catch (err) {
    console.error('Failed to load Iconix collection:', err);
  }
});`);

const NUXT_UI_USAGE_SNIPPET = `<!-- Use inside any Nuxt UI template -->
<template>
  <div class="flex items-center gap-4">
    <!-- Using Nuxt UI <UIcon> with Tailwind color classes -->
    <UIcon name="i-iconix-ambulance" class="w-6 h-6 text-red-500" />
    <UIcon name="i-iconix-save-pen" class="w-5 h-5 text-teal-400" />
    <UIcon name="i-iconix-pen" class="w-5 h-5 text-indigo-400" />

    <!-- Or using standard @nuxt/icon <Icon> -->
    <Icon name="iconix:alarm-clock-check" size="24" class="text-emerald-400" />
  </div>
</template>`;

const NUXT_CUSTOM_COLLECTION_SNIPPET = `// nuxt.config.ts (Offline customCollections Option)
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    customCollections: [
      {
        prefix: 'iconix',
        dir: './assets/icons/iconix' // Place Iconix SVGs here
      }
    ]
  }
});`;

const NUXT_CONFIG_SNIPPET = `// nuxt.config.ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('ix-') || tag.startsWith('iconix-') || tag.startsWith('gv-')
    }
  }
});`;

const VUE_PLUGIN_SNIPPET = computed(() => `// plugins/ix-icon.client.ts
export default defineNuxtPlugin(async () => {
  if (typeof window === 'undefined' || customElements.get('ix-icon')) return;

  const res = await fetch('${siteOrigin.value}/icons.json');
  const { icons } = await res.json();
  const map = new Map(icons.map((i: any) => [i.name, i.svg]));

  class IxIcon extends HTMLElement {
    connectedCallback() {
      // dynamically render svg with props
    }
  }
  customElements.define('ix-icon', IxIcon);
  customElements.define('iconix-icon', class extends IxIcon {});
  customElements.define('gv-icon', class extends IxIcon {});
});`);

const REACT_WRAPPER_SNIPPET = `// components/IconixIcon.tsx
'use client';
import React from 'react';

interface IconixIconProps {
  name: string;
  variant?: 'linear' | 'line-duotone' | 'solid' | 'duotone' | 'duotone-linear';
  size?: number | string;
  stroke?: number | string;
  color?: string;
  tone?: string;
  className?: string;
}

export function IconixIcon({ name, variant = 'linear', size = 24, stroke = 2, color, tone, className }: IconixIconProps) {
  // @ts-ignore
  return <ix-icon name={name} variant={variant} size={size} stroke={stroke} color={color} tone={tone} class={className} />;
}`;

const VANILLA_HTML_SNIPPET = computed(() => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Iconix Demo</title>
</head>
<body>
  <div style="color: #0d9488;">
    <ix-icon name="siren" variant="line-duotone" size="32"></ix-icon>
    <span>System Active</span>
  </div>

  <script type="module" src="${siteOrigin.value}/demo.html"><\\/script>
</body>
</html>`);

const ATTRIBUTES_TABLE = [
  { name: 'name', type: 'string', default: 'Required', description: 'The semantic icon identifier matching icons.json (e.g. circle-plus, apple).' },
  { name: 'variant', type: 'string', default: '"linear"', description: 'Styling mode: linear, line-duotone (two-tone outline), solid (fill), duotone, or duotone-linear.' },
  { name: 'size', type: 'number | string', default: '"24"', description: 'Pixel dimension applied to both SVG width and height.' },
  { name: 'stroke', type: 'number | string', default: '"2"', description: 'Stroke thickness applied to paths, lines, and outlines.' },
  { name: 'color', type: 'string', default: '"currentColor"', description: 'Primary stroke & accent color (hex, rgb, or currentColor).' },
  { name: 'tone', type: 'string', default: 'color', description: 'Secondary duotone base color (hex, rgb, or currentColor). Enables 2 different colors (e.g. white + teal).' },
  { name: 'class', type: 'string', default: '—', description: 'Standard CSS / Tailwind class name for automatic color inheritance.' },
  { name: 'opacity', type: 'number | string', default: '"0.25"', description: 'Secondary layer opacity for duotone and line-duotone variants (0.0 to 1.0).' },
];

const FIGMA_RULES = [
  { title: 'Strict 24×24 Frame', description: 'Every icon canvas must be exactly 24×24 pixels with 0,0 origin coordinates.' },
  { title: '2px Default Stroke Weight', description: 'Design primary outlines at 2px weight with round line caps and round line joins.' },
  { title: 'Closed Paths for Fills', description: 'Shapes intended to be filled in Solid or Duotone modes must terminate with a closed path (Z).' },
  { title: 'Flatten Vector Networks', description: 'Combine compound vectors into clean single paths without redundant clip paths or group transforms.' },
];

const TS_INTERFACE_SNIPPET = `export interface IconEntry {
  name: string;        // Unique identifier (e.g. "circle-plus")
  category: string;    // Topic grouping (e.g. "Shapes & Badges")
  tags: string[];      // Search keywords (e.g. ["add", "plus"])
  svg: string;         // Raw 24x24 SVG markup string
}

export interface IconsJsonCatalog {
  icons: IconEntry[];
}`;

const JSON_PAYLOAD_EXAMPLE = `{
  "icons": [
    {
      "name": "circle-plus",
      "category": "Shapes & Badges",
      "tags": ["iconix", "circle", "plus", "add"],
      "svg": "<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\">...</svg>"
    }
  ]
}`;
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
