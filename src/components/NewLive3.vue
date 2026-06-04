<script setup>
import { useMatchDetails } from "@/composables/useMatchDetails";
import { useMatches2Store } from "@/stores/matches2";
import { useBetslipStore } from "@/stores/sports-betslip";
import { storeToRefs } from "pinia";
import { computed, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useFormatScores } from "../composables/useFormatScores";
import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";
import { useSportsIcons } from "../composables/useSportsIcons";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useLiveSportsNavigationStore } from "../stores/live-sports-navigation";
import { useNewLiveStore } from "../stores/new-live";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import LiveSortByMenu from "./live/LiveSortByMenu.vue";

const router = useRouter();
const { scrollId } = toRefs(useSportsQueryParamsStore());
const { selectedMatchIds } = storeToRefs(useBetslipStore());
const { sports } = toRefs(useLiveMatchesStore());

const { goToMatchDetails } = useMatchDetails();

const { getSportsIcon } = useSportsIcons();
const { slugify } = formatStuff();

const { homeScore, awayScore } = useFormatScores();
const { setSelectedSportId } = useLiveSportsNavigationStore();
const { selectedSportId } = toRefs(useLiveSportsNavigationStore());

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};
const { competitions, pending } = toRefs(useNewLiveStore());
const { getLiveMatches, resetAllFilters, setSport, setSelectedSport, resetSortBy } =
  useNewLiveStore();

const totalLiveCount = computed(() => {
  if (!Array.isArray(sports.value)) return 0;
  return sports.value.reduce((sum, s) => sum + (s.matchCount || 0), 0);
});

const selectSport = async (sport) => {
  setSelectedSportId(sport.sportId);
  setSelectedSport(sport);
  setSport(sport.sportId);
  resetSortBy();
  router.push({ name: "live", params: { sport: slugify(sport.sportName) } });
  await getLiveMatches();
};

function outcomeIsLocked(status) {
  return status === -1;
}

onMounted(async () => {
  const matchesStore = useMatches2Store();
  if (!matchesStore.restoreScroll) {
    resetAllFilters();
    getLiveMatches();
    setSelectedSportId("");
    return;
  }
  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});

function getSportNameByCompetitionId(response, competitionId) {
  const competitions = response || [];
  const competition = competitions.find(
    (c) => c.competitionId === competitionId
  );
  if (
    !competition ||
    !competition.matches ||
    competition.matches.length === 0
  ) {
    return null;
  }
  return competition.matches[0].sportName || null;
}

function getMarketGridCols(match) {
  const length = match?.markets?.[0]?.matchOutcomes?.length;
  if (!length) {
    return 3;
  }
  return length;
}

const goToDetail = (match) => {
  goToMatchDetails(match, router, true);
};

const getSportById = computed(() => {
  return (sportId) => {
    if (!Array.isArray(sports.value)) return null;
    return (
      sports.value.find((sport) => String(sport.sportId) === String(sportId)) ||
      null
    );
  };
});
</script>

<template>
  <main
    class="live-page-container flex-1 min-w-0 px-2 sm:px-3 lg:px-6 overflow-x-clip"
  >
    <!-- Sticky hero + column header -->
    <div class="sticky top-16 z-20 live-page-container">
    <!-- Live Hero Header -->
    <div class="live-hero rounded-2xl relative overflow-x-clip">
      <!-- Decorative orbs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-red-500/20 blur-3xl"></div>
        <div class="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-red-400/15 blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-32 rounded-full bg-red-500/10 blur-3xl"></div>
      </div>

      <div class="relative px-4 py-4 lg:px-5 lg:py-5 space-y-3.5">
        <!-- Row 1: LIVE badge + match count + sort -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <!-- Animated LIVE badge -->
            <div class="live-badge flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"></span>
              </span>
              <span class="text-[0.65rem] font-extrabold text-gray-800 dark:text-white uppercase tracking-widest">Live</span>
            </div>
            <!-- Total count -->
            <span class="text-[0.7rem] text-gray-500 dark:text-white/45 font-medium hidden sm:inline">
              {{ totalLiveCount }} matches happening now
            </span>
          </div>
          <LiveSortByMenu />
        </div>

        <!-- Row 2: Sport pills (inline, scrollable) -->
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 py-0.5">
          <button
            v-for="sport in sports"
            :key="sport.sportId"
            :class="[
              selectedSportId == sport.sportId
                ? 'sport-pill-active'
                : 'sport-pill',
            ]"
            class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.7rem] font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden capitalize"
            @click="selectSport(sport)"
          >
            <span class="text-sm leading-none">{{ getSportsIcon(sport.sportBinomen) }}</span>
            <span>{{ sport.sportName }}</span>
            <span class="sport-pill-count text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center leading-none">
              {{ sport.matchCount }}
            </span>
          </button>
        </div>

        <!-- Row 3: Active sport indicator -->
        <div class="flex items-center gap-2.5 pt-0.5">
          <span class="text-sm  leading-none">
            {{ getSportsIcon(getSportById(selectedSportId)?.sportBinomen) }}
          </span>
          <h2 class="text-sm text-gray-800 dark:text-white/90 uppercase">
            {{ getSportById(selectedSportId)?.sportName || 'All Sports' }}
          </h2>
          <div class="h-3.5 w-px bg-gray-300 dark:bg-white/15"></div>
          <span class="text-[0.6rem] font-semibold text-red-500 dark:text-red-300/80 tabular-nums">
            {{ getSportById(selectedSportId)?.matchCount || totalLiveCount }} live
          </span>
        </div>
      </div>
    </div>

    <!-- Sticky column header (medium/large screens) -->
    <LiveColumnHeader class="z-50 block rounded-lg" />
    </div>

    <!-- Loading skeleton -->
    <div v-if="pending" class="live-card rounded-xl overflow-hidden">
      <AnimatePulse :rows="9" />
    </div>

    <!-- Competition cards -->
    <div v-else-if="competitions" class="space-y-2.5">
      <div
        v-for="competition in competitions"
        :key="competition.id"
        class="live-card rounded-xl overflow-hidden"
      >
        <!-- Competition header -->
        <div
          class="comp-header flex items-center justify-between px-3 py-2.5 cursor-pointer select-none"
          role="button"
          :aria-label="(competition.isOpened ? 'Collapse ' : 'Expand ') + competition.competitionName"
          tabindex="0"
          @click="competition.isOpened = !competition.isOpened"
        >
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-xs shrink-0">
              {{ getSportsIcon(getSportNameByCompetitionId(competitions, competition.competitionId)) }}
            </span>
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-[0.65rem] font-medium text-gray-500 dark:text-white/40 truncate uppercase tracking-wide">
                {{ competition.countryName }}
              </span>
              <span class="text-gray-300 dark:text-white/15 shrink-0">&middot;</span>
              <span class="text-[0.65rem] font-semibold text-gray-700 dark:text-white/60 truncate">
                {{ competition.competitionName }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <span class="text-[0.55rem] font-medium text-gray-400 dark:text-white/30 tabular-nums">
              {{ competition.matchCount }}
            </span>
            <svg
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="{ 'rotate-180': competition.isOpened }"
              class="h-3.5 w-3.5 text-gray-400 dark:text-white/25 transition-transform duration-200"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <!-- Match rows -->
        <div v-if="!competition.isOpened">
          <div
            v-for="match in competition.matches"
            :key="match.parentMatchId"
            :class="[
              `match${match.parentMatchId}`,
              { 'animate-highlight-fade': match.parentMatchId === scrollId },
              selectedMatchIds.has(match.parentMatchId) ? 'match-selected' : '',
            ]"
            class="match-row px-3 py-2.5"
          >
            <!-- Row 1: Live badge + status + markets link -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-50"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                  <span class="text-[0.55rem] font-bold text-red-500 uppercase tracking-wider">Live</span>
                </div>
                <span class="text-[0.65rem] font-medium text-gray-500 dark:text-white/45">
                  {{ match.statusDesc }}
                </span>
                <span class="text-[0.65rem] font-bold text-red-500 tabular-nums">
                  {{ match.periodicTime }}
                </span>
              </div>
              <div
                class="flex items-center gap-1 cursor-pointer"
                role="button"
                :aria-label="'View markets for ' + match.homeTeam + ' vs ' + match.awayTeam"
                tabindex="0"
                @click="goToDetail(match)"
              >
                <TwoUpIcon v-if="match?.markets[0]?.twoGoalUpActive" />
                <span class="text-[0.6rem] text-red-500 font-medium flex items-center gap-0.5">
                  +{{ match.marketCount }}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
                    <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            <!-- Row 2-3: Teams + scores + odds -->
            <div class="flex items-center">
              <!-- Left: teams + scores -->
              <div
                class="flex-1 pr-3 space-y-0.5 cursor-pointer min-w-0"
                role="button"
                :aria-label="'View match details: ' + match.homeTeam + ' vs ' + match.awayTeam"
                tabindex="0"
                @click="goToDetail(match)"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[0.8rem] font-medium text-gray-800 dark:text-white/85 truncate">
                    {{ match.homeTeam }}
                  </span>
                  <span class="text-[0.8rem] font-bold text-red-500 tabular-nums shrink-0">
                    {{ homeScore(match.result) }}
                  </span>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[0.8rem] font-medium text-gray-800 dark:text-white/85 truncate">
                    {{ match.awayTeam }}
                  </span>
                  <span class="text-[0.8rem] font-bold text-red-500 tabular-nums shrink-0">
                    {{ awayScore(match.result) }}
                  </span>
                </div>
              </div>

              <!-- Right: odds buttons -->
              <div class="w-[45%] shrink-0">
                <div
                  v-if="!match?.markets[0].matchOutcomes?.length || outcomeIsLocked(match?.markets[0]?.status)"
                  :class="`grid-cols-${getMarketGridCols(match)}`"
                  class="grid text-center items-center gap-1.5"
                >
                  <button
                    v-for="i in getMarketGridCols(match)"
                    :key="'lock-'+i"
                    class="flex flex-col justify-center items-center p-1 py-2 h-full rounded-md opacity-50 cursor-pointer"
                    style="background: oklch(0% 0 0 / 0.05)"
                    @click="goToDetail(match)"
                  >
                    <span class="text-[0.6rem] leading-none mb-0.5 text-gray-400 dark:text-white/25">—</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-gray-400 dark:text-white/30">
                      <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div
                  v-else
                  :class="`grid-cols-${getMarketGridCols(match)}`"
                  class="grid text-center items-center gap-1.5"
                >
                  <TheButton2
                    v-for="outcome in match?.markets[0].matchOutcomes"
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
                    :live="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.live-page-container {
  background: oklch(98% 0.003 258);
}
[data-theme="dark"] .live-page-container {
  background: oklch(14% 0.03 258);
}

.live-hero {
  background: linear-gradient(135deg, oklch(93% 0.03 260), oklch(90% 0.045 268), oklch(88% 0.035 255));
}
[data-theme="dark"] .live-hero {
  background: linear-gradient(135deg, oklch(30% 0.07 260), oklch(27% 0.06 268), oklch(28% 0.065 255));
}

.live-badge {
  background: oklch(0% 0 0 / 0.05);
  border: 1px solid oklch(0% 0 0 / 0.08);
}
[data-theme="dark"] .live-badge {
  background: oklch(100% 0 0 / 0.1);
  border: 1px solid oklch(100% 0 0 / 0.06);
}

.sport-pill {
  background: oklch(0% 0 0 / 0.04);
  color: oklch(40% 0.02 260);
}
.sport-pill:hover {
  background: oklch(0% 0 0 / 0.08);
  color: oklch(25% 0.02 260);
}
[data-theme="dark"] .sport-pill {
  background: oklch(100% 0 0 / 0.08);
  color: oklch(100% 0 0 / 0.7);
}
[data-theme="dark"] .sport-pill:hover {
  background: oklch(100% 0 0 / 0.14);
  color: oklch(100% 0 0 / 0.9);
}

.sport-pill-active {
  background: var(--brand-bright);
  color: white;
  box-shadow: 0 2px 8px oklch(70% 0.19 142 / 0.3);
}
[data-theme="dark"] .sport-pill-active {
  background: var(--brand-bright);
  color: white;
  box-shadow: 0 2px 8px oklch(70% 0.19 142 / 0.25);
}

.sport-pill-count {
  background: oklch(0% 0 0 / 0.06);
}
[data-theme="dark"] .sport-pill-count {
  background: oklch(100% 0 0 / 0.1);
}
.sport-pill-active .sport-pill-count {
  background: oklch(60% 0.22 25);
  color: white;
}
[data-theme="dark"] .sport-pill-active .sport-pill-count {
  background: oklch(60% 0.22 25);
  color: white;
}

.live-card {
  background: white;
  box-shadow:
    0 1px 2px oklch(0% 0 0 / 0.03),
    0 2px 8px oklch(0% 0 0 / 0.02);
}
[data-theme="dark"] .live-card {
  background: oklch(22% 0.04 258);
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.12),
    0 4px 12px oklch(0% 0 0 / 0.15);
}

.comp-header {
  background: oklch(97% 0.005 258 / 0.8);
}
[data-theme="dark"] .comp-header {
  background: oklch(100% 0 0 / 0.03);
}

.match-row:nth-child(even) {
  background: oklch(97% 0.003 258);
}
[data-theme="dark"] .match-row:nth-child(even) {
  background: oklch(100% 0 0 / 0.02);
}

.match-selected {
  background: oklch(70% 0.19 142 / 0.04);
  box-shadow: inset 0 0 0 1.5px oklch(70% 0.19 142 / 0.2);
  border-radius: 0.625rem;
}
[data-theme="dark"] .match-selected {
  background: oklch(70% 0.19 142 / 0.06);
  box-shadow: inset 0 0 0 1.5px oklch(70% 0.19 142 / 0.25);
}
</style>
