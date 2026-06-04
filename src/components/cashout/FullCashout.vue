<script setup>
import { useCashoutStore } from "@/stores/cashout.js";
import { computed, toRefs } from "vue";

const { cashoutNow, cancelAutoCashout } = useCashoutStore();
const { pending, betId } = toRefs(useCashoutStore());
const cashoutData = computed(() => useCashoutStore().cashoutData(betId.value));
</script>
<template>
  <div class="full-cashout">
    <!-- Auto cashout active warning -->
    <div v-if="cashoutData?.autoCashOutEnabled" class="cashout-section">
      <div class="cashout-notice">
        <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>Auto cashout is active. Cancel it first to use instant cashout.</p>
      </div>
      <button class="cashout-action-btn cashout-btn-cancel" :disabled="pending" @click="cancelAutoCashout(cashoutData.betId)">
        <TheButtonSpin v-if="pending" />
        <template v-else>
          <span>Cancel Auto Cashout</span>
          <span class="cashout-btn-tag">{{ cashoutData.autoCashOutAmount }} KES</span>
        </template>
      </button>
    </div>

    <!-- Normal full cashout -->
    <div v-else class="cashout-section">
      <p class="cashout-disclaimer">
        By clicking below you confirm your cashout. This action cannot be reversed.
      </p>
      <button class="cashout-action-btn cashout-btn-primary" :disabled="pending" @click="cashoutNow(betId)">
        <TheButtonSpin v-if="pending" />
        <template v-else>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>Cashout Now</span>
        </template>
      </button>
    </div>
  </div>
</template>

<style scoped>
.full-cashout {
  /* container */
}

.cashout-section {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.cashout-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.4;
  color: oklch(45% 0.14 75);
  background: oklch(90% 0.06 75 / 0.3);
  border: 1px solid oklch(80% 0.08 75 / 0.3);
}
[data-theme="dark"] .cashout-notice {
  color: oklch(80% 0.1 75);
  background: oklch(65% 0.14 75 / 0.08);
  border-color: oklch(65% 0.14 75 / 0.12);
}

.cashout-disclaimer {
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.5;
  color: oklch(50% 0 0);
}
[data-theme="dark"] .cashout-disclaimer {
  color: oklch(100% 0 0 / 0.4);
}

/* ── Action buttons ── */
.cashout-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.cashout-action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cashout-btn-primary {
  color: white;
  background: oklch(55% 0.19 142);
}
.cashout-btn-primary:hover:not(:disabled) {
  background: oklch(50% 0.19 142);
}
[data-theme="dark"] .cashout-btn-primary {
  background: oklch(60% 0.19 142);
}
[data-theme="dark"] .cashout-btn-primary:hover:not(:disabled) {
  background: oklch(55% 0.19 142);
}

.cashout-btn-cancel {
  color: white;
  background: oklch(55% 0.16 75);
}
.cashout-btn-cancel:hover:not(:disabled) {
  background: oklch(50% 0.16 75);
}
[data-theme="dark"] .cashout-btn-cancel {
  background: oklch(60% 0.14 75);
}
[data-theme="dark"] .cashout-btn-cancel:hover:not(:disabled) {
  background: oklch(55% 0.14 75);
}

.cashout-btn-tag {
  padding-left: 0.5rem;
  margin-left: 0.25rem;
  border-left: 1px solid oklch(100% 0 0 / 0.25);
  font-size: 0.7rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
