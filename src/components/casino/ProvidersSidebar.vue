<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCasinoStore } from "../../stores/casino";

const router = useRouter();
const casinoStore = useCasinoStore();
const { providers } = storeToRefs(casinoStore);

// Self-sufficient: fetch providers if a parent view hasn't already.
onMounted(() => {
  if (!providers.value.length) casinoStore.fetchProviders();
});

// Guard against entries missing a providerName (avoids render crash + empty rows).
const namedProviders = computed(() =>
  (providers.value || []).filter((p) => p && p.providerName)
);

// Deterministic tile color per provider so logos-less list still reads well.
const tints = [
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
  "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  "bg-teal-500/15 text-teal-600 dark:text-teal-400",
];
const tint = (i) => tints[i % tints.length];

const initials = (name) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

const openProvider = (p) => {
  router.push({ name: "casino-home", query: { provider: p.providerName } });
};
</script>

<template>
  <section
    class="flex flex-col h-full rounded-2xl overflow-hidden bg-background ring-1 ring-black/5 dark:ring-white/10"
  >
    <!-- Header (styled like the betslip header) -->
    <div
      class="relative z-10 shrink-0 flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40"
    >
      <span class="text-base">🎰</span>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        Providers
      </h2>
    </div>

    <!-- List -->
    <ul class="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-1.5 p-3 sm:p-4">
      <li v-for="(p, i) in namedProviders" :key="p.providerName">
        <button
          type="button"
          class="w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left bg-gray-50 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          @click="openProvider(p)"
        >
          <span
            class="flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold shrink-0"
            :class="tint(i)"
          >
            {{ initials(p.providerName) }}
          </span>
          <span class="flex-1 min-w-0">
            <span class="block text-foreground text-sm font-medium truncate">
              {{ p.providerName }}
            </span>
          </span>
        </button>
      </li>
    </ul>
  </section>
</template>
