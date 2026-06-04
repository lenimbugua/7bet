<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import casinoIcon from "@/assets/icons/casino.svg";
import liveIcon from "@/assets/icons/live.svg";
import sportsIcon from "@/assets/icons/sports.svg";
import virtualsIcon from "@/assets/icons/virtuals.svg";
import promosIcon from "@/assets/icons/promos.svg";
import userIcon from "@/assets/icons/user.svg";

const route = useRoute();
const router = useRouter();
const { initDefaultSport } = useDefaultSport();
const { msisdn, token } = storeToRefs(useLoginStore());

const items = [
  { key: "casino", label: "Casino", icon: casinoIcon },
  { key: "virtuals", label: "Virtuals", icon: virtualsIcon },
  { key: "sports", label: "Sports", icon: sportsIcon },
  { key: "live", label: "Live", icon: liveIcon },
  { key: "promos", label: "Promos", icon: promosIcon },
  { key: "profile", label: "Profile", icon: userIcon },
];

const activeKey = computed(() => {
  if (route.name === "casino-home" || route.name === "home") {
    return route.query.category === "virtuals" ? "virtuals" : "casino";
  }
  if (route.name === "sports") return "sports";
  if (route.name === "live") return "live";
  if (route.name === "promotions") return "promos";
  if (route.name === "profile") return "profile";
  return "";
});

function goTo(key) {
  switch (key) {
    case "casino":
      router.push({ name: "casino-home", query: { category: "all" } });
      break;
    case "virtuals":
      router.push({ name: "casino-home", query: { category: "virtuals" } });
      break;
    case "sports":
      initDefaultSport(true);
      router.push({ name: "sports", params: { sport: "soccer" } });
      break;
    case "live":
      router.push({ name: "live", params: { sport: "soccer" } });
      break;
    case "promos":
      router.push({ name: "promotions" });
      break;
    case "profile":
      if (!token.value && !msisdn.value) {
        router.push({ name: "login" });
        return;
      }
      router.push({ name: "profile" });
      break;
  }
}
</script>

<template>
  <div
    class="block xl:hidden z-50 fixed w-full bottom-0 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-t border-gray-200/60 dark:border-white/8"
  >
    <div
      class="grid grid-cols-6 items-end pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]"
    >
      <button
        v-for="item in items"
        :key="item.key"
        :aria-label="`Go to ${item.label}`"
        class="flex flex-col items-center gap-0.5 pt-1"
        @click="goTo(item.key)"
      >
        <img
          :src="item.icon"
          :alt="item.label"
          class="w-7 h-7 object-contain transition-transform duration-150"
          :class="activeKey === item.key ? 'scale-110' : 'opacity-90'"
        />
        <span
          class="text-[0.6rem] font-semibold leading-tight transition-colors"
          :class="
            activeKey === item.key
              ? 'text-brand-bright'
              : 'text-gray-500 dark:text-gray-400'
          "
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>
