<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useMatches2Store } from "@/stores/matches2";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import CalendarDropdown from "../CalendarDropdown.vue";
import ColumnHeaderSearch from "../ColumnHeaderSearch.vue";
import HighlitsTab from "../HighlitsTab.vue";
import MarketsTab from "../MarketsTab.vue";
import SecondaryNav from "../SecondaryNav.vue";

const { matches, getDefaultMarket } = storeToRefs(useMatches2Store());
const { sportsIconsModal } = useModalTypes();
const { openModal } = useModalStore();

const outcomeLabels = computed(() => {
  if (!matches.value?.length) return ["1", "X", "2"];
  const marketId = "" + getDefaultMarket.value;
  for (const match of matches.value) {
    if (!match?.markets?.length) continue;
    const market = match.markets.find((m) => m.subTypeId === marketId);
    if (market?.matchOutcomes?.length) {
      return market.matchOutcomes.map((o) => o.outcomeName || "");
    }
  }
  return ["1", "X", "2"];
});
</script>

<template>
  <div class="sticky z-40 top-27.5 md:top-30 mt-3 sports-filter-bar mx-0 rounded-t-xl">
    <!-- Row 1: Sport tabs -->
    <div class="flex flex-col gap-1.5 px-3 pt-1 pb-1.5">
      <div class="flex items-center justify-between">
        <span class="text-base font-bold text-gray-900 dark:text-white italic shrink-0">
          Sports
        </span>
        <button
          class="flex items-center gap-0.5 text-[0.65rem] font-semibold text-brand-bright hover:text-brand-bright/80 transition-colors cursor-pointer"
          @click="openModal(sportsIconsModal)"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
            <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <!-- Divider below the title — -mx-3 escapes the row padding to span the full card width -->
      <div class="border-b border-gray-200 dark:border-white/5 -mx-3"></div>
      <!-- -mx-2 cancels the 8px the centered tiles sit in from their item edge,
           so the first icon aligns with the "Sports" title -->
      <!-- -my-1.5 cancels the column gap so the items (with their own py-1.5)
           stretch divider to divider -->
      <div class="overflow-x-auto scrollbar-hide -mx-2.5 -my-1.5">
        <SecondaryNav />
      </div>
      <!-- Divider below the sport icons, full card width -->
      <div class="border-b border-gray-200 dark:border-white/5 -mx-3"></div>
    </div>

    <!-- Row 2: View mode + action buttons -->
    <div class="flex items-center gap-2 px-3 pb-2">
      <div class="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
        <HighlitsTab />
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <CalendarDropdown />
      </div>
    </div>

    <!-- Row 3: Market tabs -->
    <div class="px-3 pb-2.5">
      <MarketsTab />
    </div>

    <!-- Column header with search -->
    <ColumnHeaderSearch
      v-if="matches?.length"
      :matches="matches"
      :outcome-labels="outcomeLabels"
    />
  </div>
</template>

<style scoped>
.sports-filter-bar {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  border-bottom: none;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.05),
    0 4px 16px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .sports-filter-bar {
  background: oklch(22% 0.04 258);
  border-color: transparent;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.12),
    0 4px 16px oklch(0% 0 0 / 0.2);
}
</style>
