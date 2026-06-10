<script setup>
import { computed } from "vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useSupport } from "@/composables/useSupport";
import { useRoute, useRouter } from "vue-router";

import SearchSvg from "@/components/icons/svgs/Search.vue";
import SupportSvg from "@/components/icons/svgs/Support.vue";

import casinoIcon from "@/assets/icons/casino.svg";
import liveIcon from "@/assets/icons/live.svg";
import promosIcon from "@/assets/icons/promos.svg";
import sportsIcon from "@/assets/icons/sports.svg";
import virtualsIcon from "@/assets/icons/virtuals.svg";

const props = defineProps({
  // Whether the pills bar sticks to the top (disable when another sticky
  // section sits below it, e.g. the live page hero).
  isSticky: { type: Boolean, default: true },
  // Compact horizontal variant hosted inside the desktop header row.
  inHeader: { type: Boolean, default: false },
  // Round the pills bar corners (standalone card look, e.g. casino home).
  rounded: { type: Boolean, default: false },
});

// Icon sizing: smaller in the header so the pills fit the h-14 row.
const iconCls = computed(() =>
  props.inHeader ? "w-6 h-6" : "w-7 h-7 md:w-8 md:h-8",
);

const router = useRouter();
const route = useRoute();
const { sportsIconsModal, search } = useModalTypes();
const { openModal } = useModalStore();
const { openSupportModal } = useSupport();

const openSearchModal = () => openModal(search);

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
  // Desktop-only pills (moved here from the header)
  { name: "Support", to: null, activeOn: [], icon: "support", desktopOnly: true },
  { name: "Search", to: null, activeOn: [], icon: "search", desktopOnly: true },
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
  if (cat.icon === "support") {
    openSupportModal();
    return;
  }
  if (cat.icon === "search") {
    openSearchModal();
    return;
  }
  router.push(cat.to);
}
</script>

<template>
  <div :class="!inHeader && isSticky ? 'sticky top-14 sm:top-17 z-50' : ''">
    <div
      :class="[
        inHeader
          ? 'flex items-center gap-3'
          : 'max-w-[1280px] dark:bg-background mx-auto bg-gray-100 dark:bg-card grid grid-cols-7 lg:grid-cols-9 category-grid',
        !inHeader && rounded ? 'rounded-xl overflow-hidden' : '',
      ]"
    >
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="flex-col items-center transition-colors"
        :class="[
          cat.desktopOnly ? 'hidden lg:flex' : 'flex',
          inHeader
            ? 'gap-0.5 px-3 py-1 rounded-md'
            : 'gap-0 py-1.5 md:gap-1 md:py-3',
          isActive(cat)
            ? inHeader
              ? 'bg-brand-bright/30'
              : 'bg-brand-bright/15'
            : inHeader
              ? 'bg-gray-100 dark:bg-white/5 hover:bg-brand-bright/10'
              : '',
        ]"
        @click="handleClick(cat)"
      >
        <!-- Asset icon -->
        <div v-if="cat.img" class="relative">
          <img
            :src="cat.img"
            :alt="cat.name"
            class="object-contain"
            :class="[iconCls, isActive(cat) ? '' : 'opacity-80']"
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
          class="text-primary"
          :class="inHeader ? 'w-6 h-6' : 'w-5 h-5 md:w-8 md:h-8'"
        >
          <path
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
          />
          <path
            fill="#ffb801"
            d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"
          />
        </svg>

        <!-- Support (desktop only, moved from header) -->
        <SupportSvg
          v-else-if="cat.icon === 'support'"
          class="object-contain"
          :class="iconCls"
        />

        <!-- Search (desktop only, moved from header) -->
        <SearchSvg
          v-else-if="cat.icon === 'search'"
          class="object-contain"
          :class="iconCls"
        />

        <!-- More -->
        <svg
          v-else-if="cat.icon === 'more'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-gray-500 dark:text-white/70"
          :class="inHeader ? 'w-6 h-6' : 'w-5 h-5 md:w-8 md:h-8'"
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
