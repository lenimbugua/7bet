<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useMatches2Store } from "@/stores/matches2";
import CalendarDropdown from "../CalendarDropdown.vue";
import ColumnHeaderSearch from "../ColumnHeaderSearch.vue";
import HighlitsTab from "../HighlitsTab.vue";
import MarketsTab from "../MarketsTab.vue";
import SportsTabs from "../SportsTabs.vue";

const { matches, getDefaultMarket } = storeToRefs(useMatches2Store());

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
  <div class="sticky z-40 top-22 md:top-30 mt-3 sports-filter-bar mx-3 rounded-t-xl">
    <!-- Row 1: Sport tabs -->
    <div class="flex items-center gap-3 px-3 pt-3 pb-1.5 overflow-x-auto scrollbar-hide">
      <span class="text-base font-bold text-gray-900 dark:text-white italic shrink-0">
        Sports
      </span>
      <div class="w-px h-4 bg-gray-300 dark:bg-white/20 shrink-0"></div>
      <SportsTabs />
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
