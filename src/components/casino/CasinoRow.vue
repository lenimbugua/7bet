<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCasinoStore } from "@/stores/casino";
import { useCasino } from "@/composables/useCasino";

const props = defineProps({
  // one of: "crash" | "slots" | "virtuals" | "top"
  categoryKey: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const casinoStore = useCasinoStore();
const { categoriesWithGames } = storeToRefs(casinoStore);
const { launchCasino } = useCasino();

onMounted(() => {
  if (!categoriesWithGames.value?.length) {
    casinoStore.fetchCategoriesWithGames();
  }
});

// How to recognise the category in the API list, and where "ALL" links to
const KEY_CONFIG = {
  crash: { label: "Crash Games", match: (n) => n.includes("crash"), query: "crash" },
  slots: { label: "Slots", match: (n) => n.includes("slot"), query: "slots" },
  virtuals: { label: "Virtuals", match: (n) => n.includes("virtual"), query: "virtuals" },
  top: {
    label: "Top Games",
    match: (n) => n.includes("top") || n.includes("hot") || n.includes("popular"),
    query: "all",
  },
};

const config = computed(() => KEY_CONFIG[props.categoryKey] || KEY_CONFIG.top);

const category = computed(() => {
  if (!categoriesWithGames.value?.length) return null;
  return (
    categoriesWithGames.value.find((c) =>
      config.value.match((c.name || "").toLowerCase())
    ) || null
  );
});

const games = computed(() => category.value?.games?.slice(0, 12) || []);

const heading = computed(() =>
  (category.value?.name || config.value.label).toUpperCase()
);

function routeNameFor(categoryName = "") {
  const lower = categoryName.toLowerCase();
  if (lower.includes("crash")) return "crash-games";
  if (lower.includes("virtual")) return "virtuals-games";
  return "casino";
}

function play(game) {
  launchCasino(
    game.id,
    game.gameName,
    routeNameFor(category.value?.name || ""),
    game.providerName
  );
}

function viewAll() {
  router.push({ name: "casino-home", query: { category: config.value.query } });
}
</script>

<template>
  <section v-if="games.length" class="p-3 bg-gray-50 dark:bg-white/[0.02]">
    <header class="flex items-center justify-between mb-2">
      <h2 class="flex items-center gap-2 text-sm font-extrabold text-foreground tracking-wide">
        <span aria-hidden="true">🎰</span>
        <span>{{ heading }}</span>
      </h2>
      <button
        type="button"
        class="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-gold-bright hover:text-gold"
        @click="viewAll"
      >
        ALL
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </header>

    <div class="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
      <button
        v-for="game in games"
        :key="game.id"
        type="button"
        class="shrink-0 w-14 rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle text-left hover:shadow-md transition-shadow"
        @click="play(game)"
      >
        <div class="relative aspect-square overflow-hidden">
          <img
            :src="game.imgFullUrl"
            :alt="game.gameName"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
