<script setup>
defineProps({
  rows: {
    type: Number,
    required: true,
  },
});

// Slightly varied widths per row so the skeleton doesn't look mechanically
// repeated — mirrors how real competition/team names differ in length.
const compWidths = ["7rem", "9rem", "6rem", "8.5rem", "7.5rem"];
const homeWidths = ["62%", "78%", "54%", "70%", "66%"];
const awayWidths = ["48%", "66%", "58%", "44%", "72%"];
</script>

<template>
  <div class="w-full bg-white dark:bg-background">
    <div
      v-for="i in rows"
      :key="i"
      class="px-3 py-2.5 border-b border-gray-100 dark:border-white/3"
    >
      <!-- Meta row: competition (icon + name) + time -->
      <div class="flex items-center justify-between pt-2 pb-1">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="sk h-3.5 w-3.5 rounded-full shrink-0"></span>
          <span class="sk h-2 rounded" :style="{ width: compWidths[i % compWidths.length] }"></span>
        </div>
        <span class="sk h-2 w-12 rounded shrink-0"></span>
      </div>

      <!-- Teams (left, stacked) + odds (right) -->
      <div class="flex items-center justify-between pb-2 gap-2">
        <div class="flex-1 min-w-0 space-y-2">
          <div class="sk h-3 rounded" :style="{ width: homeWidths[i % homeWidths.length] }"></div>
          <div class="sk h-3 rounded" :style="{ width: awayWidths[i % awayWidths.length] }"></div>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <span class="sk h-9 w-12 rounded-lg"></span>
          <span class="sk h-9 w-12 rounded-lg"></span>
          <span class="sk h-9 w-12 rounded-lg"></span>
          <span class="sk h-3 w-6 rounded ml-0.5"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Solid skeleton block with a moving light sweep on top — reads as a real
   loading placeholder rather than a sliding gradient. */
.sk {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: oklch(92% 0.004 258);
  /* subtle breathing so static blocks aren't dead between sweeps */
  animation: sk-pulse 2.4s ease-in-out infinite;
}
[data-theme="dark"] .sk {
  background-color: oklch(100% 0 0 / 0.07);
}

.sk::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(100% 0 0 / 0.55) 50%,
    transparent 100%
  );
  animation: sk-sweep 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
[data-theme="dark"] .sk::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(100% 0 0 / 0.08) 50%,
    transparent 100%
  );
}

@keyframes sk-sweep {
  100% {
    transform: translateX(100%);
  }
}
@keyframes sk-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk,
  .sk::after {
    animation: none;
  }
}
</style>
