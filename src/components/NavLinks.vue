<script setup>
import { useRoute, useRouter } from "vue-router";
import { useLinksStore } from "../stores/links";
import { storeToRefs } from "pinia";
import NavLinksIcons from "./NavLinksIcons.vue";
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useMixpanel } from "@/composables/useMixpanel";

import casinoIcon from "@/assets/icons/casino.svg";
import sportsIcon from "@/assets/icons/sports.svg";
import liveIcon from "@/assets/icons/live.svg";
import aviatorIcon from "@/assets/icons/aviator.svg";
import virtualsIcon from "@/assets/icons/virtuals.svg";
import promosIcon from "@/assets/icons/promos.svg";

// Desktop navlink icons sourced from assets/icons (keyed by link.path)
const navAssetIcons = {
  "casino-home": casinoIcon,
  sports: sportsIcon,
  live: liveIcon,
  aviator: aviatorIcon,
  virtuals: virtualsIcon,
  promotions: promosIcon,
};

const mixpanel = useMixpanel();

function trackSportClick() {
  mixpanel.track("Sport Link Clicked", {
    link: "sport",
    time: new Date().toISOString(),
  });
}

const { initDefaultSport } = useDefaultSport();
const router = useRouter();
const { links } = storeToRefs(useLinksStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

const casinoCategoryMap = {
  crash: "all",
  virtuals: "virtuals",
};

function goToLink(path) {
  if (path == "sports") {
    trackSportClick();
    goToSports();
    return;
  }
  if (path == "aviator") {
    router.push({ name: "aviator" });
    return;
  }
  if (path == "live") {
    router.push({ name: "live", params: { sport: "soccer" } });
    return;
  }
  if (path == "countries") {
    router.push({ name: "countries" });
    return;
  }
  if (casinoCategoryMap[path]) {
    router.push({
      name: "casino-home",
      query: { category: casinoCategoryMap[path] },
    });
    return;
  }
  router.push({ name: path });
}

function isSelected(name) {
  const route = useRoute();
  if (name == "sports") {
    if (route.name === "home") return true;
  }
  if (casinoCategoryMap[name] && route.name === "casino-home") {
    return route.query.category === casinoCategoryMap[name];
  }
  return route.name === name;
}
</script>

<template>
  <!-- Nav links row -->
  <nav class="flex items-center gap-2 min-w-0 h-14 overflow-x-auto scrollbar-hide">
    <button
      v-for="link in links"
      :key="link.name"
      :aria-label="`Navigate to ${link.name}`"
      :class="[
        isSelected(link.path)
          ? 'bg-brand-bright/15 text-brand-bright ring-1 ring-brand-bright/30'
          : 'bg-foreground/5 text-foreground hover:bg-foreground/10',
      ]"
      class="relative flex items-center gap-2 pl-4 pr-2.5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
      @click="goToLink(link.path)"
    >
      {{ link.name }}
      <img
        v-if="navAssetIcons[link.path]"
        :src="navAssetIcons[link.path]"
        :alt="link.name"
        class="h-7 w-7 object-contain shrink-0"
      />
      <NavLinksIcons
        v-else-if="link.icon"
        :icon="link.icon"
        :icon-css="
          isSelected(link.path)
            ? 'h-5 w-5 text-brand-bright fill-current'
            : 'h-5 w-5 text-current opacity-70 fill-current'
        "
      />
      <span
        v-if="link.badge"
        class="hot-badge absolute -top-0.5 -right-0.5 px-1 py-px rounded-full text-[9px] font-black leading-none text-white bg-brand-bright"
      >
        {{ link.badge }}
      </span>
    </button>

  </nav>
</template>

<style scoped>
.hot-badge {
  animation: badge-glow 1.5s ease-in-out infinite;
}

@keyframes badge-glow {
  0%,
  100% {
    box-shadow: 0 0 4px oklch(70% 0.19 142 / 0.6);
  }
  50% {
    box-shadow: 0 0 8px oklch(70% 0.19 142 / 0.9), 0 0 16px oklch(70% 0.19 142 / 0.4);
  }
}
</style>
