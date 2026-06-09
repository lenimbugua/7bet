<script setup>
import { ChevronRightIcon, UserIcon } from "@heroicons/vue/24/outline";
import AnimatedNumber from "./AnimatedNumber.vue";

defineProps({
  title: { type: String, default: "EGT-Bell Link" },
  totalJackpot: { type: Number, default: 1734185.88 },
  tiers: {
    type: Array,
    default: () => [
      {
        name: "Grand",
        amount: 1681141.03,
        titleClass: "text-[#ffd66b]",
        bgClass: "bg-gradient-to-b from-[#7a0d0d] to-[#4a0606]",
        borderClass: "border-[#ffd66b]/70",
      },
      {
        name: "Major",
        amount: 51844.85,
        titleClass: "text-[#b3ff7a]",
        bgClass: "bg-gradient-to-b from-[#1f6a18] to-[#0c3a09]",
        borderClass: "border-[#b3ff7a]/70",
      },
      {
        name: "Minor",
        amount: 1000,
        titleClass: "text-[#a6c4ff]",
        bgClass: "bg-gradient-to-b from-[#173a8a] to-[#0a1f4d]",
        borderClass: "border-[#a6c4ff]/70",
      },
      {
        name: "Mini",
        amount: 200,
        titleClass: "text-[#d4b1ff]",
        bgClass: "bg-gradient-to-b from-[#3e1e7a] to-[#1f0e44]",
        borderClass: "border-[#d4b1ff]/70",
      },
    ],
  },
  games: {
    type: Array,
    default: () => [
      {
        id: "burning",
        name: "40 Burning",
        players: 1199,
        jackpot: 1734185.88,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/0d0a33b2-151e-4b59-754d-e4dec05d0300/public",
      },
      {
        id: "shining",
        name: "40 Shining",
        players: 2736,
        jackpot: 1734185.88,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/a5abe485-4985-4f80-3826-03cc2f579700/public",
      },
      {
        id: "super",
        name: "40 Super 7",
        players: 1201,
        jackpot: 1734185.88,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/0d0a33b2-151e-4b59-754d-e4dec05d0300/public",
      },
      {
        id: "vampire",
        name: "Vampire 40",
        players: 842,
        jackpot: 1734185.88,
        image:
          "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/a5abe485-4985-4f80-3826-03cc2f579700/public",
      },
    ],
  },
});

defineEmits(["view-more", "play"]);

function formatAmount(n) {
  return n.toLocaleString("en-UG", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
</script>

<template>
  <section class="mb-3 sm:mb-6">
    <div
      class="relative rounded-2xl overflow-hidden p-3 sm:p-4 bg-gradient-to-br from-[#7a1313] via-[#5a0e0e] to-[#3d0808] shadow-lg shadow-red-950/40"
    >
      <!-- Header row -->
      <div class="flex items-start justify-between mb-1">
        <h3 class="text-white text-base sm:text-lg font-bold">{{ title }}</h3>
        <button
          class="flex items-center gap-1 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          @click="$emit('view-more')"
        >
          View More
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>

      <!-- Total jackpot -->
      <div class="flex items-baseline gap-2 mb-3">
        <span class="text-white text-base sm:text-lg font-bold">UGX</span>
        <span
          class="text-white text-2xl sm:text-4xl font-extrabold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
        >
          <AnimatedNumber :value="totalJackpot" :formatter="formatAmount" />
        </span>
      </div>

      <!-- Jackpot tiers -->
      <div class="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4">
        <div v-for="tier in tiers" :key="tier.name" class="text-center">
          <div
            :class="[tier.titleClass]"
            class="text-[10px] sm:text-xs font-black italic tracking-widest mb-1 drop-shadow"
          >
            {{ tier.name.toUpperCase() }}
          </div>
          <div
            :class="[tier.bgClass, tier.borderClass]"
            class="rounded-md border py-1 px-1 sm:py-1.5 sm:px-2"
          >
            <div class="text-white text-[11px] sm:text-sm font-bold truncate">
              <AnimatedNumber :value="tier.amount" :formatter="formatAmount" />
            </div>
          </div>
        </div>
      </div>

      <!-- Game cards -->
      <div class="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1">
        <article
          v-for="game in games"
          :key="game.id"
          role="button"
          tabindex="0"
          :aria-label="'Play ' + game.name"
          class="shrink-0 w-28 sm:w-32 relative rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/10 cursor-pointer group"
          @click="$emit('play', game)"
        >
          <!-- HOT badge -->
          <span
            class="absolute top-1.5 left-1.5 z-10 bg-gradient-to-b from-[#ff6b6b] to-[#ff3b3b] text-white text-[9px] font-extrabold px-2 py-0.5 rounded"
          >
            HOT
          </span>
          <!-- Player count -->
          <span
            class="absolute top-1.5 right-1.5 z-10 flex items-center gap-0.5 text-white text-[10px] font-medium drop-shadow"
          >
            <UserIcon class="w-3 h-3" />
            {{ game.players.toLocaleString() }}
          </span>

          <!-- Game image -->
          <div class="aspect-3/4 overflow-hidden">
            <img
              :src="game.image"
              :alt="game.name"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Bottom labels -->
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
