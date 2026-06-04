<script setup>
import { usePromoStore } from "@/stores/promos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { usePromos } from "../composables/usePromos";
import { useCasinoStore } from "../stores/casino";

import { useDefaultSport } from "@/composables/useDefaultSport";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/20/solid";
import formatStuff from "../utilities/format-stuff";

const { formCloudflareImage } = formatStuff();

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const { selectPromo } = usePromoStore();

const {
  promos,
  hakiLeaguePromo,
  cashbackPromo,
  bethubPromo,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  dailyAviatorCashback,
  aviatorKaribuBonus,
  jengaBetsPromo,
  sambazaZaKrisiiPromo,
  tanoSupuuPromo,
  pariLeaguePromo,
} = usePromos();

const { pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchCasino(gameId, gameName) {
  if (gameName === "invite-aviator" || gameName === "invite-friends") {
    router.push({ name: "aviator", query: { invite: "1" } });
    return;
  }
  if (gameName === sambazaZaKrisiiPromo) {
    router.push({ name: "share-happiness" });
    return;
  }
  if (gameName == hakiLeaguePromo || gameName == pariLeaguePromo) {
    router.push({ name: "pari-league" });
    return;
  }
  if (gameName == cashbackPromo) {
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
  if (gameName == jengaBetsPromo) {
    goToSports();
    return;
  }

  if (gameName == dailyAviatorCashback) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorWelcomeBonus) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorKaribuBonus) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == tanoSupuuPromo) {
    router.push({ name: "home" });
    return;
  }
  setLaunchGameId(gameId);
  router.push({ name: "aviator" });
}

function goToPromoDetails(promo) {
  const normalized = {
    ...promo,
    image_url: promo.image_url || formCloudflareImage(promo.img),
    description: promo.description || promo.samary,
    app_route_name: promo.app_route_name || promo.routeName,
    call_to_action_name: promo.call_to_action_name || "Claim Now",
    game_id: promo.game_id || { Valid: false },
  };
  selectPromo(normalized);
  router.push({ name: "promotion-details", params: { name: promo.name } });
}
</script>
<template>
  <div class="promo-page">
    <!-- Header bar -->
    <div class="promo-topbar">
      <button aria-label="Go back" class="back-btn" @click="$router.go(-1)">
        <ArrowLeftIcon class="w-5 h-5" />
      </button>
      <h1 class="promo-page-title">Promotions</h1>
      <div class="w-5"></div>
    </div>

    <BetsLoader v-if="pending" />

    <div v-else class="promo-grid">
      <div v-for="promo in promos" :key="promo.title" class="promo-card">
        <!-- Image -->
        <div class="promo-card-img" @click="launchCasino(promo.id, promo.name)">
          <img
            :src="formCloudflareImage(promo.img)"
            :alt="promo.name || 'Promotion'"
            loading="lazy"
          />
        </div>

        <!-- Content -->
        <div class="promo-card-content">
          <h2 class="promo-card-title">{{ promo.title }}</h2>
          <p class="promo-card-summary">{{ promo.samary }}</p>
        </div>

        <!-- Actions -->
        <div class="promo-card-actions">
          <button
            class="promo-btn promo-btn--primary"
            @click="launchCasino(promo.id, promo.name)"
          >
            Claim Now
          </button>
          <button
            v-if="
              promo.name != 'aviatrix' &&
              promo.name != 'bethub' 
            "
            class="promo-btn promo-btn--secondary"
            @click="goToPromoDetails(promo)"
          >
            Details
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.promo-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 16px 32px;
}

/* ── Top bar ── */
.promo-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid oklch(90% 0.005 250);
  background: white;
  color: oklch(30% 0.02 258);
  cursor: pointer;
  transition: background 0.15s;
}
.back-btn:hover {
  background: oklch(96% 0.003 250);
}
.promo-page-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: oklch(15% 0.02 258);
  letter-spacing: -0.01em;
}

/* ── Grid ── */
.promo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px) {
  .promo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .promo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Card ── */
.promo-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: white;
  border: 1px solid oklch(92% 0.005 250);
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.promo-card:hover {
  border-color: oklch(85% 0.01 250);
  box-shadow: 0 4px 20px oklch(0% 0 0 / 0.06);
}

/* Card image */
.promo-card-img {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.promo-card-img img {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.promo-card:hover .promo-card-img img {
  transform: scale(1.03);
}

/* Card content */
.promo-card-content {
  flex: 1;
  padding: 14px 16px 8px;
}
.promo-card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: oklch(18% 0.02 258);
  letter-spacing: -0.01em;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.promo-card-summary {
  font-size: 0.75rem;
  color: oklch(48% 0.02 258);
  line-height: 1.5;
  margin-top: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card actions */
.promo-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 14px;
}
.promo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}
.promo-btn:hover {
  opacity: 0.88;
}
.promo-btn--primary {
  background: oklch(48% 0.14 145);
  color: white;
  flex: 1;
}
.promo-btn--secondary {
  background: transparent;
  color: oklch(40% 0.02 258);
  border: 1px solid oklch(88% 0.005 250);
  padding: 8px 12px;
}

/* ═══ Dark Mode ═══ */
[data-theme="dark"] .back-btn {
  background: oklch(20% 0.03 258);
  border-color: oklch(28% 0.03 258);
  color: oklch(75% 0.005 258);
}
[data-theme="dark"] .back-btn:hover {
  background: oklch(24% 0.03 258);
}
[data-theme="dark"] .promo-page-title {
  color: oklch(92% 0.005 258);
}

[data-theme="dark"] .promo-card {
  background: oklch(18% 0.03 258);
  border-color: oklch(25% 0.03 258);
}
[data-theme="dark"] .promo-card:hover {
  border-color: oklch(32% 0.03 258);
  box-shadow: 0 4px 20px oklch(0% 0 0 / 0.3);
}

[data-theme="dark"] .promo-card-title {
  color: oklch(92% 0.005 258);
}
[data-theme="dark"] .promo-card-summary {
  color: oklch(55% 0.01 258);
}

[data-theme="dark"] .promo-btn--primary {
  background: oklch(45% 0.14 145);
}
[data-theme="dark"] .promo-btn--secondary {
  color: oklch(68% 0.005 258);
  border-color: oklch(28% 0.03 258);
}
</style>
