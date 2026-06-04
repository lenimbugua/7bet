<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useMatches2Store } from "../stores/matches2";

const { setSelectedMarket, resetSelectedMarket } = useMatches2Store();
const { markets } = storeToRefs(useMatches2Store());

function fetchMatches(subtype) {
  setSelectedMarket(subtype);
}

onBeforeMount(() => {
  resetSelectedMarket();
});
</script>

<template>
  <TabGroup>
    <TabList
      aria-label="Betting markets"
      class="flex gap-1.5 w-full overflow-x-auto scrollbar-hide"
    >
      <Tab
        v-for="category in markets"
        :key="category.name"
        v-slot="{ selected }"
        as="template"
      >
        <button
          :class="[
            'px-3 py-1 text-xs whitespace-nowrap rounded-full border transition-colors duration-150',
            'focus:outline-hidden',
            selected
              ? 'bg-brand-bright/15 dark:bg-brand-bright/20 border-brand-bright/40 text-brand-bright font-semibold'
              : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300',
          ]"
          @click="fetchMatches(category.subTypeId)"
        >
          {{ category.oddType }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
