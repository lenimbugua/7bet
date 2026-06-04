<script setup>
import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import { useSports } from "@/composables/useSports";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";
import { useSportsStore } from "../stores/sports";
import { useSportsNavigationStore } from "../stores/sports-navigation";


const { selectedSportId } = toRefs(useSportsNavigationStore());
const { setSelectedSportId } = useSportsNavigationStore();
const { elementRefs: sportRefs } = useScrollToSelected(selectedSportId);

const { setViewToDisplay } = useSportsStore();
const { fetchMatches, games } = useSports();



const getMatches = (sportId, name, icon, goToSports) => {
  setViewToDisplay("sport");
  setSelectedSportId(sportId);
  fetchMatches(sportId, name, icon, goToSports);
};
const isSelected = (id) => {
  return selectedSportId.value == id;
};
</script>

<template>
  <TabGroup>
    <TabList aria-label="Sports categories" class="flex justify-between">
      <Tab
        v-for="thisSport in games"
        :key="thisSport.id"
        as="template"
        @click="getMatches(thisSport.id, thisSport.name, thisSport.icon, false)"
      >
        <div
          :ref="(el) => (sportRefs[thisSport.id] = el)"
          :class="[
            'cursor-pointer rounded-md  flex flex-col items-center px-2 text-sm whitespace-nowrap capitalize text-center font-medium',
            ' focus:outline-hidden',
            isSelected(thisSport.id)
              ? 'text-brand-bright font-semibold'
              : 'dark:text-gray-100/90 text-gray-800',
          ]"
        >
          {{ thisSport.name }}
          <div
            class="w-2/3"
            :class="[
              isSelected(thisSport.id) ? 'border-b-2 border-brand-bright' : '',
            ]"
          ></div>
        </div>
      </Tab>
    </TabList>
  </TabGroup>
</template>
