<script setup>
import SportsBetslip from "./SportsBetslip.vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useBetslipStore } from "../stores/sports-betslip.js";

const { betslipLength } = storeToRefs(useBetslipStore());
const { clearBetslip } = useBetslipStore();
</script>

<template>
  <div class="relative w-84 h-full">
    <div class="w-full sticky top-16 h-[calc(100vh-5rem)] flex flex-col rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/6 overflow-hidden" data-fly-target="betslip">
      <!-- Header -->
      <div class="relative z-10 flex items-center justify-between px-3 py-2.5 border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40">
        <span class="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
          Betslip
          <span
            v-if="betslipLength > 0"
            class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-gold-foreground bg-gold rounded-full tabular-nums"
          >
            {{ betslipLength }}
          </span>
        </span>
        <button
          v-if="betslipLength > 0"
          class="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          @click="clearBetslip"
        >
          <TrashIcon class="w-3.5 h-3.5" />
          Clear All
        </button>
        <div class="flex items-center gap-3">
          <RouterLink
            :to="{ name: 'my-bets' }"
            class="flex items-center gap-0.5 text-xs font-semibold text-brand-bright hover:text-brand-bright/80 transition-colors"
          >
            My Bets
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </RouterLink>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col min-h-0">
        <SportsBetslip />
      </div>
    </div>
  </div>
</template>
