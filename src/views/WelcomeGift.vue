<script setup>
import FreebetButton from "@/components/freebet/FreebetButton.vue";
import HeaderLinks from "@/components/HeaderLinks.vue";
import { useFormatDates } from "@/composables/useFormatDates";
import { useCasinoStore } from "@/stores/casino";
import { useFreebetStore } from "@/stores/freebet";
import { CheckCircleIcon, PlayIcon } from "@heroicons/vue/20/solid";
import { ArrowRightIcon, GiftIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { humanFriendlyDate } = useFormatDates();

// Freebet store
const freebetStore = useFreebetStore();
const { fetchFreebet, clearFreebet, createSportsbookFreebet, createCrashFreebet } = freebetStore;
const { freebet, pending, betslip, totalOdds, createPending, createError, createSuccess } =
  storeToRefs(freebetStore);

const possibleWin = computed(() => {
  if (!totalOdds.value) return 0;
  const win = freebetStore.stake * totalOdds.value - freebetStore.stake;
  return Math.round((Math.max(0, win) + Number.EPSILON) * 100) / 100;
});

// Casino store for aviator
const { setLaunchGameId, setLaunchGameMeta } = useCasinoStore();

// State
const aviatorFreebetsRemaining = ref(2);
const showAviatorModal = ref(false);
const crashSuccess = ref(false);
const crashPending = ref(false);
const crashError = ref(null);

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

// Fetch freebet data
fetchFreebet();

function launchAviatorModal() {
  showAviatorModal.value = true;
  setLaunchGameId(import.meta.env.VITE_AVIATOR_GAME_ID);
  setLaunchGameMeta("Aviator", "Spribe");
}

function closeAviatorModal() {
  showAviatorModal.value = false;
}

async function placeBet() {
  if (!betslip.value) return;
  await createSportsbookFreebet();
}

async function claimAviatorFreebet() {
  crashPending.value = true;
  crashError.value = null;
  await createCrashFreebet();
  crashPending.value = false;

  if (createError.value) {
    crashError.value = createError.value;
    return;
  }

  crashSuccess.value = true;
  launchAviatorModal();
}

function proceedToApp() {
  router.push({ name: "home" });
}

onBeforeUnmount(() => {
  clearFreebet();
});
</script>

<template>
  <HeaderLinks />
  <div class="welcome-page">
    <div class="welcome-container">
      <!-- Page heading -->
      <div class="page-heading">
        <h1 class="page-title">Choose Your Welcome Gift</h1>
        <p class="page-desc">Pick one reward to get started</p>
      </div>

      <!-- Cards -->
      <div class="cards-row">
        <!-- ═══ FREEBET CARD ═══ -->
        <div class="card">
          <!-- Header -->
          <div class="card-header card-header--green">
            <div class="card-header-icon">
              <SecondaryNavIcons icon="soccer" icon-css="w-7 h-7" />
            </div>
            <span class="card-tag">Soccer</span>
            <div class="card-heading">
              <span class="card-heading-kes">KES</span>
              <span class="card-heading-amount">20</span>
              <span class="card-heading-label">Free Bet</span>
            </div>
          </div>

          <!-- Body -->
          <div class="card-body">
            <AnimatePulse v-if="pending" :rows="1" />
            <template v-if="freebet">
              <div class="match-strip">
                <div class="match-team">
                  <span class="match-initial">{{
                    freebet.homeTeam?.charAt(0)
                  }}</span>
                  <span class="match-name">{{ freebet.homeTeam }}</span>
                </div>
                <div class="match-center">
                  <span class="match-vs">vs</span>
                  <span class="match-date">{{
                    humanFriendlyDate(freebet.startTime)
                  }}</span>
                </div>
                <div class="match-team">
                  <span class="match-initial">{{
                    freebet.awayTeam?.charAt(0)
                  }}</span>
                  <span class="match-name">{{ freebet.awayTeam }}</span>
                </div>
              </div>

              <div class="odds-row">
                <FreebetButton
                  v-for="outcome in freebet.markets[0].matchOutcomes"
                  :key="outcome.id"
                  :outcome="outcome"
                  :season-id="freebet.homeTeam"
                  :home-team="freebet.homeTeam"
                  :sport-id="freebet.sportId"
                  :custom-id="
                    formCustomId(
                      freebet.parentMatchId,
                      outcome.marketId,
                      outcome.outcomeName,
                      outcome.outcomeId
                    )
                  "
                  :away-team="freebet.awayTeam"
                  :start-time="freebet.startTime"
                  :competition-id="freebet.competitionId"
                  :sub-type-id="parseInt(outcome.marketId)"
                  :competition-name="freebet.competitionName"
                  :country-name="freebet.countryName"
                  :sport-name="freebet.sportName"
                  :parent-match-id="freebet.parentMatchId"
                />
              </div>

              <!-- Payout summary -->
              <div v-if="betslip" class="payout">
                <div class="payout-item">
                  <span class="payout-label">Stake</span>
                  <span class="payout-value">KES {{ welcomeStake }}</span>
                </div>
                <div class="payout-dot" />
                <div class="payout-item">
                  <span class="payout-label">Win</span>
                  <span class="payout-value payout-value--win"
                    >KES {{ possibleWin }}</span
                  >
                </div>
              </div>
            </template>
          </div>

          <!-- Footer -->
          <div class="card-footer">
            <div v-if="createError" class="bet-error">{{ createError }}</div>
            <template v-if="!createSuccess">
              <button
                :disabled="!betslip || createPending"
                class="card-btn card-btn--green"
                :class="{ 'card-btn--disabled': !betslip || createPending }"
                @click="placeBet"
              >
                <span v-if="createPending">Placing bet...</span>
                <span v-else>{{
                  betslip ? "Place Free Bet" : "Select an outcome"
                }}</span>
              </button>
            </template>
            <div v-else class="bet-success">
              <CheckCircleIcon class="bet-success-icon" />
              <span>Free bet placed!</span>
            </div>
          </div>
        </div>

        <!-- ═══ OR ═══ -->
        <div class="or-separator">
          <div class="or-line" />
          <span class="or-badge">OR</span>
          <div class="or-line" />
        </div>

        <!-- ═══ AVIATOR CARD ═══ -->
        <div class="card">
          <!-- Header -->
          <div class="card-header card-header--red">
            <div class="aviator-logo">
              <img src="/aviator3.png" alt="Aviator" class="h-7 w-auto" />
            </div>
            <span class="card-tag">Aviator</span>
            <div class="card-heading">
              <span class="card-heading-kes">KES</span>
              <span class="card-heading-amount">20</span>
              <span class="card-heading-label">Free Bet</span>
            </div>
          </div>

          <!-- Body -->
          <div class="card-body">
            
            <ul class="perks">
              <li class="perk">
                <CheckCircleIcon class="perk-icon" />
                No deposit needed
              </li>
              <li class="perk">
                <CheckCircleIcon class="perk-icon" />
                Keep your winnings
              </li>
              <li class="perk">
                <CheckCircleIcon class="perk-icon" />
                Cash out anytime
              </li>
            </ul>
          </div>

          <!-- Footer -->
          <div class="card-footer">
            <div v-if="crashError" class="bet-error">{{ crashError }}</div>
            <template v-if="!crashSuccess">
              <button
                class="card-btn card-btn--red"
                :class="{ 'card-btn--disabled': crashPending }"
                :disabled="crashPending"
                @click="claimAviatorFreebet"
              >
                <PlayIcon class="card-btn-icon" />
                <span v-if="crashPending">Claiming...</span>
                <span v-else>Play Aviator Now</span>
              </button>
            </template>
            <div v-else class="bet-success">
              <CheckCircleIcon class="bet-success-icon" />
              <span>Aviator free bets claimed!</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Proceed -->
      <button class="proceed-btn" @click="proceedToApp">
        Proceed to 7bet
        <ArrowRightIcon class="proceed-icon" />
      </button>
    </div>

    <!-- ═══ AVIATOR MODAL ═══ -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showAviatorModal"
          class="aviator-overlay"
          @click.self="closeAviatorModal"
        >
          <div class="aviator-modal">
            <div class="aviator-modal-bar">
              <div class="aviator-modal-title">
                <span>Aviator</span>
                <span class="aviator-modal-provider">Spribe</span>
              </div>
              <div class="aviator-modal-remaining">
                <GiftIcon class="w-4 h-4" />
                {{ aviatorFreebetsRemaining }} free bets remaining
              </div>
              <button class="aviator-modal-close" @click="closeAviatorModal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                  />
                </svg>
              </button>
            </div>
            <div class="aviator-modal-body">
              <CasinoEmbedd />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <MobileFooterV2 />
  <Footer />
</template>

<style scoped>
/* ═══════════════════════════════════
   WELCOME GIFT — Clean, structured
   ═══════════════════════════════════ */

.welcome-page {
  background: oklch(97.5% 0.003 250);
  min-height: calc(100dvh - 56px);
}

.welcome-container {
  max-width: 840px;
  margin: 0 auto;
  padding: 24px 16px 28px;
}

/* ── Page Heading ── */
.page-heading {
  text-align: center;
  margin-bottom: 20px;
}
.page-heading-icon {
  width: 32px;
  height: 32px;
  color: oklch(55% 0.15 142);
  margin: 0 auto 8px;
}
.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: oklch(18% 0.02 258);
  letter-spacing: -0.015em;
}
.page-desc {
  font-size: 0.8125rem;
  color: oklch(50% 0.02 258);
  margin-top: 2px;
}

/* ── Cards Row ── */
.cards-row {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 20px;
}
@media (min-width: 640px) {
  .cards-row {
    flex-direction: row;
    align-items: stretch;
    gap: 0;
  }
}

/* ── Card ── */
.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: white;
  border: 1px solid oklch(90% 0.008 250);
  overflow: hidden;
}

/* Card Header */
.card-header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.card-header--green {
  background: oklch(96% 0.015 145);
}
.card-header--red {
  background: oklch(96% 0.015 28);
}
.card-header-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: oklch(40% 0.02 258);
}
.aviator-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.card-tag {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: oklch(45% 0.02 258);
}
.card-heading {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-left: auto;
}
.card-heading-kes {
  font-size: 0.75rem;
  font-weight: 600;
  color: oklch(45% 0.02 258);
}
.card-heading-amount {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}
.card-header--green .card-heading-amount {
  color: oklch(42% 0.14 145);
}
.card-header--red .card-heading-amount {
  color: oklch(48% 0.18 25);
}
.card-heading-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: oklch(40% 0.02 258);
}

/* Card Body */
.card-body {
  flex: 1;
  padding: 12px 14px;
}

/* Card Footer */
.card-footer {
  padding: 0 14px 14px;
}

/* ── Match Strip ── */
.match-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  gap: 8px;
}
.match-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.match-initial {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: oklch(92% 0.02 145);
  color: oklch(38% 0.12 145);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8125rem;
}
.match-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: oklch(25% 0.02 258);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.match-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}
.match-vs {
  font-size: 0.6875rem;
  font-weight: 700;
  color: oklch(55% 0.01 258);
  text-transform: uppercase;
}
.match-date {
  font-size: 0.625rem;
  color: oklch(55% 0.01 258);
  white-space: nowrap;
}

/* ── Odds ── */
.odds-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

/* ── Payout ── */
.payout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid oklch(92% 0.005 250);
}
.payout-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.payout-label {
  font-size: 0.6875rem;
  color: oklch(50% 0.02 258);
}
.payout-value {
  font-size: 0.8125rem;
  font-weight: 700;
  color: oklch(25% 0.02 258);
}
.payout-value--win {
  color: oklch(42% 0.14 145);
}
.payout-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: oklch(75% 0.01 258);
}

/* ── Card Buttons ── */
.card-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}
.card-btn:hover {
  opacity: 0.92;
}
.card-btn--green {
  background: oklch(48% 0.14 145);
}
.card-btn--red {
  background: oklch(52% 0.18 25);
}
.card-btn--disabled {
  background: oklch(82% 0.005 258);
  color: oklch(55% 0.01 258);
  cursor: default;
}
.card-btn--disabled:hover {
  opacity: 1;
}
.card-btn-icon {
  width: 16px;
  height: 16px;
}
.card-btn-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.2);
}

/* ── Bet status ── */
.bet-error {
  font-size: 0.75rem;
  color: oklch(50% 0.18 25);
  text-align: center;
  padding: 6px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: oklch(95% 0.02 25);
}
.bet-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  background: oklch(95% 0.02 145);
  color: oklch(38% 0.12 145);
  font-size: 0.8125rem;
  font-weight: 600;
}
.bet-success-icon {
  width: 16px;
  height: 16px;
}

/* ── OR Separator ── */
.or-separator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}
.or-line {
  flex: 1;
  height: 1px;
  background: oklch(88% 0.005 250);
}
.or-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: oklch(45% 0.02 258);
  letter-spacing: 0.1em;
  padding: 4px 16px;
  border-radius: 99px;
  background: oklch(94% 0.005 250);
  border: 1px solid oklch(88% 0.005 250);
}
@media (min-width: 640px) {
  .or-separator {
    flex-direction: column;
    padding: 0 16px;
  }
  .or-line {
    width: 1px;
    height: auto;
    flex: 1;
    background: oklch(88% 0.005 250);
  }
}

/* ── Aviator Visual ── */
.aviator-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: oklch(97% 0.008 28);
  border-radius: 10px;
  margin-bottom: 12px;
}
.aviator-svg {
  width: 40px;
  height: 40px;
  color: oklch(52% 0.18 25);
  animation: float 3s ease-in-out infinite;
}
.aviator-multiplier {
  display: flex;
  align-items: baseline;
}
.multiplier-num {
  font-size: 1.75rem;
  font-weight: 800;
  color: oklch(48% 0.18 25);
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.multiplier-x {
  font-size: 1rem;
  font-weight: 700;
  color: oklch(55% 0.12 25);
}

/* ── Perks ── */
.perks {
  list-style: none;
  padding: 0;
  margin: 0 0 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.perk {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: oklch(38% 0.02 258);
  font-weight: 500;
}
.perk-icon {
  width: 14px;
  height: 14px;
  color: oklch(50% 0.15 145);
  flex-shrink: 0;
}

/* ── Proceed ── */
.proceed-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid oklch(88% 0.005 250);
  background: white;
  color: oklch(35% 0.02 258);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.proceed-btn:hover {
  background: oklch(96% 0.003 250);
}
.proceed-icon {
  width: 16px;
  height: 16px;
}

/* ═══ Aviator Modal ═══ */
.aviator-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: oklch(0% 0 0 / 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.aviator-modal {
  width: 100%;
  height: 100dvh;
  background: oklch(97% 0.003 250);
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.aviator-modal-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid oklch(90% 0.005 250);
}
.aviator-modal-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: oklch(18% 0.02 258);
}
.aviator-modal-remaining {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 99px;
  background: oklch(60% 0.2 25 / 0.08);
  border: 1px solid oklch(60% 0.2 25 / 0.15);
  font-size: 0.75rem;
  font-weight: 600;
  color: oklch(48% 0.16 25);
}
.aviator-modal-provider {
  font-size: 0.6875rem;
  font-weight: 500;
  color: oklch(55% 0.01 258);
}
.aviator-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid oklch(90% 0.005 250);
  background: oklch(96% 0.003 250);
  color: oklch(40% 0.02 258);
  cursor: pointer;
  margin-left: 8px;
}
.aviator-modal-close:hover {
  background: oklch(92% 0.005 250);
  color: oklch(20% 0.02 258);
}
.aviator-modal-body {
  flex: 1;
  min-height: 0;
}

/* Transitions */
.modal-enter-active {
  transition: all 0.25s ease;
}
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .aviator-modal {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
.modal-leave-to .aviator-modal {
  transform: scale(0.96);
  opacity: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-4deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
}

/* ═══════════════════
   DARK MODE
   ═══════════════════ */

[data-theme="dark"] .welcome-page {
  background: oklch(14% 0.03 258);
}

[data-theme="dark"] .page-heading-icon {
  color: oklch(65% 0.16 145);
}
[data-theme="dark"] .page-title {
  color: oklch(94% 0.005 250);
}
[data-theme="dark"] .page-desc {
  color: oklch(58% 0.01 258);
}

[data-theme="dark"] .card {
  background: oklch(19% 0.03 258);
  border-color: oklch(26% 0.03 258);
}
[data-theme="dark"] .card-header--green {
  background: oklch(20% 0.04 145);
}
[data-theme="dark"] .card-header--red {
  background: oklch(20% 0.04 25);
}
[data-theme="dark"] .card-header-icon {
  color: oklch(75% 0.01 258);
}
[data-theme="dark"] .card-tag {
  color: oklch(62% 0.01 258);
}
[data-theme="dark"] .card-heading-kes {
  color: oklch(62% 0.01 258);
}
[data-theme="dark"] .card-heading-label {
  color: oklch(62% 0.01 258);
}
[data-theme="dark"] .card-header--green .card-heading-amount {
  color: oklch(65% 0.16 145);
}
[data-theme="dark"] .card-header--red .card-heading-amount {
  color: oklch(62% 0.18 25);
}

[data-theme="dark"] .match-initial {
  background: oklch(25% 0.04 145);
  color: oklch(68% 0.14 145);
}
[data-theme="dark"] .match-name {
  color: oklch(85% 0.005 258);
}
[data-theme="dark"] .match-vs {
  color: oklch(50% 0.01 258);
}
[data-theme="dark"] .match-date {
  color: oklch(48% 0.01 258);
}

[data-theme="dark"] .payout {
  border-top-color: oklch(24% 0.03 258);
}
[data-theme="dark"] .payout-label {
  color: oklch(55% 0.01 258);
}
[data-theme="dark"] .payout-value {
  color: oklch(85% 0.005 258);
}
[data-theme="dark"] .payout-value--win {
  color: oklch(65% 0.16 145);
}
[data-theme="dark"] .payout-dot {
  background: oklch(35% 0.02 258);
}

[data-theme="dark"] .card-btn--green {
  background: oklch(45% 0.14 145);
}
[data-theme="dark"] .card-btn--red {
  background: oklch(48% 0.18 25);
}
[data-theme="dark"] .card-btn--disabled {
  background: oklch(24% 0.03 258);
  color: oklch(48% 0.01 258);
}

[data-theme="dark"] .bet-error {
  background: oklch(22% 0.04 25);
  color: oklch(65% 0.16 25);
}
[data-theme="dark"] .bet-success {
  background: oklch(22% 0.04 145);
  color: oklch(68% 0.14 145);
}

[data-theme="dark"] .or-line {
  background: oklch(26% 0.02 258);
}
[data-theme="dark"] .or-badge {
  color: oklch(72% 0.005 258);
  background: oklch(22% 0.03 258);
  border-color: oklch(30% 0.03 258);
}

[data-theme="dark"] .aviator-visual {
  background: oklch(18% 0.04 25);
}
[data-theme="dark"] .aviator-svg {
  color: oklch(60% 0.18 25);
}
[data-theme="dark"] .multiplier-num {
  color: oklch(62% 0.18 25);
}
[data-theme="dark"] .multiplier-x {
  color: oklch(52% 0.12 25);
}

[data-theme="dark"] .perk {
  color: oklch(62% 0.005 258);
}
[data-theme="dark"] .perk-icon {
  color: oklch(58% 0.14 145);
}

[data-theme="dark"] .proceed-btn {
  background: oklch(20% 0.03 258);
  border-color: oklch(28% 0.03 258);
  color: oklch(72% 0.005 258);
}
[data-theme="dark"] .proceed-btn:hover {
  background: oklch(23% 0.03 258);
}

[data-theme="dark"] .aviator-modal {
  background: oklch(12% 0.04 258);
}
[data-theme="dark"] .aviator-modal-bar {
  background: oklch(16% 0.04 258);
  border-bottom-color: oklch(22% 0.03 258);
}
[data-theme="dark"] .aviator-modal-title {
  color: white;
}
[data-theme="dark"] .aviator-modal-remaining {
  background: oklch(60% 0.2 25 / 0.12);
  border-color: oklch(60% 0.2 25 / 0.2);
  color: oklch(72% 0.14 25);
}
[data-theme="dark"] .aviator-modal-provider {
  color: oklch(55% 0.01 258);
}
[data-theme="dark"] .aviator-modal-close {
  background: oklch(22% 0.04 258);
  border-color: oklch(22% 0.04 258);
  color: oklch(70% 0.02 258);
}
[data-theme="dark"] .aviator-modal-close:hover {
  background: oklch(28% 0.04 258);
  color: white;
}

/* ── Responsive ── */
@media (max-width: 639px) {
  .welcome-container {
    padding: 16px 12px 20px;
  }
  .page-heading {
    margin-bottom: 16px;
  }
}
</style>
