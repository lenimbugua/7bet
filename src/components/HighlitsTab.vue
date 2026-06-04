<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
// import { Squares2X2Icon } from "@heroicons/vue/24/outline";
import { ref, toRefs } from "vue";

const { fetchCompetions, selectCompetitions } = useCompetionsStore();

const highlights = ref([
  {
    name: "highlight",
  },
  {
    name: "upcoming",
  },
  {
    name: "grid",
  },
]);

const { setResource, setDay, setLayout } = useSportsQueryParamsStore();
const { layout } = toRefs(useSportsQueryParamsStore());
const { markets } = toRefs(useCompetionsStore());

const { getMatches, emptyMatches, setCalendarIsPending, setMarkets } =
  useMatches2Store();

const fetchCompetitions = async () => {
  selectCompetitions([]);
  await fetchCompetions();
  setMarkets(markets.value);
};

async function fetchMatches(resource) {
  setLayout(resource);
  if (resource === "grid") {
    fetchCompetitions();
    return;
  }
  emptyMatches();
  setDay("");
  setResource(resource);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}

function isSelected(selected) {
  if (layout.value) {
    return selected === layout.value;
  }
}
</script>
<template>
  <TabGroup>
    <TabList
      aria-label="Match highlight filters"
      class="flex items-center rounded-lg bg-gray-100 dark:bg-white/5 p-0.5"
    >
      <Tab
        v-for="category in highlights"
        :key="category.name"
        as="template"
        @click="fetchMatches(category.name)"
      >
        <button
          :class="[
            'relative px-3 py-1 text-xs font-medium capitalize rounded-md transition-all duration-150',
            'focus:outline-hidden',
            isSelected(category.name)
              ? 'bg-white dark:bg-white/10 text-brand-bright font-semibold shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
          ]"
        >
          <span v-if="category.name === 'grid'">Popular</span>
          <span v-else>{{ category.name }}</span>
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
