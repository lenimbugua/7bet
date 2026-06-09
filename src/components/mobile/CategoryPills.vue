<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useRoute, useRouter } from "vue-router";

import casinoIcon from "@/assets/icons/casino.svg";
import liveIcon from "@/assets/icons/live.svg";
import promosIcon from "@/assets/icons/promos.svg";
import sportsIcon from "@/assets/icons/sports.svg";
import virtualsIcon from "@/assets/icons/virtuals.svg";

defineProps({
  // Whether the pills bar sticks to the top (disable when another sticky
  // section sits below it, e.g. the live page hero).
  isSticky: { type: Boolean, default: true },
});

const router = useRouter();
const route = useRoute();
const { sportsIconsModal } = useModalTypes();
const { openModal } = useModalStore();

const categories = [
  {
    name: "Football",
    to: { name: "sports", params: { sport: "soccer" } },
    activeOn: ["home", "sports", "country", "countries", "match-details"],
    icon: "football",
    img: sportsIcon,
  },
  {
    name: "Casino",
    to: { name: "casino-home" },
    activeOn: ["casino-home", "casino-game"],
    icon: "casino",
    img: casinoIcon,
  },
  {
    name: "Live",
    to: { name: "live", params: { sport: "soccer" } },
    activeOn: ["live"],
    icon: "live",
    img: liveIcon,
  },
  {
    name: "Crash",
    to: { name: "casino-home", query: { category: "crash" } },
    activeOn: [],
    icon: "crash",
  },
  {
    name: "Virtuals",
    to: { name: "casino-home", query: { category: "virtuals" } },
    activeOn: [],
    icon: "virtuals",
    img: virtualsIcon,
  },
  {
    name: "Promos",
    to: { name: "promotions" },
    activeOn: ["promotions"],
    icon: "promotions",
    img: promosIcon,
  },
  { name: "More", to: null, activeOn: [], icon: "more" },
];

function isActive(cat) {
  const catCategory = cat.to?.query?.category;

  // Pills targeting a specific casino category (Crash, Virtuals) are active
  // only when that exact category query is present.
  if (catCategory) {
    return route.name === "casino-home" && route.query.category === catCategory;
  }

  // The plain "Casino" pill must not light up while a specific category
  // (e.g. crash, virtuals) is selected on the casino-home page.
  if (
    cat.to?.name === "casino-home" &&
    route.name === "casino-home" &&
    route.query.category &&
    route.query.category !== "all"
  ) {
    return false;
  }

  return cat.activeOn.includes(route.name);
}

function handleClick(cat) {
  if (cat.icon === "more") {
    openModal(sportsIconsModal);
    return;
  }
  router.push(cat.to);
}
</script>

<template>
  <div
    :class="isSticky ? 'sticky top-14 z-50' : ''"
    class="px-0 md:px-0"
  >
    <div
      class=" max-w-[1280px] dark:bg-background mx-auto bg-gray-100 dark:bg-card grid grid-cols-7 category-grid"
    >
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="flex flex-col items-center gap-0 py-1.5 md:gap-1 md:py-3 transition-colors"
        :class="isActive(cat) ? 'bg-brand-bright/15' : ''"
        @click="handleClick(cat)"
      >
        <!-- Asset icon -->
        <div v-if="cat.img" class="relative">
          <img
            :src="cat.img"
            :alt="cat.name"
            class="w-7 h-7 md:w-8 md:h-8 object-contain"
            :class="isActive(cat) ? '' : 'opacity-80'"
          />
          <span
            v-if="cat.icon === 'live'"
            class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500"
          ></span>
        </div>

        <!-- Crash (rocket) -->
        <svg
          v-else-if="cat.icon === 'crash'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 md:w-8 md:h-8 text-primary"
        >
          <path
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
          />
          <path
            fill="#ffb801"
            d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"
          />
        </svg>

        <!-- More -->
        <svg
          v-else-if="cat.icon === 'more'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 md:w-8 md:h-8 text-gray-500 dark:text-white/70"
        >
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Label -->
        <span
          class="text-[0.6rem] font-semibold whitespace-nowrap"
          :class="
            isActive(cat)
              ? 'text-brand-bright'
              : 'text-gray-500 dark:text-white/70'
          "
        >
          {{ cat.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
[data-theme="light"] .category-grid {
  border: 1px solid oklch(0% 0 0 / 0.06);
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.04), 0 2px 8px oklch(0% 0 0 / 0.02);
}
</style>
