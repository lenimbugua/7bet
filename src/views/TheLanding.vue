<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { onMounted, ref } from "vue";
// import HotSection from "../components/HotSection.vue";
// import LiveMatchesPreviewDesktop from "../components/LiveMatchesPreviewDesktop.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";
import { useMatches2Store } from "../stores/matches2";
import MobileTest from "./MobileTest.vue";

const matchesStore = useMatches2Store();
const { initDefaultSport } = useDefaultSport();
const gameSection = ref(null);

onMounted(async () => {
  if (!matchesStore.restoreScroll) {
    initDefaultSport(true);
    return;
  }

  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});

const { isLargeScreen } = useScreenSizes();
</script>

<template>
  <LazyInfinityScroll
    v-if="isLargeScreen"
    class="bg-gray-50 dark:bg-background"
  >
    <DesktopSportsLayout
      seo-title="Sports Betting - Live Odds & Matches | 7bet Kenya"
      show-sports-tabs
    >
      <template #hero>
        <!-- Banner -->
        <div class="rounded-xl overflow-hidden">
          <TheBanner />
        </div>

        <!-- Secondary nav — game links below header -->
        <div
          class="rounded-xl secondary-nav-sticky top-14 bg-gray-100 dark:bg-card p-3 mt-3"
        >
          <SecondaryNav />
        </div>

              <TopLeaguesGrid />


        <!-- Hot games in Kenya -->
        <div class="mt-3">
          <TopGames />
        </div>

        <!-- Hot section -->
        <!-- <div class="mt-3">
          <HotSection />
        </div> -->

        <!-- Live matches preview -->
        <!-- <div class="mt-3">
          <LiveMatchesPreviewDesktop />
        </div> -->
      </template>

      <template #after-content>
        <div ref="gameSection"></div>
      </template>
    </DesktopSportsLayout>
  </LazyInfinityScroll>

  <div v-else class="block">
    <MobileTest />
  </div>
</template>
