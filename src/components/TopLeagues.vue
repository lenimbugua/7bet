<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useTopLeagues } from "../composables/useTopLeagues";
import { useTopLeaguesStore } from "../stores/top-leagues";

import formatStuff from "@/utilities/format-stuff";

const { slugify } = formatStuff();

const { getTopLeagueImage, isWorldCup } = useTopLeagues();

const { topLeagues } = toRefs(useTopLeaguesStore());
const { initDefaultSport } = useDefaultSport();
const { setResource, setCompetition } = useSportsQueryParamsStore();
const { getMatches } = useMatches2Store();
const router = useRouter();

const { fetchTopLeagues } = useTopLeaguesStore();
fetchTopLeagues();

function fetchGame(competition) {
  initDefaultSport();
  setCompetition(competition.competitionId);
  setResource("");
  getMatches();
  router.push({
    name: "country",
    params: {
      sport: "soccer",
      country: slugify(competition.countryName),
      league: slugify(competition.competitionName),
    },
  });
  //   router.push({ name: "country", params: { country: countryName } });
}
</script>
<template>
  <div class="flex w-full overflow-x-scroll scrollbar-hide gap-2">
    <div
      v-for="league in topLeagues"
      :key="league"
      class="cursor-pointer flex w-full items-center rounded-lg shadow-xl"
      :class="
        isWorldCup(league.cbinomen)
          ? 'world-cup-glow bg-amber-50 dark:bg-amber-950/40'
          : 'bg-gray-200 dark:bg-surface-active'
      "
      @click="fetchGame(league)"
    >
      <div class="flex w-36 items-center px-1.5 gap-1.5 relative">
        <span
          v-if="isWorldCup(league.cbinomen)"
          class="absolute -top-1.5 -right-1 z-10 text-[9px] font-bold uppercase leading-none px-1.5 py-0.5 rounded-full bg-red-600 text-white shadow"
        >
          🔥 Hot
        </span>
        <div
          class="w-7 h-7 shrink-0 relative rounded-full bg-white/20 flex items-center justify-center overflow-hidden"
        >
          <img
            :src="getTopLeagueImage(league.cbinomen)"
            :alt="league.competitionName + ' logo'"
            class="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>

        <div>
          <h3
            class="flex-1 font-normal text-xs text-gray-700 leading-none dark:text-slate-200"
          >
            {{ league.competitionName }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.world-cup-glow {
  border: 1px solid oklch(80% 0.16 85);
  animation: world-cup-pulse 1.8s ease-in-out infinite;
}
@keyframes world-cup-pulse {
  0%,
  100% {
    box-shadow:
      0 0 6px oklch(80% 0.16 85 / 0.55),
      0 0 14px oklch(80% 0.16 85 / 0.35);
  }
  50% {
    box-shadow:
      0 0 12px oklch(85% 0.18 85 / 0.9),
      0 0 26px oklch(85% 0.18 85 / 0.6);
  }
}
</style>
