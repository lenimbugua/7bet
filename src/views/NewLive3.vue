<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import HeaderLinks from "../components/HeaderLinks.vue";
import CategoryPills from "../components/mobile/CategoryPills.vue";
import NewLive3 from "../components/NewLive3.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useNewLiveStore } from "../stores/new-live";
const { pollLiveMatches } = useNewLiveStore();
const { pollLiveMatches: pollLiveMatches2 } = useLiveMatchesStore();

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

onMounted(() => {
  pollLiveMatches2();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const { isLargeScreen } = useScreenSizes();
</script>
<template>
  <div>
    <h1 class="sr-only">Live Betting – Real-Time Odds & Matches | 7bet</h1>
    <div v-if="isLargeScreen">
      <div class="sticky top-0 z-40 bg-gray-50 dark:bg-background">
        <HeaderLinks hide-nav-links />
      </div>
      <div class="max-w-[1680px] mx-auto px-3">
        <div class="w-full pt-4 flex justify-between">
          <div class="sticky bottom-0">
            <TheSidebar />
          </div>
          <div class="flex-1 min-w-0 flex flex-col">
            <CategoryPills :is-sticky="false" class="mb-3" />
            <NewLive3 />
          </div>
          <div class="flex sticky">
            <SportsBetslipPanel />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <div
      v-else
      class="matches-scroll-container max-h-dvh flex flex-col overflow-scroll"
    >
      <div class="grow live-page-bg">
        <div class="sticky top-0 pb-2 live-page-bg z-40">
          <!-- <TheDepositBar /> -->
          <HeaderLinks />
          <CategoryPills :is-sticky="false" class="px-3 pt-2" />
        </div>
        <NewLive3 />
      </div>
      <MobileFooterV2 />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.live-page-bg {
  background: oklch(98% 0.003 258);
}
[data-theme="dark"] .live-page-bg {
  background: oklch(14% 0.03 258);
}
</style>
