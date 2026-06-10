<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from "vue";
import { useCasinoStore } from "@/stores/casino";
import { useCasino } from "@/composables/useCasino";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const { launchCasino } = useCasino();
const casinoStore = useCasinoStore();
const { categoriesWithGames } = storeToRefs(casinoStore);
const sectionReady = ref(false);

const fallbackGames = [
  { name: "Aviator", provider: "Spribe", image: "https://via.placeholder.com/120x120/ff0000/ffffff?text=Aviator" },
  { name: "JetX", provider: "SmartSoft", image: "https://via.placeholder.com/120x120/0000ff/ffffff?text=JetX" },
  { name: "Spaceman", provider: "Pragmatic", image: "https://via.placeholder.com/120x120/00ff00/ffffff?text=Spaceman" },
];

const games = computed(() => {
  if (!categoriesWithGames.value?.length) return fallbackGames;
  const seen = new Map();
  for (const cat of categoriesWithGames.value) {
    for (const g of cat.games || []) {
      const key = g.id ?? g.gameName;
      if (seen.has(key)) continue;
      seen.set(key, {
        id: g.id,
        name: g.gameName,
        provider: g.providerName,
        image: g.imgFullUrl,
        category: cat.name || "",
      });
      if (seen.size >= 20) break;
    }
    if (seen.size >= 20) break;
  }
  return seen.size ? [...seen.values()] : fallbackGames;
});

function randomMultiplier() {
  const r = Math.random();
  if (r < 0.6) return +(Math.random() * 50 + 1.2).toFixed(1);
  if (r < 0.9) return +(Math.random() * 500 + 50).toFixed(0);
  return +(Math.random() * 3000 + 500).toFixed(1);
}

function formatMultiplier(m) {
  return Number.isInteger(m) ? `x${m}` : `x${m}`;
}

function formatKsh(n) {
  return n.toLocaleString("en-UG");
}

function randomPhone() {
  const last = String(Math.floor(Math.random() * 100)).padStart(2, "0");
  return `07***${last}`;
}

function routeNameFor(categoryName = "") {
  const lower = categoryName.toLowerCase();
  if (lower.includes("crash")) return "crash-games";
  if (lower.includes("virtual")) return "virtuals-games";
  return "casino";
}

function openGame(game) {
  // Fallback entries have no id — send those to the casino lobby instead.
  if (!game.id) {
    router.push({ name: "casino-home", query: { category: "all" } });
    return;
  }
  launchCasino(
    game.id,
    game.name,
    routeNameFor(game.category),
    game.provider,
    game.image,
  );
}

const winners = ref([]);

function generateWinners() {
  return Array.from({ length: 10 }, (_, i) => {
    const game = games.value[i % games.value.length];
    const multiplier = randomMultiplier();
    const stake = Math.floor(Math.random() * 50) + 1;
    const amount = Math.round(stake * multiplier);
    return {
      id: i,
      game,
      multiplier,
      amount,
      phone: randomPhone(),
    };
  });
}

const scrollContainer = ref(null);
let slideTimer = null;

function autoScroll() {
  if (!scrollContainer.value) return;
  const element = scrollContainer.value;
  let scrollPos = 0;
  const cardWidth = 144 + 8; // w-36 (144px) + space-x-2 (8px)
  const scrollDuration = 600;
  const pauseDuration = 3000;

  function slideToNext() {
    if (!scrollContainer.value) return;
    scrollPos += cardWidth;
    if (scrollPos > element.scrollWidth - element.clientWidth) {
      scrollPos = 0;
    }
    element.scrollTo({ left: scrollPos, behavior: "smooth" });
    slideTimer = setTimeout(slideToNext, scrollDuration + pauseDuration);
  }

  slideTimer = setTimeout(slideToNext, pauseDuration);
}

onMounted(() => {
  if (!categoriesWithGames.value?.length) {
    casinoStore.fetchCategoriesWithGames();
  }
  winners.value = generateWinners();
  setTimeout(() => {
    sectionReady.value = true;
  }, 50);
  nextTick(() => {
    autoScroll();
  });
});

onBeforeUnmount(() => {
  if (slideTimer) clearTimeout(slideTimer);
});

watch(
  () => games.value,
  () => {
    winners.value = generateWinners();
  }
);
</script>

<template>
  <section class="mb-3 sm:mb-6">
    <div class="rounded-xl bg-card border border-border-subtle p-3">
      <Transition name="slide-fade" appear>
        <div v-if="sectionReady" class="flex items-center gap-2 mb-3 px-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            class="w-5 h-5 shrink-0"
            aria-hidden="true"
          >
            <!-- Icon from Noto Emoji by Google Inc - https://github.com/googlefonts/noto-emoji/blob/main/svg/LICENSE -->
            <path fill="#176CC7" d="M69.09 4.24c-1.08.96-9.48 17.63-9.48 17.63l-6.25 25.21l24.32-2.23S97.91 7.23 98.32 6.36c.73-1.58 1.12-2.23-1.67-2.23c-2.79-.01-26.55-.79-27.56.11"/>
            <path fill="#FCC417" d="M81.68 43.29c-1.21-.65-36.85-1.21-37.69 0c-.76 1.1-.65 6.13-.28 6.78s12.35 6.22 12.35 6.22l-.01 2.03s.66 1.59 7.34 1.59s7.37-1.35 7.37-1.35l.06-2.05s10.49-5.24 11.04-5.7c.56-.47 1.03-6.87-.18-7.52M70.7 51.62s-.03-1.4-.72-1.75s-11.8-.29-12.74-.24s-.94 1.73-.94 1.73l-7.6-3.7v-.74l28.3.2l.05.84z"/>
            <path fill="#FDFFFF" d="M59.26 51.17c-.94 0-1.48.98-1.48 2.67c0 1.58.54 2.91 1.73 2.81c.98-.08 1.32-1.58 1.23-2.91c-.09-1.58-.29-2.57-1.48-2.57"/>
            <path fill="#FCC417" d="M28.98 90.72c0 23.96 21.66 34.63 36.06 34.12c15.88-.57 34.9-12.95 33.75-35.81C97.7 67.37 79.48 57.1 63.7 57.21c-18.34.13-34.72 12.58-34.72 33.51"/>
            <path fill="#FA912C" d="M64.53 120.67c-.25 0-.51 0-.76-.01c-7.5-.25-14.91-3.41-20.33-8.66c-5.8-5.62-8.98-13.22-8.94-21.39c.09-19.95 17.53-29.2 29.36-29.2h.1c16.03.07 29.19 12.53 29.56 29.42c.16 7.52-2.92 15.41-8.96 21.35c-5.64 5.53-13.12 8.49-20.03 8.49m-.69-55.94c-10.61 0-26.3 8.68-26.34 25.88c-.03 12.86 9.93 26.08 26.52 26.64c6.32.2 12.83-2.22 18.09-7.39c5.46-5.37 8.53-12.29 8.42-18.99c-.24-14.53-12.12-26.09-26.54-26.15c-.04 0-.12.01-.15.01"/>
            <path fill="#FEFFFA" d="M57.82 60.61c-.69-.95-8.51-.77-15.9 6.45c-7.13 6.97-7.9 13.54-6.53 13.92c1.55.43 3.44-6.53 9.97-12.38c6-5.36 13.84-6.1 12.46-7.99m30.25 25.87c-2.41.34.09 7.56-5.5 15.64c-4.85 7.01-10.35 9.55-9.71 11.09c.86 2.06 9.67-3.07 13.75-11.43c3.7-7.57 3.26-15.56 1.46-15.3"/>
            <path fill="#FA912C" d="M55.85 77.02c-.52.77-.05 7.52.26 7.82c.6.6 5.16-1.55 5.16-1.55l-.17 18.05s-3.35-.04-3.7.09c-.69.26-.6 7.22-.09 7.56s14.18.52 14.7-.17s.39-6.78.15-7.06c-.43-.52-3.7-.31-3.7-.31s.28-26.58.19-27.43s-1.03-1.38-2.15-1.12s-10.32 3.62-10.65 4.12"/>
            <path fill="#2E9DF4" d="M25.51 3.72c-.63.58 23.46 43.48 23.46 43.48s4.04.52 13.06.6s13.49-.52 13.49-.52S56.79 4.15 55.67 3.72c-.55-.22-7.97-.3-15.22-.38c-7.26-.09-14.34-.18-14.94.38"/>
          </svg>
          <h2 class="text-foreground text-sm sm:text-base font-extrabold tracking-wide uppercase">
            Recent Winners
          </h2>
        </div>
      </Transition>

      <div ref="scrollContainer" class="flex space-x-2 overflow-x-auto scrollbar-hide pb-1 scroll-smooth">
      <Transition-group name="slide-in" tag="div" class="flex space-x-2">
        <article
          v-for="winner in winners"
          :key="winner.id"
          class="shrink-0 w-36 rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle flex cursor-pointer"
          @click="openGame(winner.game)"
        >
          <!-- Game art LEFT -->
          <div class="w-12 h-12 shrink-0 overflow-hidden">
            <img
              :src="winner.game.image"
              :alt="winner.game.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Stats RIGHT -->
          <div class="flex-1 px-2 py-1 flex flex-col justify-center gap-1 min-w-0">
            <div class="text-base font-extrabold text-primary leading-none">
              {{ formatMultiplier(winner.multiplier) }}
            </div>
            <div class="text-[11px] font-bold text-foreground leading-none">
              <span class="mr-1">UGX</span>{{ formatKsh(winner.amount) }}
            </div>
            <div class="text-[10px] font-semibold text-muted-foreground tracking-wider leading-none">
              {{ winner.phone }}
            </div>
          </div>
        </article>
      </Transition-group>
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

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-in-enter-active {
  transition: all 0.4s ease-out;
}
.slide-in-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-in-move {
  transition: transform 0.4s ease-out;
}
</style>
