<script setup>
import SecondaryNavIcons from "@/components/SecondaryNavIcons.vue";
// import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import { useSports } from "@/composables/useSports";
import { useSportsStore } from "@/stores/sports";
import { toRefs } from "vue";

import { useSportsNavigationStore } from "@/stores/sports-navigation";

defineProps({
  // Thinner sizing for dense mobile bars (e.g. QuickAccessBar)
  compact: {
    type: Boolean,
    default: false,
  },
});

const { selectedSportId } = toRefs(useSportsNavigationStore());
const { setSelectedSportId } = useSportsNavigationStore();
// const { elementRefs: sportRefs } = useScrollToSelected(selectedSportId);

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
  <div
    v-for="link in games"
    :key="link.name"
    class="text-center text-slate-500 hover:text-muted-foreground cursor-pointer py-1.5"
    :class="
      isSelected(link.id)
        ? 'bg-linear-to-b from-brand-bright/15 to-brand-bright/5'
        : ''
    "
    @click="getMatches(link.id, link.name, link.icon, true)"
  >
    <div
      class="flex-col justify-center items-center inline-flex"
    >
      <div
        class="flex flex-col items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        :class="compact ? 'w-8 h-8 md:w-10 md:h-10' : 'w-9 h-9'"
      >
        <SecondaryNavIcons :icon="link.icon" :icon-css="`${compact ? 'h-5 w-5 md:h-6 md:w-6' : 'h-5 w-5 sm:h-6 sm:w-6'} ${link.iconColor || 'text-gray-600 dark:text-white/60'}`" />
      </div>
      <div
        :class="[
          isSelected(link.id)
            ? 'text-brand-bright font-semibold'
            : 'dark:text-gray-100/90 text-gray-800',
          compact ? 'text-[0.6rem] md:text-xs mt-0.5 md:mt-1' : 'text-xs mt-1',
        ]"
        class="font-medium w-14 text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ link.name }}
      </div>
    </div>
  </div>
</template>
