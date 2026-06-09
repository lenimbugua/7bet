<script setup>
import { ChevronRightIcon, UserIcon } from "@heroicons/vue/24/outline";
import AnimatedNumber from "./AnimatedNumber.vue";

defineProps({
  title: { type: String, default: "7BET JACKPOT" },
  superJackpot: {
    type: Object,
    default: () => ({
      amount: 709401.74,
      mustHitBy: 2000000,
      minBet: 500,
    }),
  },
  tiers: {
    type: Array,
    default: () => [
      { name: "Grand", amount: 244032.8, mustHitBy: 500000, minBet: 200 },
      { name: "Major", amount: 127060.01, mustHitBy: 300000, minBet: 100 },
      { name: "Minor", amount: 73817.27, mustHitBy: 100000, minBet: 50 },
      { name: "Mini", amount: 11866.91, mustHitBy: 20000, minBet: 20 },
    ],
  },
  games: {
    type: Array,
    default: () => [
      {
        id: "phoenix",
        name: "Super Phoenix",
        players: 1966,
        jackpot: 709401.94,
        hot: false,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/0d0a33b2-151e-4b59-754d-e4dec05d0300/public",
      },
      {
        id: "shining",
        name: "40 Shining",
        players: 1656,
        jackpot: 709401.94,
        hot: true,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/a5abe485-4985-4f80-3826-03cc2f579700/public",
      },
      {
        id: "caishen",
        name: "Chests of Cai Shen 2",
        players: 2155,
        jackpot: 709401.94,
        hot: true,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/0d0a33b2-151e-4b59-754d-e4dec05d0300/public",
      },
      {
        id: "burning",
        name: "40 Burning",
        players: 1320,
        jackpot: 709401.94,
        hot: true,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/a5abe485-4985-4f80-3826-03cc2f579700/public",
      },
    ],
  },
  lastWinner: {
    type: Object,
    default: () => ({
      phone: "01***713",
      amount: 450988,
      gameName: "Aztec Gems",
    }),
  },
});

defineEmits(["view-more", "play", "play-winner"]);

function formatAmount(n, fixed = 2) {
  return n.toLocaleString("en-UG", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : fixed,
    maximumFractionDigits: fixed,
  });
}
function formatInt(n) {
  return n.toLocaleString("en-UG");
}
</script>

<template>
  <section class="mb-3 sm:mb-6">
    <div
      class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3a1466] via-[#2a0e4a] to-[#1a0830] shadow-lg shadow-purple-950/40"
    >
      <!-- Header bar -->
      <div class="flex items-center justify-between px-3 sm:px-4 pt-3 pb-2">
        <h3 class="text-white text-sm sm:text-lg font-extrabold tracking-wide">
          {{ title }}
        </h3>
        <button
          class="flex items-center gap-1 text-white/85 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          @click="$emit('view-more')"
        >
          View More
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>

      <!-- SUPER jackpot plaque -->
      <div class="px-3 sm:px-4 pt-2 pb-3">
        <div class="text-center">
          <div
            class="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#fff3a0] to-[#c48a17] text-lg sm:text-xl font-black tracking-widest italic mb-1 drop-shadow"
          >
            SUPER
          </div>
        </div>
        <div
          class="relative rounded-lg border-2 border-[#ffd166]/80 bg-gradient-to-b from-[#fff0b0] via-[#f5c542] to-[#a37310] py-2 px-3 shadow-lg shadow-yellow-900/30"
        >
          <div
            class="text-center text-[#2a0e4a] text-xl sm:text-3xl font-black tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]"
          >
            <AnimatedNumber :value="superJackpot.amount" :formatter="formatAmount" />
          </div>
          <div class="flex justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-bold mt-0.5">
            <span class="text-[#2a0e4a]">
              Must hit by
              <span class="text-[#7a1313]">{{ formatInt(superJackpot.mustHitBy) }}</span>
            </span>
            <span class="text-[#2a0e4a]">
              Min bet <span class="text-[#7a1313]">{{ formatInt(superJackpot.minBet) }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 2x2 tier grid -->
      <div class="px-3 sm:px-4 grid grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div v-for="tier in tiers" :key="tier.name" class="text-center">
          <div
            class="text-transparent bg-clip-text bg-gradient-to-b font-black italic text-xs sm:text-sm tracking-wider mb-0.5 drop-shadow"
            :class="{
              'from-[#ffe06e] to-[#b13d2f]': tier.name === 'Grand',
              'from-[#bcffa3] to-[#0c5a13]': tier.name === 'Major',
              'from-[#bcd9ff] to-[#1437a3]': tier.name === 'Minor',
              'from-[#e3c8ff] to-[#5a1bbf]': tier.name === 'Mini',
            }"
          >
            {{ tier.name.toUpperCase() }}
          </div>
          <div
            class="rounded-md border-2 py-1.5 px-2 bg-gradient-to-b from-[#fff0b0] via-[#f5c542] to-[#a37310] border-[#ffd166]/80 shadow"
          >
            <div class="text-[#2a0e4a] text-sm sm:text-lg font-black tracking-tight">
              <AnimatedNumber :value="tier.amount" :formatter="formatAmount" />
            </div>
            <div class="text-[9px] sm:text-[11px] font-bold text-[#2a0e4a] leading-tight">
              Must hit by <span class="text-[#7a1313]">{{ formatInt(tier.mustHitBy) }}</span>
            </div>
            <div class="text-[9px] sm:text-[11px] font-bold text-[#2a0e4a] leading-tight">
              Min bet <span class="text-[#7a1313]">{{ formatInt(tier.minBet) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Game cards -->
      <div class="px-3 sm:px-4">
        <div class="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
          <article
            v-for="game in games"
            :key="game.id"
            role="button"
            tabindex="0"
            :aria-label="'Play ' + game.name"
            class="shrink-0 w-24 sm:w-28 relative rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/10 cursor-pointer group"
            @click="$emit('play', game)"
          >
            <span
              v-if="game.hot"
              class="absolute top-1.5 left-1.5 z-10 bg-gradient-to-b from-[#ff6b6b] to-[#ff3b3b] text-white text-[9px] font-extrabold px-2 py-0.5 rounded"
            >
              HOT
            </span>
            <span
              class="absolute top-1.5 right-1.5 z-10 flex items-center gap-0.5 text-white text-[10px] font-medium drop-shadow"
            >
              <UserIcon class="w-3 h-3" />
              {{ formatInt(game.players) }}
            </span>

            <div class="aspect-3/4 overflow-hidden">
              <img
                :src="game.image"
                :alt="game.name"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-1.5">
              <div
                class="bg-gradient-to-r from-[#ff7eb3] to-[#ff5fa2] rounded-full text-white text-[10px] sm:text-[11px] font-extrabold text-center py-0.5 mb-1 shadow"
              >
                Jackpot
              </div>
              <div
                class="bg-gradient-to-r from-[#7b3fff] to-[#a64dff] rounded-full text-white text-[10px] sm:text-[11px] font-bold text-center py-1 shadow"
              >
                <AnimatedNumber :value="game.jackpot" :formatter="formatAmount" />
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Last winner ticker -->
      <div
        v-if="lastWinner"
        class="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 mt-1 bg-black/30 border-t border-white/10"
      >
        <p class="text-white text-xs sm:text-sm truncate">
          <span class="mr-1">🪙</span>
          <span class="font-bold">{{ lastWinner.phone }}</span>
          <span class="text-white/80"> won </span>
          <span class="font-bold">UGX {{ formatInt(lastWinner.amount) }}</span>
          <span class="text-white/80"> in </span>
          <span class="font-bold">{{ lastWinner.gameName }}</span>
        </p>
        <button
          class="shrink-0 bg-[#3ddc84] hover:bg-[#2bc972] text-[#0b1a10] text-xs sm:text-sm font-bold px-4 py-1 rounded-full transition-colors"
          @click="$emit('play-winner', lastWinner)"
        >
          Play
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
