<script setup>
import HeroBanner from "../components/mobile/HeroBanner.vue";
// import HotSection from "../components/HotSection.vue";
// import LiveMatchesPreview from "../components/mobile/LiveMatchesPreview.vue";
import QuickAccessBar from "../components/mobile/QuickAccessBar.vue";
import TopLeaguesGrid from "../components/mobile/TopLeaguesGrid.vue";
</script>

<template>
  <MobileSportsLayout seo-title="Sports Betting – Fixtures & Odds | 7bet">
    <template #hero>
      <!-- Hero banner carousel -->
      <HeroBanner />

      <!-- Quick access: merged navigation -->
      <QuickAccessBar />

      <!-- Top leagues 2-column grid -->
      <TopLeaguesGrid />

      <!-- Hot games in Kenya -->
        <div class="mt-3">
          <TopGames />
        </div>

      <!-- HOT section: Matches, Builder, Codes, Games -->
      <!-- <div class="mx-3 mt-3">
          <HotSection />
      </div> -->

      <!-- Live matches -->
      <!-- <LiveMatchesPreview /> -->
    </template>
  </MobileSportsLayout>
</template>
