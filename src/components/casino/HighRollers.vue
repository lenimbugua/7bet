<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCasinoStore } from "@/stores/casino";

const casinoStore = useCasinoStore();
const { categoriesWithGames } = storeToRefs(casinoStore);

const SEEDS = [
  "Aria", "Mila", "Leo", "Zoe", "Kai",
  "Finn", "Max", "Nova", "Ivy", "Theo",
];

// Avatars kept from the old High Rollers panel
const avatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

const gamesPool = computed(() => {
  const out = [];
  for (const cat of categoriesWithGames.value || []) {
    for (const g of cat.games || []) {
      if (g.gameName) out.push({ name: g.gameName, image: g.imgFullUrl });
      if (out.length >= 20) break;
    }
    if (out.length >= 20) break;
  }
  return out;
});

function randomMultiplier() {
  const r = Math.random();
  if (r < 0.6) return +(Math.random() * 50 + 1.2).toFixed(1);
  if (r < 0.9) return +(Math.random() * 500 + 50).toFixed(0);
  return +(Math.random() * 3000 + 500).toFixed(1);
}
const formatMultiplier = (m) => `x${m}`;
const formatKsh = (n) => n.toLocaleString("en-UG");
function randomPhone() {
  const last = String(Math.floor(Math.random() * 100)).padStart(2, "0");
  return `07***${last}`;
}

const winners = ref([]);
function makeWinner(id) {
  const multiplier = randomMultiplier();
  const stake = Math.floor(Math.random() * 50) + 1;
  const amount = Math.round(stake * multiplier);
  const pool = gamesPool.value;
  return {
    id,
    seed: SEEDS[Math.floor(Math.random() * SEEDS.length)],
    multiplier,
    amount,
    phone: randomPhone(),
    game: pool.length ? pool[Math.floor(Math.random() * pool.length)] : null,
  };
}
function generateWinners() {
  return Array.from({ length: 10 }, (_, i) => makeWinner(i));
}

const flashId = ref(null);
let bumpId;
let flashTimer;
onMounted(() => {
  if (!categoriesWithGames.value?.length) {
    casinoStore.fetchCategoriesWithGames();
  }
  winners.value = generateWinners();
  // Light "feed" movement so the panel feels live.
  bumpId = setInterval(() => {
    const i = Math.floor(Math.random() * winners.value.length);
    // Replace the row with a fresh random winner (new game, amount, etc.)
    winners.value[i] = makeWinner(winners.value[i].id);
    // Mild highlight on the row that just changed
    const id = winners.value[i].id;
    flashId.value = id;
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => {
      if (flashId.value === id) flashId.value = null;
    }, 950);
  }, 4000);
});
onBeforeUnmount(() => {
  clearInterval(bumpId);
  clearTimeout(flashTimer);
});

watch(
  () => gamesPool.value,
  () => {
    if (winners.value.length) winners.value = generateWinners();
  }
);
</script>

<template>
  <section
    class="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-card ring-1 ring-black/5 dark:ring-white/10"
  >
    <!-- Header (styled like the betslip header) -->
    <div
      class="relative z-10 shrink-0 flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gold shrink-0">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
      </svg>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        Recent Winners
      </h2>
    </div>

    <!-- Feed -->
    <ul class="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-2.5 p-3 sm:p-4">
      <li
        v-for="w in winners"
        :key="w.id"
        class="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] ring-1 ring-black/5 dark:ring-white/5 px-3 py-2.5 transition-colors"
        :class="{ 'winner-flash': w.id === flashId }"
      >
        <img
          :src="avatarUrl(w.seed)"
          :alt="w.phone"
          loading="lazy"
          class="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/10 shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-primary text-sm font-extrabold leading-none">
            {{ formatMultiplier(w.multiplier) }}
          </p>
          <p class="text-gold text-sm font-bold leading-none mt-1">
            <span class="mr-1">UGX</span>{{ formatKsh(w.amount) }}
          </p>
          <p class="text-muted-foreground text-[11px] leading-none mt-1 truncate">
            {{ w.phone }}<span v-if="w.game"> · {{ w.game.name }}</span>
          </p>
        </div>

        <!-- Game image -->
        <div
          v-if="w.game?.image"
          class="w-10 h-10 rounded-md overflow-hidden bg-gray-200 dark:bg-white/10 shrink-0"
        >
          <img
            :src="w.game.image"
            :alt="w.game.name"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.winner-flash {
  animation: winner-flash 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes winner-flash {
  0% {
    background-color: oklch(70% 0.19 142 / 0.45);
    transform: scale(1.06);
    box-shadow: 0 0 0 2px oklch(70% 0.19 142 / 0.5), 0 6px 16px oklch(70% 0.19 142 / 0.35);
  }
  60% {
    transform: scale(1.01);
  }
  100% {
    background-color: transparent;
    transform: scale(1);
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
