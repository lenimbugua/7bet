<script setup>
// import {
//   CurrencyDollarIcon,
//   TrophyIcon,
//   UsersIcon,
// } from "@heroicons/vue/24/outline";
// import FeatureCard from "./FeatureCard.vue";
import PromoCard from "./PromoCard.vue";

// import { usePromoStore } from "@/stores/promos";
// import { storeToRefs } from "pinia";
import { usePromos } from "@/composables/usePromos";
import { useCasinoStore } from "@/stores/casino";
import { useRouter } from "vue-router";

import { useDefaultSport } from "@/composables/useDefaultSport";

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const {
  welcomePromos,
  hakiLeaguePromo,
  cashbackPromo,
  bethubPromo,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  dailyAviatorCashback,
  aviatorKaribuBonus,
} = usePromos();

// const { pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchCasino(gameId, gameName) {
  if (gameName == hakiLeaguePromo) {
    router.push({ name: "pari-league" });
    return;
  }
  if (gameName == cashbackPromo) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == aviatorKaribuBonus) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == bethubPromo) {
    router.push({ name: "share-bets" });
    return;
  }

  if (gameName == multibetBoostPromo) {
    goToSports();
    return;
  }
  if (gameName == twoUpPromo) {
    goToSports();
    return;
  }
  if (gameName == oneCutPromo) {
    goToSports();
    return;
  }

  if (gameName == dailyAviatorCashback) {
    router.push({ name: "games", params: { name: "aviator" } });
    return;
  }
  if (gameName == aviatorWelcomeBonus) {
    router.push({ name: "games", params: { name: "aviator" } });
    return;
  }
  setLaunchGameId(gameId);
  router.push({ name: "games", params: { name: gameName } });
}
</script>
<template>
  <div class="grid md:grid-cols-3 gap-3 md:gap-8">
    <PromoCard
      v-for="promo in welcomePromos"
      :key="promo.id"
      :promo="promo"
      role="button"
      tabindex="0"
      :aria-label="'View promotion: ' + promo.title"
      class="cursor-pointer"
      @click="launchCasino(promo.id, promo.name)"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-gift w-8 h-8 text-yellow-300"
        >
          <rect x="3" y="8" width="18" height="4" rx="1"></rect>
          <path d="M12 8v13"></path>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
          <path
            d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
          ></path>
        </svg>
      </template>
    </PromoCard>
  </div>
</template>
