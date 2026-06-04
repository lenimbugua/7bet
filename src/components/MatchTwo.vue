<script setup>
import { useBetslipStore } from "@/stores/sports-betslip";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useFormatDates } from "../composables/useFormatDates";
import { useMatchDetails } from "../composables/useMatchDetails";
import { useMatches2Store } from "../stores/matches2";
import { useSportsStore } from "../stores/sports";

import SportsIcons from "./SportsIcons.vue";
import TwoUpIcon from "./TwoUpIcon.vue";

const { goToMatchDetails } = useMatchDetails();
const { humanFriendlyDate } = useFormatDates();
const { scrollId } = storeToRefs(useSportsQueryParamsStore());
const { selectedMatchIds } = storeToRefs(useBetslipStore());
const { selectedSport } = storeToRefs(useSportsStore());
const { getDefaultMarket } = storeToRefs(useMatches2Store());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

const router = useRouter();
defineProps({
  match: {
    type: Object,
    required: true,
  },
});

// function outcomeIsLocked(status) {
//   return status === -1;
// }

function filterBySubTypeId(data) {
  if (!data.length) {
    return [];
  }
  let item = data.find(
    (item) => item.subTypeId === "" + getDefaultMarket.value
  );
  if (!item) {
    return [];
  }
  return item;
}
</script>
<template>
  <div
    :id="match.parentMatchId"
    :class="[
      `match${match.parentMatchId}`,
      { 'animate-highlight-fade': match.parentMatchId === scrollId },
      selectedMatchIds.has(match.parentMatchId) ? 'match-selected' : '',
    ]"
    class="match-row"
  >
    <!-- Meta: competition + time -->
    <div
      class="flex items-center justify-between pt-2 pb-1 cursor-pointer"
      role="button"
      :aria-label="'View competition: ' + match.competitionName"
      tabindex="0"
      @click="goToMatchDetails(match, router, false)"
    >
      <div class="flex items-center gap-1.5 min-w-0">
        <SportsIcons :size="'h-3.5 w-3.5'" :icon="selectedSport" class="shrink-0 opacity-40" />
        <span class="text-[0.6rem] font-medium text-gray-500 dark:text-white/40 truncate uppercase tracking-wide">
          {{ match.competitionName }}
        </span>
      </div>
      <div class="flex items-center gap-1.5 shrink-0 ml-2">
        <TwoUpIcon v-if="match?.markets[0]?.twoGoalUpActive" />
        <span class="text-[0.6rem] font-medium text-gray-400 dark:text-white/30">
          {{ humanFriendlyDate(match.startTime) }}
        </span>
      </div>
    </div>

    <!-- Teams + odds row -->
    <div class="flex items-center justify-between pb-2.5 gap-2">
      <!-- Teams (left) -->
      <div
        class="flex-1 shrink-0 cursor-pointer min-w-0"
        role="button"
        :aria-label="'View details: ' + match.homeTeam + ' vs ' + match.awayTeam"
        tabindex="0"
        @click="goToMatchDetails(match, router, false)"
      >
        <p class="text-[0.8rem] font-semibold text-gray-800 dark:text-white/85 truncate leading-tight">
          {{ match.homeTeam }}
        </p>
        <p class="text-[0.8rem] font-semibold text-gray-800 dark:text-white/85 truncate leading-tight mt-1.5">
          {{ match.awayTeam }}
        </p>
      </div>

      <!-- Odds (right) -->
      <div class="flex items-center gap-1.5 shrink-0">
        <div
          v-if="!filterBySubTypeId(match?.markets)?.matchOutcomes?.length"
          class="flex items-center gap-1.5"
        >
          <button
            v-for="i in 3"
            :key="i"
            class="flex-1 flex flex-col justify-center items-center py-2.5 px-2 rounded-lg min-w-[3.2rem] opacity-50 cursor-pointer odd-btn-locked"
            @click="goToMatchDetails(match, router, false)"
          >
            <span class="text-[0.6rem] leading-none mb-0.5 text-gray-400 dark:text-white/30">—</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-gray-400 dark:text-white/30">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <TheButton
          v-for="outcome in filterBySubTypeId(match?.markets).matchOutcomes"
          v-else
          :key="outcome.id"
          :outcome="outcome"
          :season-id="match.homeTeam"
          :home-team="match.homeTeam"
          :sport-id="match.sportId"
          :two-goal-up-active="match?.markets[0]?.twoGoalUpActive"
          :custom-id="
            formCustomId(
              match.parentMatchId,
              outcome.marketId,
              outcome.outcomeName,
              outcome.outcomeId
            )
          "
          :away-team="match.awayTeam"
          :start-time="match.startTime"
          :competition-id="match.competitionId"
          :sub-type-id="parseInt(outcome.marketId)"
          :competition-name="match.competitionName"
          :country-name="match.countryName"
          :sport-name="match.sportName"
          :parent-match-id="match.parentMatchId"
        />

        <div
          class="shrink-0 cursor-pointer text-[0.65rem] font-semibold text-brand-bright whitespace-nowrap pl-1"
          role="button"
          :aria-label="'View more markets for ' + match.homeTeam + ' vs ' + match.awayTeam"
          tabindex="0"
          @click="goToMatchDetails(match, router, false)"
        >
          +{{ match.marketCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-row {
  padding: 0.625rem 0.75rem;
}
.match-row:nth-child(even) {
  background: oklch(0% 0 0 / 0.015);
}
[data-theme="dark"] .match-row:nth-child(even) {
  background: oklch(100% 0 0 / 0.015);
}

.match-selected {
  background: oklch(70% 0.19 142 / 0.05) !important;
  border-radius: 0.625rem;
}
[data-theme="dark"] .match-selected {
  background: oklch(70% 0.19 142 / 0.08) !important;
}
.odd-btn-locked {
  background: oklch(96% 0.003 258);
  border: 1px solid oklch(0% 0 0 / 0.06);
}
[data-theme="dark"] .odd-btn-locked {
  background: oklch(100% 0 0 / 0.06);
  border-color: transparent;
}
</style>
