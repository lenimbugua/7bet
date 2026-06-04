<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import TwoUpIcon from "./TwoUpIcon.vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteAnItemFromBetslip: {
    type: Function,
    required: true,
  },
});
const router = useRouter();

const { goToMatchDetails } = useMatchDetails();

const { humanFriendlyDate } = useFormatDates();
</script>
<template>
  <div class="px-2.5 py-2">
    <div class="flex items-start justify-between gap-2">
      <!-- Left: match info -->
      <div
        class="min-w-0 flex-1 cursor-pointer"
        @click="goToMatchDetails(item, router, item.live)"
      >
        <!-- Builder badge + teams -->
        <div class="flex items-center gap-1.5 mb-1">
          <span class="text-[0.55rem] font-bold uppercase tracking-wide text-blue-500 bg-blue-500/10 px-1 py-px rounded shrink-0">
            Builder
          </span>
          <span class="text-[0.7rem] font-medium text-gray-600 dark:text-white/40 truncate">
            {{ item.homeTeam }} vs {{ item.awayTeam }}
          </span>
        </div>

        <!-- Selections -->
        <BetBuilderSelections
          class="w-full"
          :selections="item.selections"
        />

        <!-- Time -->
        <div class="text-[0.6rem] text-gray-500 dark:text-white/25 mt-1">
          Starts {{ humanFriendlyDate(item.startTime) }}
        </div>
      </div>

      <!-- Right: close + odds -->
      <div class="flex flex-col items-end justify-between gap-2 shrink-0 pt-0.5">
        <button
          class="w-5 h-5 flex items-center justify-center rounded text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          @click="deleteAnItemFromBetslip(item.customId)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
        </button>
        <div class="flex items-center gap-1">
          <TwoUpIcon
            v-if="item?.twoGoalUpActive && item?.outcomeName !== 'x'"
          />
          <span class="odds-badge">
            {{ item.oddValue }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.odds-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: oklch(55% 0.19 142 / 0.1);
  color: oklch(45% 0.19 142);
}
[data-theme="dark"] .odds-badge {
  background: oklch(55% 0.19 142 / 0.12);
  color: oklch(65% 0.19 142);
}
</style>
