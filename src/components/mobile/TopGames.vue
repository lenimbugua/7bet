<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCasinoStore } from "@/stores/casino";
import { useCasino } from "@/composables/useCasino";
import formatStuff from "@/utilities/format-stuff";

const router = useRouter();
const casinoStore = useCasinoStore();
const { categoriesWithGames } = storeToRefs(casinoStore);
const { launchCasino } = useCasino();
const { formCloudflareImage } = formatStuff();

const playonGame = {
  id: "playon",
  gameName: "Playon",
  providerName: "Playon",
  imgUrl: formCloudflareImage("6ae7d307-32f7-431d-2d52-650037061d00"),
  imgFullUrl: formCloudflareImage("6ae7d307-32f7-431d-2d52-650037061d00"),
};

onMounted(() => {
  if (!categoriesWithGames.value?.length) {
    casinoStore.fetchCategoriesWithGames();
  }
});

const hotCategory = computed(() => {
  if (!categoriesWithGames.value?.length) return null;
  return (
    categoriesWithGames.value.find((c) => c.slug === "hot-games-in-kenya") ||
    categoriesWithGames.value.find((c) =>
      c.name?.toLowerCase().includes("hot")
    ) ||
    categoriesWithGames.value[0]
  );
});

const topGames = computed(() => {
  const games = hotCategory.value?.games?.slice(0, 11) || [];
  return [playonGame, ...games];
});

const heading = computed(() =>
  (hotCategory.value?.name || "Top Games in Kenya").toUpperCase()
);

function routeNameFor(categoryName = "") {
  const lower = categoryName.toLowerCase();
  if (lower.includes("crash")) return "crash-games";
  if (lower.includes("virtual")) return "virtuals-games";
  return "casino";
}

function play(game) {
  if (game.id === "playon") {
    router.push({ name: "playon" });
    return;
  }
  launchCasino(
    game.id,
    game.gameName,
    routeNameFor(hotCategory.value?.name || ""),
    game.providerName
  );
}

function viewAll() {
  router.push({ name: "casino-home", query: { category: "all" } });
}
</script>

<template>
  <section v-if="topGames.length">
    <div class="rounded-xl bg-card border border-border-subtle px-3 py-5">
      <header class="flex items-start justify-between mb-2">
        <div>
          <h2 class="flex items-center gap-2 text-sm font-extrabold text-foreground tracking-wide">
            <span aria-hidden="true">🔥</span>
            <span>{{ heading }}</span>
          </h2>
          <p class="mt-1 text-[11px] font-bold text-gold-bright tracking-wide">
            MOST PLAYED IN THE LAST 24 HOURS
          </p>
        </div>
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
          v-for="game in topGames"
          :key="game.id"
          type="button"
          class="shrink-0 w-32 rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle text-left hover:shadow-md transition-shadow"
          @click="play(game)"
        >
          <div class="relative aspect-square overflow-hidden">
            <img
              :src="game.imgFullUrl"
              :alt="game.gameName"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <span class="absolute top-1.5 left-1.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-background/70 text-sm" aria-hidden="true">🔥</span>
          </div>
        </button>
      </div>
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
