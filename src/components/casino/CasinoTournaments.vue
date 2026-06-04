<script setup>
import { ref } from "vue";
import AnimatedNumber from "./AnimatedNumber.vue";

defineEmits(["see-all", "open"]);

// Placeholder tournaments — banner artwork pulled from a random image API
// (picsum) until real assets/CMS data is wired in.
const tournaments = [
  {
    id: 1,
    title: "Season of Legends",
    subtitle: "Summer Campaign",
    currency: "€",
    prize: 600000,
    seed: "tourney-legends",
  },
  {
    id: 2,
    title: "Big Sunday Blast",
    subtitle: "Every Sunday",
    currency: "€",
    prize: 25000,
    seed: "tourney-blast",
  },
  {
    id: 3,
    title: "Spin Express",
    subtitle: "Ride. Spin. Win.",
    currency: "€",
    prize: 1000000,
    seed: "tourney-spin",
  },
  {
    id: 4,
    title: "Mega Drop",
    subtitle: "Daily Prizes",
    currency: "€",
    prize: 100000,
    seed: "tourney-mega",
  },
];

function bannerImg(seed) {
  return `https://picsum.photos/seed/${seed}/600/320`;
}

function formatPrize(n) {
  return Math.round(n).toLocaleString("en-US");
}

const scrollContainer = ref(null);

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -600, behavior: "smooth" });
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 600, behavior: "smooth" });
}
</script>

<template>
  <section class="mb-3 sm:mb-6">
    <!-- Section header -->
    <div class="flex items-center justify-between mb-2 sm:mb-3 px-1">
      <h2 class="text-foreground text-sm sm:text-base font-bold">Tournaments</h2>
      <div class="flex items-center gap-2">
        <!-- Scroll arrows (desktop) -->
        <button
          aria-label="Scroll left"
          class="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
          @click="scrollLeft"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          aria-label="Scroll right"
          class="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
          @click="scrollRight"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <!-- All pill -->
        <button
          class="flex items-center gap-1 rounded-full border border-gray-200 dark:border-white/15 px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/40 text-xs font-semibold transition-colors cursor-pointer"
          @click="$emit('see-all')"
        >
          All
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Horizontal scroll row -->
    <div
      ref="scrollContainer"
      class="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide pb-1 sm:pb-2 scroll-smooth"
    >
      <button
        v-for="t in tournaments"
        :key="t.id"
        class="group relative shrink-0 w-[300px] sm:w-[380px] aspect-[15/8] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm cursor-pointer"
        :aria-label="`Open ${t.title} tournament`"
        @click="$emit('open', t)"
      >
        <img
          :src="bannerImg(t.seed)"
          :alt="t.title"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <!-- Legibility gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <!-- Content -->
        <div class="absolute inset-0 flex flex-col justify-between p-3.5 text-left">
          <div>
            <span
              class="block text-[0.6rem] font-bold uppercase tracking-widest text-white/70"
            >
              Prize Pool
            </span>
            <div
              class="flex items-baseline gap-0.5 text-transparent bg-clip-text bg-gradient-to-b from-[#fff3a0] via-[#ffd166] to-[#c48a17] drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]"
            >
              <span class="text-xl sm:text-2xl font-black">{{ t.currency }}</span>
              <span class="text-3xl sm:text-4xl font-black tracking-tight">
                <AnimatedNumber :value="t.prize" :formatter="formatPrize" />
              </span>
            </div>
          </div>
          <div>
            <h3 class="text-white text-base sm:text-lg font-black leading-tight drop-shadow">
              {{ t.title }}
            </h3>
            <p class="text-white/70 text-[0.7rem] font-medium">{{ t.subtitle }}</p>
          </div>
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
