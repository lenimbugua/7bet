<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import HeaderLinks from "../components/HeaderLinks.vue";
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
      <HeaderLinks />
      <div class="max-w-[1680px] mx-auto px-3">
        <div class="w-full pt-4 flex justify-between">
          <div class="sticky bottom-0">
            <TheSidebar />
          </div>
          <NewLive3 />
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
