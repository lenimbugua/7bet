<script setup>
// import HeroBanner from "../components/mobile/HeroBanner.vue";
// import HotSection from "../components/HotSection.vue";
// import LiveMatchesPreview from "../components/mobile/LiveMatchesPreview.vue";
// import QuickAccessBar from "../components/mobile/QuickAccessBar.vue";
import TopLeaguesGrid from "../components/mobile/TopLeaguesGrid.vue";
</script>

<template>
  <MobileSportsLayout seo-title="Sports Betting – Fixtures & Odds | 7bet">
    <template #hero>
      <!-- Hero banner carousel -->
      <!-- <HeroBanner /> -->

      <!-- TRYOUT: cloned banner carousel (slides don't point anywhere) -->
      <div class="p-3">
        <div class="rounded-xl overflow-hidden">
          <TheBannerTryout />
        </div>
      </div>

      <!-- Quick access: merged navigation -->
      <!-- <QuickAccessBar /> -->

      <!-- Hot games in Uganda -->
      <div class="">
        <TopGames />
      </div>

      <!-- Recent winners -->
      <div class="m-3">
        <WinnersCarousel />
      </div>

      <!-- Top leagues 2-column grid -->
      <TopLeaguesGrid class="my-3" />
      <!-- HOT section: Matches, Builder, Codes, Games -->
      <!-- <div class="mx-3 mt-3">
          <HotSection />
      </div> -->

      <!-- Live matches -->
      <!-- <LiveMatchesPreview /> -->
    </template>
  </MobileSportsLayout>
</template>
