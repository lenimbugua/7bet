<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
// import SecondaryNav from "./SecondaryNav.vue";
// import NavLinks from "./NavLinks.vue";
import { useMatches2Store } from "../stores/matches2";

const { matches, getDefaultMarket } = storeToRefs(useMatches2Store());

defineProps({
  seoTitle: { type: String, default: "" },
  showSportsTabs: { type: Boolean, default: false },
});

const outcomeLabels = computed(() => {
  if (!matches.value?.length) return ["1", "X", "2"];
  const marketId = "" + getDefaultMarket.value;
  for (const match of matches.value) {
    if (!match?.markets?.length) continue;
    const market = match.markets.find((m) => m.subTypeId === marketId);
    if (market?.matchOutcomes?.length) {
      return market.matchOutcomes.map((o) => o.outcomeName || "");
    }
  }
  return ["1", "X", "2"];
});
</script>

<template>
  <h1 v-if="seoTitle" class="sr-only">{{ seoTitle }}</h1>
  <HeaderLinks hide-nav-links />
  <div class="max-w-[1680px] mx-auto pr-4">
    

    <div class="w-full flex justify-between gap-5">
      <!-- Sidebar (no top padding so it sits flush against the header) -->
      <div class="shrink-0">
        <TheSidebar />
      </div>

      <!-- Main content -->
      <div class="flex-1 min-w-0 max-w-[800px] 2xl:max-w-[1000px] pt-3">
        <!-- Navigation links (hosted in the middle column on desktop) -->
        <!-- <NavLinks class="mb-2" /> -->

        <!-- Hero content (Banner, HotSection, LivePreview — landing only) -->
        <slot name="hero" />

        <!-- Custom content override OR default sports filter + match list -->
        <template v-if="$slots.content">
          <slot name="content" />
        </template>
        <template v-else>
          <!-- Sports filter + Match list (unified card) -->
          <div class="rounded-xl sports-filter-card overflow-hidden" :class="{ 'mt-3': $slots.hero }">
            <!-- Sticky header: filter bar -->
            <div class="sticky z-2 bg-white/95 dark:bg-card backdrop-blur-sm border-b border-gray-100 dark:border-white/5">
              <!-- Sport tabs row (landing only) -->
              <div
                v-if="showSportsTabs"
                class="flex flex-col gap-1.5 px-3 pt-3 pb-1.5"
              >
                <span
                  class="text-base font-bold text-gray-900 dark:text-white italic shrink-0"
                >
                  Sports
                </span>
                <div class="overflow-x-auto scrollbar-hide">
                  <SecondaryNav />
                </div>
              </div>

              <!-- View mode + action buttons -->
              <div class="flex items-center gap-2 px-3 pt-3 pb-2" :class="{ 'pt-0': showSportsTabs }">
                <div class="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                  <HighlitsTab />
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <CalendarDropdown />
                </div>
              </div>

              <!-- Market tabs -->
              <div class="px-3 pb-2.5">
                <MarketSection />
              </div>

              <!-- Column header with search -->
              <ColumnHeaderSearch
                v-if="matches?.length"
                :matches="matches"
                :outcome-labels="outcomeLabels"
              />
            </div>

            <!-- Match list -->
            <InfiniteScroll />
          </div>

          <SEOMarkupContent />
        </template>
      </div>

      <!-- Betslip panel -->
      <div class="shrink-0 pt-3">
        <SportsBetslipPanel />
      </div>
    </div>
  </div>
  <slot name="after-content" />
  <Footer />
</template>

<style scoped>
.secondary-nav-sticky {
  position: sticky;
  z-index: 30;
  overflow: hidden;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid oklch(0% 0 0 / 0.06);
}
[data-theme="dark"] .secondary-nav-sticky {
  border-bottom-color: oklch(100% 0 0 / 0.06);
}

.sports-filter-card {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.05),
    0 4px 16px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .sports-filter-card {
  background: oklch(22% 0.04 258);
  border-color: transparent;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.12),
    0 4px 16px oklch(0% 0 0 / 0.2);
}
</style>
