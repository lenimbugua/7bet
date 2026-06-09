<script setup>
import ShareToSocials from "@/components/community-bets/ShareToSocials.vue";
import { useAviatorReferralStore } from "@/stores/aviator-referral";
import { useLoginStore } from "@/stores/login";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import {
  ArrowPathIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showInvitePopover = ref(false);
const loading = ref(false);

const { isAuthenticated } = storeToRefs(useLoginStore());
const { openLoginModal } = useLoginStore();

const affiliateStore = useAviatorReferralStore();
const { referralCode: promoCode, referralDetails } = storeToRefs(affiliateStore);
const { fetchReferralCode, fetchReferralDetails, redeemBonus } = affiliateStore;
const { redeemPending } = storeToRefs(affiliateStore);

const affiliateText = "Your friend invited you to play Aviator on 7bet!\nSign up, deposit, and get 5 Free Bets instantly.\nPlay Now";

const referralUrl = computed(() =>
  promoCode.value
    ? `${window.location.origin}/freebet?referralCode=${promoCode.value}`
    : ""
);

const { copy: copyLink, copied: linkCopied } = useClipboard({
  source: referralUrl,
});

const handleToggle = async () => {
  if (!isAuthenticated.value) {
    openLoginModal();
    return;
  }
  showInvitePopover.value = !showInvitePopover.value;
  if (!showInvitePopover.value) return;

  loading.value = true;
  try {
    await fetchReferralCode();
    await fetchReferralDetails();
  } catch (e) {
    // errors handled by store
  } finally {
    loading.value = false;
  }
};

const handleBackdropClick = () => {
  showInvitePopover.value = false;
};

onMounted(() => {
  if (route.query.invite === "1") {
    handleToggle();
  }
});

const steps = [
  {
    icon: UserPlusIcon,
    text: "Share your unique referral link with friends.",
  },
  {
    icon: BanknotesIcon,
    text: "Your friend signs up and deposits UGX 49 or more.",
  },
  {
    icon: DevicePhoneMobileIcon,
    text: "They play at least 3 Aviator rounds with a 1.5x multiplier and a total stake of UGX 49 or more.",
  },
  {
    icon: GiftIcon,
    text: "Boom! You get a UGX 100 Aviator Free Bet instantly.",
  },
  {
    icon: CheckCircleIcon,
    text: "Click the Claim button that will popup inside aviator to redeem your free bet.",
  },
];
</script>

<template>
  <div class="aviator-shell">
    <h1 class="sr-only">Play Aviator – Crash Game | 7bet</h1>

    <!-- Top nav bar -->
    <div class="sticky top-0 z-20">
      <CasinoHeader />
    </div>

    <!-- Aviator free bets promo bar -->
    <div class="aviator-promo-wrap">
      <div class="aviator-promo-bar" @click="handleToggle">
        <div class="promo-inner">
          <GiftIcon class="promo-icon" />
          <span class="promo-text">Earn UGX 100 Aviator Free Bets Instantly</span>
          <button class="promo-cta">INVITE NOW →</button>
        </div>
      </div>
    </div>

    <!-- Invite popover overlay -->
    <Transition name="popover">
      <div
        v-if="showInvitePopover"
        class="popover-overlay"
        @mousedown.self="handleBackdropClick"
      >
        <div class="popover-panel">
          <!-- Header -->
          <div class="popover-header">
            <div>
              <h3 class="popover-title">Invite Friends & Earn</h3>
              <p class="popover-subtitle">
                Get UGX 100 Free Bet for each friend
              </p>
            </div>
            <button class="popover-close" @click="showInvitePopover = false">
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="popover-body">
            <!-- ── Share via socials ── -->
            <div class="share-section">
              <label class="section-label">Share With Friends</label>
              <div class="share-socials-wrap">
                <ShareToSocials
                  :share-url="referralUrl"
                  :share-text="affiliateText"
                />
              </div>
            </div>

            <!-- ── Copy link ── -->
            <div class="copy-section">
              <label class="section-label">Your Referral Link</label>
              <div class="copy-input-wrap">
                <input
                  type="text"
                  readonly
                  :value="referralUrl"
                  class="copy-input"
                />
                <button class="copy-btn" @click="copyLink(referralUrl)">
                  <CheckCircleIcon
                    v-if="linkCopied"
                    class="w-4 h-4 text-green-400"
                  />
                  <span>{{ linkCopied ? "Copied!" : "Copy" }}</span>
                </button>
              </div>
            </div>

            <!-- ── How it works ── -->
            <div class="steps-section">
              <h4 class="steps-title">How It Works</h4>
              <ol class="steps-list">
                <li v-for="(step, i) in steps" :key="i" class="step-item">
                  <span class="step-number">{{ i + 1 }}</span>
                  <component :is="step.icon" class="step-icon" />
                  <span class="step-text">{{ step.text }}</span>
                </li>
              </ol>
            </div>

            <!-- ── Dashboard ── -->
            <div class="dashboard-section">
              <h4 class="section-label">Your Dashboard</h4>

              <div v-if="loading" class="dashboard-loading">
                <ArrowPathIcon class="w-5 h-5 animate-spin text-gold-bright" />
              </div>

              <div v-else-if="!referralDetails?.length" class="dashboard-empty">
                <UserPlusIcon class="w-8 h-8 text-white/15" />
                <p>Invite friends to see your stats here</p>
              </div>

              <template v-else>
                <!-- Referral table -->
                <div class="referral-table-wrap">
                  <div class="referral-table-header">
                    <span class="referral-table-title">Friends</span>
                    <span class="referral-table-live">● Live</span>
                  </div>
                  <table class="referral-table">
                    <thead>
                      <tr>
                        <th>Friend</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th class="text-right">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="detail in referralDetails"
                        :key="detail.friend_profile_sid"
                      >
                        <td>
                          <div class="friend-name">{{ detail.first_name }}</div>
                          <div class="friend-msisdn">{{ detail.msisdn }}</div>
                        </td>
                        <td>
                          <span
                            :class="[
                              'status-badge',
                              detail.status === 'COMPLETED' &&
                                'status-badge--active',
                              detail.status === 'REGISTERED' &&
                                'status-badge--signed',
                            ]"
                          >
                            {{ detail.status === "COMPLETED" ? "Completed" : "Registered" }}
                          </span>
                        </td>
                        <td>
                          <div class="progress-bar-wrap">
                            <div class="progress-bar" :style="{ width: `${detail.percentage}%` }"></div>
                          </div>
                          <span class="progress-text">{{ Math.round(detail.percentage) }}%</span>
                        </td>
                        <td class="text-right">
                          <span
                            v-if="detail.bonus_claimed"
                            class="claim-btn claim-btn--claimed"
                          >
                            Claimed
                          </span>
                          <button
                            v-else-if="detail.status?.toUpperCase() === 'CLAIM'"
                            class="claim-btn"
                            :disabled="redeemPending"
                            @click="redeemBonus"
                          >
                            <ArrowPathIcon
                              v-if="redeemPending"
                              class="w-3 h-3 animate-spin"
                            />
                            <span v-else>Claim</span>
                          </button>
                          <button
                            v-else
                            class="claim-btn claim-btn--disabled"
                            disabled
                            :title="`Friend must complete all steps before you can claim (${Math.round(detail.percentage)}% done)`"
                          >
                            Claim
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Game iframe area -->
    <div class="aviator-viewport">
      <AviatorIframe />
    </div>

    <!-- Bottom bar: toggle -->
    <div class="sticky bottom-0 z-20 aviator-footer">
      <div class="flex items-center justify-center h-12 max-w-[1680px] mx-auto">
        <CasinoToggle />
      </div>
    </div>

    <!-- SEO content -->
    <AviatorContent1 />
  </div>
</template>

<style scoped>
/* ── Shell layout ── */
.aviator-shell {
  height: var(--viewport-height, 100dvh);
  display: flex;
  flex-direction: column;
  background: oklch(14% 0.03 258);
  overflow: hidden;
}
.aviator-viewport {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.aviator-footer {
  background: oklch(16% 0.03 258);
  border-top: 1px solid oklch(100% 0 0 / 0.04);
}

/* ── Promo bar wrapper ── */
.aviator-promo-wrap {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 0;
}

.aviator-promo-bar {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(90deg, oklch(22% 0.05 145 / 0.6), oklch(18% 0.04 258), oklch(22% 0.05 145 / 0.6));
  border-bottom: 1px solid oklch(100% 0 0 / 0.04);
  width: 100%;
  max-width: 1680px;
}

.promo-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  cursor: pointer;
  padding: 5px 12px;
}

.promo-icon {
  width: 14px;
  height: 14px;
  color: oklch(65% 0.16 142);
  flex-shrink: 0;
  animation: promo-icon-bounce 1.5s ease-in-out infinite;
}

@keyframes promo-icon-bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(-6deg); }
  75% { transform: translateY(-1px) rotate(3deg); }
}

.promo-text {
  flex: 1;
  font-size: 0.65rem;
  font-weight: 600;
  color: oklch(100% 0 0 / 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.promo-cta {
  padding: 3px 8px;
  border-radius: 5px;
  background: oklch(100% 0 0 / 0.08);
  border: 1px solid oklch(100% 0 0 / 0.08);
  color: oklch(70% 0.12 142);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.promo-cta:hover {
  background: oklch(100% 0 0 / 0.12);
  color: oklch(80% 0.14 142);
}


/* ── Popover overlay ── */
.popover-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 48px;
  background: oklch(0% 0 0 / 0.35);
  backdrop-filter: blur(4px);
}

/* ── Popover panel (mobile: centered card) ── */
.popover-panel {
  width: 100%;
  max-width: 380px;
  max-height: calc(100% - 64px);
  overflow-y: auto;
  border-radius: 16px;
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.08);
  box-shadow: 0 24px 48px oklch(0% 0 0 / 0.15);
  margin: 0 12px;
}

/* ── Desktop: right-side drawer (full height, limited width) ── */
@media (min-width: 1024px) {
  .popover-overlay {
    align-items: stretch;
    justify-content: flex-end;
    padding: 0;
  }
  .popover-panel {
    max-width: 400px;
    width: 400px;
    height: 100%;
    max-height: none;
    border-radius: 0;
    margin: 0;
    border-left: 1px solid oklch(0% 0 0 / 0.08);
    box-shadow: -8px 0 32px oklch(0% 0 0 / 0.12);
  }
}

/* ── Popover header ── */
.popover-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 16px;
  background: linear-gradient(135deg, oklch(95% 0.04 40), oklch(98% 0.01 260));
  border-bottom: 1px solid oklch(0% 0 0 / 0.06);
  border-radius: 16px 16px 0 0;
}
.popover-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: oklch(15% 0.02 260);
}
.popover-subtitle {
  font-size: 0.75rem;
  color: oklch(45% 0.1 40);
  margin-top: 2px;
  font-weight: 500;
}
.popover-close {
  color: oklch(0% 0 0 / 0.4);
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  background: none;
  border: none;
  transition: all 0.15s;
}
.popover-close:hover {
  color: oklch(0% 0 0 / 0.7);
  background: oklch(0% 0 0 / 0.05);
}

/* ── Body ── */
.popover-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Section label ── */
.section-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: oklch(0% 0 0 / 0.4);
}

/* ── Invite section ── */
.invite-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.invite-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.invite-input-wrap {
  display: flex;
  align-items: center;
  background: oklch(97% 0.003 260);
  border: 1px solid oklch(0% 0 0 / 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.15s;
}
.invite-input-wrap:focus-within {
  border-color: oklch(65% 0.15 55);
}
.invite-prefix {
  padding: 0 10px 0 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: oklch(0% 0 0 / 0.45);
  white-space: nowrap;
}
.invite-input {
  flex: 1;
  min-width: 0;
  padding: 10px 0;
  font-size: 0.875rem;
  font-family: ui-monospace, monospace;
  background: transparent;
  border: none;
  outline: none;
  color: oklch(15% 0.02 260);
}
.invite-input::placeholder {
  color: oklch(0% 0 0 / 0.25);
}
.invite-send-btn {
  margin: 4px;
  padding: 6px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  background: linear-gradient(135deg, oklch(75% 0.16 55), oklch(70% 0.18 45));
  color: oklch(15% 0.05 55);
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.invite-send-btn:hover {
  transform: scale(1.03);
}
.invite-send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.invite-error {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: oklch(55% 0.2 25);
}

/* ── Share section ── */
.share-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.share-socials-wrap {
  background: oklch(97% 0.003 260);
  border: 1px solid oklch(0% 0 0 / 0.06);
  border-radius: 10px;
}

/* ── Copy link ── */
.copy-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.copy-input-wrap {
  display: flex;
  align-items: center;
  background: oklch(97% 0.003 260);
  border: 1px solid oklch(0% 0 0 / 0.1);
  border-radius: 10px;
  overflow: hidden;
}
.copy-input {
  flex: 1;
  min-width: 0;
  padding: 9px 12px;
  font-size: 0.75rem;
  background: transparent;
  border: none;
  outline: none;
  color: oklch(0% 0 0 / 0.5);
  text-overflow: ellipsis;
}
.copy-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  background: oklch(0% 0 0 / 0.06);
  color: oklch(15% 0.02 260);
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.copy-btn:hover {
  background: oklch(0% 0 0 / 0.1);
}

/* ── How it works ── */
.steps-section {
  padding-top: 12px;
  border-top: 1px solid oklch(0% 0 0 / 0.06);
}
.steps-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: oklch(55% 0.12 55);
  margin-bottom: 10px;
}
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  color: oklch(0% 0 0 / 0.65);
}
.step-number {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: oklch(70% 0.14 55 / 0.15);
  color: oklch(55% 0.14 55);
  font-size: 0.6875rem;
  font-weight: 700;
  flex-shrink: 0;
}
.step-icon {
  width: 16px;
  height: 16px;
  color: oklch(0% 0 0 / 0.25);
  flex-shrink: 0;
}
.step-text {
  line-height: 1.3;
}

/* ── Dashboard section ── */
.dashboard-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid oklch(0% 0 0 / 0.06);
}
.dashboard-loading {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.dashboard-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 0;
  color: oklch(0% 0 0 / 0.25);
  font-size: 0.75rem;
}

/* ── Stats grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.stat-card {
  padding: 10px 12px;
  border-radius: 10px;
  background: oklch(97% 0.003 260);
  border: 1px solid oklch(0% 0 0 / 0.06);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-card--highlight {
  background: oklch(75% 0.15 55 / 0.08);
  border-color: oklch(75% 0.15 55 / 0.15);
}
.stat-card--rank {
  background: linear-gradient(135deg, oklch(85% 0.06 145), oklch(90% 0.04 200));
  border-color: oklch(70% 0.1 145 / 0.2);
}
.stat-label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: oklch(0% 0 0 / 0.4);
}
.stat-value {
  font-size: 1.125rem;
  font-weight: 800;
  color: oklch(15% 0.02 260);
}
.stat-value--green {
  color: oklch(45% 0.18 142);
}
.stat-value--gold {
  color: oklch(55% 0.15 55);
}

/* ── Referral table ── */
.referral-table-wrap {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid oklch(0% 0 0 / 0.06);
}
.referral-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: oklch(97% 0.003 260);
  border-bottom: 1px solid oklch(0% 0 0 / 0.06);
}
.referral-table-title {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: oklch(0% 0 0 / 0.45);
}
.referral-table-live {
  font-size: 0.625rem;
  font-weight: 600;
  color: oklch(45% 0.18 142);
  animation: pulse-live 2s ease-in-out infinite;
}
@keyframes pulse-live {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
.referral-table {
  width: 100%;
  font-size: 0.75rem;
  border-collapse: collapse;
}
.referral-table th {
  padding: 8px 12px;
  text-align: left;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: oklch(0% 0 0 / 0.35);
  background: oklch(97% 0.003 260);
  border-bottom: 1px solid oklch(0% 0 0 / 0.06);
}
.referral-table td {
  padding: 8px 8px;
  color: oklch(0% 0 0 / 0.65);
  border-bottom: 1px solid oklch(0% 0 0 / 0.04);
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.referral-table th:nth-child(1) { width: 30%; }
.referral-table th:nth-child(2) { width: 22%; }
.referral-table th:nth-child(3) { width: 25%; }
.referral-table th:nth-child(4) { width: 23%; }
.referral-table tr:last-child td {
  border-bottom: none;
}

/* ── Friend cell ── */
.friend-name {
  font-weight: 600;
  font-size: 0.75rem;
  color: oklch(15% 0.02 260);
}
.friend-msisdn {
  font-size: 0.625rem;
  font-family: ui-monospace, monospace;
  color: oklch(0% 0 0 / 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Progress bar ── */
.progress-bar-wrap {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: oklch(0% 0 0 / 0.06);
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  border-radius: 3px;
  background: oklch(55% 0.18 142);
  transition: width 0.3s ease;
}
.progress-text {
  font-size: 0.625rem;
  font-weight: 600;
  color: oklch(0% 0 0 / 0.45);
  margin-top: 2px;
  display: block;
}

/* ── Claim button ── */
.claim-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 14px;
  font-size: 0.6875rem;
  font-weight: 700;
  border-radius: 6px;
  background: linear-gradient(135deg, oklch(55% 0.18 142), oklch(45% 0.18 142));
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.claim-btn:hover {
  transform: scale(1.05);
}
.claim-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.claim-btn--claimed {
  background: oklch(50% 0.2 142 / 0.15);
  color: oklch(50% 0.2 142);
  cursor: default;
}
.claim-btn--disabled {
  position: relative;
  background: oklch(0% 0 0 / 0.08);
  color: oklch(0% 0 0 / 0.3);
  opacity: 1;
}
.claim-btn--disabled:hover::after {
  content: attr(title);
  position: fixed;
  width: max-content;
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 8px;
  background: oklch(15% 0.02 260);
  color: white;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 0 4px 12px oklch(0% 0 0 / 0.25);
  z-index: 100;
  pointer-events: none;
  transform: translate(-75%, -110%);
}

/* ── Status badges ── */
.status-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.status-badge--active {
  background: oklch(70% 0.19 142 / 0.12);
  color: oklch(45% 0.17 142);
}
.status-badge--signed {
  background: oklch(60% 0.15 250 / 0.12);
  color: oklch(45% 0.13 250);
}
.status-badge--pending {
  background: oklch(75% 0.12 70 / 0.1);
  color: oklch(55% 0.1 70);
}

/* ══════════════════════════════════
   Dark mode overrides
   ══════════════════════════════════ */

/* Dark mode — already dark by default, minimal overrides */

/* Popover */
[data-theme="dark"] .popover-overlay {
  background: oklch(0% 0 0 / 0.6);
}
[data-theme="dark"] .popover-panel {
  background: oklch(16% 0.03 258);
  border-color: oklch(100% 0 0 / 0.08);
  box-shadow: 0 24px 48px oklch(0% 0 0 / 0.5), 0 0 0 1px oklch(100% 0 0 / 0.04);
}
@media (min-width: 1024px) {
  [data-theme="dark"] .popover-panel {
    box-shadow: -8px 0 32px oklch(0% 0 0 / 0.4);
  }
}
[data-theme="dark"] .popover-header {
  background: linear-gradient(
    135deg,
    oklch(25% 0.08 40 / 0.6),
    oklch(20% 0.04 258)
  );
  border-bottom-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .popover-title {
  color: white;
}
[data-theme="dark"] .popover-subtitle {
  color: oklch(80% 0.12 60);
}
[data-theme="dark"] .popover-close {
  color: oklch(100% 0 0 / 0.5);
}
[data-theme="dark"] .popover-close:hover {
  color: white;
  background: oklch(100% 0 0 / 0.1);
}

/* Section label */
[data-theme="dark"] .section-label {
  color: oklch(100% 0 0 / 0.4);
}

/* Invite */
[data-theme="dark"] .invite-input-wrap {
  background: oklch(12% 0.02 258);
  border-color: oklch(100% 0 0 / 0.1);
}
[data-theme="dark"] .invite-input-wrap:focus-within {
  border-color: oklch(75% 0.15 55);
}
[data-theme="dark"] .invite-prefix {
  color: oklch(100% 0 0 / 0.5);
}
[data-theme="dark"] .invite-input {
  color: white;
}
[data-theme="dark"] .invite-input::placeholder {
  color: oklch(100% 0 0 / 0.25);
}
[data-theme="dark"] .invite-error {
  color: oklch(65% 0.2 25);
}

/* Share */
[data-theme="dark"] .share-socials-wrap {
  background: oklch(12% 0.02 258);
  border-color: oklch(100% 0 0 / 0.08);
}

/* Copy */
[data-theme="dark"] .copy-input-wrap {
  background: oklch(12% 0.02 258);
  border-color: oklch(100% 0 0 / 0.1);
}
[data-theme="dark"] .copy-input {
  color: oklch(100% 0 0 / 0.4);
}
[data-theme="dark"] .copy-btn {
  background: oklch(100% 0 0 / 0.08);
  color: white;
}
[data-theme="dark"] .copy-btn:hover {
  background: oklch(100% 0 0 / 0.14);
}

/* Steps */
[data-theme="dark"] .steps-section {
  border-top-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .steps-title {
  color: oklch(75% 0.12 55);
}
[data-theme="dark"] .step-item {
  color: oklch(100% 0 0 / 0.7);
}
[data-theme="dark"] .step-number {
  background: oklch(75% 0.15 55 / 0.15);
  color: oklch(80% 0.15 55);
}
[data-theme="dark"] .step-icon {
  color: oklch(100% 0 0 / 0.3);
}

/* Dashboard */
[data-theme="dark"] .dashboard-section {
  border-top-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .dashboard-empty {
  color: oklch(100% 0 0 / 0.3);
}
[data-theme="dark"] .stat-card {
  background: oklch(100% 0 0 / 0.04);
  border-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .stat-card--rank {
  background: linear-gradient(
    135deg,
    oklch(35% 0.1 145 / 0.5),
    oklch(30% 0.08 200 / 0.4)
  );
  border-color: oklch(60% 0.12 145 / 0.2);
}
[data-theme="dark"] .stat-label {
  color: oklch(100% 0 0 / 0.4);
}
[data-theme="dark"] .stat-value {
  color: white;
}
[data-theme="dark"] .stat-value--green {
  color: oklch(70% 0.19 142);
}
[data-theme="dark"] .stat-value--gold {
  color: oklch(80% 0.15 55);
}

/* Table */
[data-theme="dark"] .referral-table-wrap {
  border-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .referral-table-header {
  background: oklch(100% 0 0 / 0.03);
  border-bottom-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .referral-table-title {
  color: oklch(100% 0 0 / 0.5);
}
[data-theme="dark"] .referral-table-live {
  color: oklch(70% 0.19 142);
}
[data-theme="dark"] .referral-table th {
  color: oklch(100% 0 0 / 0.35);
  background: oklch(100% 0 0 / 0.03);
  border-bottom-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .referral-table td {
  color: oklch(100% 0 0 / 0.7);
  border-bottom-color: oklch(100% 0 0 / 0.04);
}

/* Badges */
[data-theme="dark"] .status-badge--active {
  background: oklch(70% 0.19 142 / 0.15);
  color: oklch(75% 0.17 142);
}
[data-theme="dark"] .status-badge--signed {
  background: oklch(60% 0.15 250 / 0.15);
  color: oklch(70% 0.13 250);
}
[data-theme="dark"] .status-badge--pending {
  background: oklch(75% 0.12 70 / 0.12);
  color: oklch(80% 0.1 70);
}

/* Friend cell */
[data-theme="dark"] .friend-name {
  color: white;
}
[data-theme="dark"] .friend-msisdn {
  color: oklch(100% 0 0 / 0.35);
}

/* Progress bar */
[data-theme="dark"] .progress-bar-wrap {
  background: oklch(100% 0 0 / 0.08);
}
[data-theme="dark"] .progress-text {
  color: oklch(100% 0 0 / 0.45);
}

/* Claim button */
[data-theme="dark"] .claim-btn {
  background: linear-gradient(135deg, oklch(50% 0.18 142), oklch(40% 0.18 142));
  color: white;
}
[data-theme="dark"] .claim-btn--claimed {
  background: oklch(50% 0.2 142 / 0.2);
  color: oklch(65% 0.2 142);
}
[data-theme="dark"] .claim-btn--disabled {
  background: oklch(100% 0 0 / 0.08);
  color: oklch(100% 0 0 / 0.3);
}
[data-theme="dark"] .claim-btn--disabled:hover::after {
  background: oklch(25% 0.02 260);
}

/* ── Transitions (mobile: fade + scale) ── */
.popover-enter-active {
  transition: all 0.2s ease-out;
}
.popover-leave-active {
  transition: all 0.15s ease-in;
}
.popover-enter-from {
  opacity: 0;
}
.popover-enter-from .popover-panel {
  transform: translateY(-8px) scale(0.97);
}
.popover-leave-to {
  opacity: 0;
}
.popover-leave-to .popover-panel {
  transform: translateY(-4px) scale(0.98);
}

/* ── Transitions (desktop: slide from right) ── */
@media (min-width: 1024px) {
  .popover-enter-from .popover-panel {
    transform: translateX(100%) scale(1);
  }
  .popover-leave-to .popover-panel {
    transform: translateX(100%) scale(1);
  }
  .popover-enter-active .popover-panel {
    transition: transform 0.25s ease-out;
  }
  .popover-leave-active .popover-panel {
    transition: transform 0.2s ease-in;
  }
}
</style>
