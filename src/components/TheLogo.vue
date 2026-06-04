<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useRoute, useRouter } from "vue-router";

const { initDefaultSport } = useDefaultSport();
const router = useRouter();
const route = useRoute();

function shouldFetch() {
  return route.name == "home";
}

const goHome = () => {
  initDefaultSport(shouldFetch());
  router.push({ name: "home" });
};
</script>
<template>
  <div
    class="cursor-pointer flex items-center select-none"
    role="button"
    aria-label="Return to home page"
    tabindex="0"
    @click="goHome"
  >
    <img
      src="/logo-7bet-v2.png"
      alt="7bet"
      class="h-14 sm:h-17 w-auto object-contain"
    />
  </div>
</template>
