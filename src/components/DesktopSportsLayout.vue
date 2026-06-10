<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
// import SecondaryNav from "./SecondaryNav.vue";
// import NavLinks from "./NavLinks.vue";
import { useMatches2Store } from "../stores/matches2";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";

const { sportsIconsModal } = useModalTypes();
const { openModal } = useModalStore();

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
                class="flex flex-col gap-1.5 px-3 pt-1 pb-1.5"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-base font-bold text-gray-900 dark:text-white italic shrink-0"
                  >
                    Sports
                  </span>
                  <button
                    class="flex items-center gap-0.5 text-[0.65rem] font-semibold text-brand-bright hover:text-brand-bright/80 transition-colors cursor-pointer"
                    @click="openModal(sportsIconsModal)"
                  >
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
                      <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <!-- Divider below the title — -mx-3 escapes the row padding to span the full card width -->
                <div class="border-b border-gray-200 dark:border-white/5 -mx-3"></div>
                <!-- -mx-2 cancels the 8px the centered tiles sit in from their item edge;
                     -my-1.5 cancels the column gap so items span divider to divider -->
                <div class="overflow-x-auto scrollbar-hide -mx-2.5 -my-1.5">
                  <SecondaryNav />
                </div>
                <!-- Divider below the sport icons, full card width -->
                <div class="border-b border-gray-200 dark:border-white/5 -mx-3"></div>
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

        </template>
      </div>

      <!-- Betslip panel -->
      <div class="shrink-0 pt-3">
        <SportsBetslipPanel />
      </div>
    </div>

    <!-- About soccer betting — sits just above the footer -->
    <SEOMarkupContent v-if="!$slots.content" class="mx-3 my-4" />
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
