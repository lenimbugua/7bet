<script setup>
defineEmits(["reward-detail"]);

// Placeholder reward tiers until real leaderboard/CMS data is wired in.
const rewards = [
  { name: "Monthly Mega Jackpot", prize: "KSH 500,000", winners: 1 },
  { name: "Weekly Jackpot", prize: "KSH 100,000", winners: 5 },
  { name: "Daily Bonanza", prize: "KSH 20,000", winners: 20 },
  { name: "Lucky Spin", prize: "KSH 5,000", winners: 100 },
];
</script>

<template>
  <section class="mb-3 sm:mb-6">
    <!-- Section header -->
    <div class="flex items-center justify-between mb-2 sm:mb-3 px-1">
      <h2 class="text-foreground text-sm sm:text-base font-bold">Leaderboard</h2>
    </div>

    <div
      class="rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm"
    >
      <!-- Hero -->
      <div
        class="relative px-4 py-7 sm:py-10 text-center bg-gradient-to-b from-[#0e5a1e] via-[#0a3d15] to-[#06280e] overflow-hidden"
      >
        <!-- Glow -->
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(74,222,128,0.35),transparent_60%)]"
        ></div>

        <div class="relative">
          <h3
            class="text-3xl sm:text-5xl font-black italic leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff3a0] via-[#ffd166] to-[#b8860b] drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
          >
            FORTUNE<br />EVERY WEEK
          </h3>

          <button
            class="mt-5 inline-flex items-center rounded-full border-2 border-[#ffd166]/80 bg-[#0a3d15]/80 px-6 py-2 shadow-lg shadow-black/30 transition-transform hover:scale-[1.03] cursor-pointer"
            @click="$emit('reward-detail')"
          >
            <span
              class="text-sm sm:text-base font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#fff3a0] to-[#ffd166]"
            >
              REWARD DETAIL
            </span>
          </button>
        </div>
      </div>

      <!-- Reward table -->
      <div class="bg-white dark:bg-card">
        <div
          class="grid grid-cols-3 bg-[#1f8a34] text-white text-[11px] sm:text-sm font-bold text-center"
        >
          <div class="py-2.5 px-2">Prize</div>
          <div class="py-2.5 px-2">Prize</div>
          <div class="py-2.5 px-2">Number of Winners</div>
        </div>
        <div
          v-for="(row, i) in rewards"
          :key="row.name"
          class="grid grid-cols-3 items-center text-center text-[11px] sm:text-sm border-t border-gray-200 dark:border-white/10"
          :class="i % 2 ? 'bg-gray-50 dark:bg-white/[0.02]' : ''"
        >
          <div class="py-3 px-2 font-medium text-foreground">{{ row.name }}</div>
          <div class="py-3 px-2 font-extrabold text-[#b8860b] dark:text-[#ffd166]">
            {{ row.prize }}
          </div>
          <div class="py-3 px-2 text-foreground">{{ row.winners }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
