<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from "vue";
import { useCasinoStore } from "@/stores/casino";
import { storeToRefs } from "pinia";

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
        name: g.gameName,
        provider: g.providerName,
        image: g.imgFullUrl,
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
          <span class="text-base" aria-hidden="true">🔥</span>
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
          class="shrink-0 w-36 rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle flex"
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
