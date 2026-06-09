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
  <LazyInfinityScroll v-if="isLargeScreen" class="live-page-bg">
    <DesktopSportsLayout
      seo-title="Sports Betting - Live Odds & Matches | 7bet Uganda"
      show-sports-tabs
    >
      <template #hero>
        <!-- Banner -->
        <!-- <div class="rounded-xl overflow-hidden">
          <TheBanner />
        </div> -->

        <!-- TRYOUT: cloned banner carousel (slides don't point anywhere) -->
        <div class="rounded-xl overflow-hidden mt-3">
          <TheBannerTryout />
        </div>

        <!-- Secondary nav — game links below header -->
        <!-- <div
          class="rounded-xl secondary-nav-sticky top-14 bg-gray-100 dark:bg-card p-3 mt-3"
        >
          <SecondaryNav />
        </div> -->

        <!-- Hot games in Uganda -->
        <div class="mt-3">
          <TopGames />
        </div>

        <!-- Recent winners -->
        <div class="mt-3">
          <WinnersCarousel />
        </div>

        <TopLeaguesGrid />
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

  <div v-else class="block live-page-bg">
    <MobileTest />
  </div>
</template>

<style scoped>
.live-page-bg {
  background: oklch(98% 0.003 258);
}
[data-theme="dark"] .live-page-bg {
  background: oklch(14% 0.03 258); /* #030915 */
}
</style>
