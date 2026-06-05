<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import LeagueMatchCard from "./LeagueMatchCard.vue";
import CasinoRow from "./casino/CasinoRow.vue";

const { matches, pending } = storeToRefs(useMatches2Store());
const { page, layout } = storeToRefs(useSportsQueryParamsStore());

defineProps({
  flat: {
    type: Boolean,
    default: false,
  },
});

// Casino row inserted after every four match rows, cycling through these
const CASINO_CYCLE = ["crash", "slots", "virtuals", "top"];

// Interleaved feed: match rows + a casino row after every 4 matches
const feed = computed(() => {
  const items = [];
  let casinoIdx = 0;
  (matches.value || []).forEach((match, i) => {
    items.push({ type: "match", id: match.parentMatchId, match });
    if ((i + 1) % 4 === 0) {
      items.push({
        type: "casino",
        id: `casino-${i}`,
        categoryKey: CASINO_CYCLE[casinoIdx % CASINO_CYCLE.length],
      });
      casinoIdx++;
    }
  });
  return items;
});
</script>

<template>
  <LeagueMatchCard v-if="layout == 'grid'" />
  <div v-else>
    <EmptyState v-if="matches?.length == 0 && !pending" />
    <AnimatePulse v-if="pending && page == 0" :rows="10" />
    <div v-else :class="[flat ? '' : 'matches-list rounded-xl overflow-hidden', 'divide-y divide-gray-200/70 dark:divide-white/5']">
      <template v-for="item in feed" :key="item.id">
        <MatchTwo v-if="item.type === 'match'" :match="item.match" />
        <CasinoRow v-else :category-key="item.categoryKey" />
      </template>
    </div>
    <AnimatePulse v-if="pending" class="z-1" :rows="7" />
  </div>
</template>

<style scoped>
.matches-list {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.05),
    0 4px 16px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .matches-list {
  background: oklch(22% 0.04 258);
  border-color: transparent;
  box-shadow: 0 1px 3px oklch(0% 0 0 / 0.1);
}
</style>
