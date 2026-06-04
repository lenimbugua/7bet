<script setup>
import InfiniteScroll from "./InfiniteScroll.vue";
import LazyInfinityScroll from "./LazyInfinityScroll.vue";
import MobileFooterV2 from "./mobile/MobileFooterV2.vue";
import HeaderLinks from "./HeaderLinks.vue";
import CategoryPills from "./mobile/CategoryPills.vue";
import SportsFilterBar from "./mobile/SportsFilterBar.vue";

defineProps({
  seoTitle: { type: String, default: "" },
});
</script>

<template>
  <LazyInfinityScroll>
    <h1 v-if="seoTitle" class="sr-only">{{ seoTitle }}</h1>

    <!-- Sticky header -->
    <HeaderLinks />

    <!-- Scrollable content -->
    <div class="bg-gray-50 dark:bg-background">
      <!-- Category pills -->
      <CategoryPills class="px-3 pt-2"/>

      <!-- Hero content (landing only) -->
      <slot name="hero" />

      <!-- Custom content override OR default sports filter + match list -->
      <template v-if="$slots.content">
        <slot name="content" />
      </template>
      <template v-else>
        <SportsFilterBar />
        <div class="sports-matches mx-3 rounded-b-xl overflow-hidden">
          <InfiniteScroll :flat="true" />
        </div>
      </template>
    </div>

    <SEOMarkupContent />
    <Footer />
    <MobileFooterV2 />
  </LazyInfinityScroll>
</template>

<style scoped>
.sports-matches {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  border-top: none;
}
[data-theme="dark"] .sports-matches {
  background: oklch(22% 0.04 258);
  border-color: transparent;
}
</style>
