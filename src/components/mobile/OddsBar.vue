<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useBetslipStore } from "@/stores/sports-betslip";
import { useBetslipDataLayer } from "@/composables/useBetslipDataLayer";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const allowedRoutes = ["live", "sports", "match-details", "country"];

const betslipStore = useBetslipStore();
const { betslipLength, totalOdds, possibleWin } = storeToRefs(betslipStore);
const { verifyBetslip } = betslipStore;

const { showModal } = storeToRefs(useModalStore());
const { openModal } = useModalStore();
const { betslip } = useModalTypes();
const { addViewBetslipDataLayer } = useBetslipDataLayer();

const show = computed(() =>
  betslipLength.value > 0 && !showModal.value && allowedRoutes.includes(route.name)
);

const bouncing = ref(false);

watch(betslipLength, (newVal, oldVal) => {
  if (newVal > oldVal) {
    bouncing.value = true;
    setTimeout(() => { bouncing.value = false; }, 500);
  }
});

function openBetslip() {
  verifyBetslip();
  openModal(betslip);
  addViewBetslipDataLayer();
}
</script>

<template>
  <Transition name="oddsbar">
    <div
      v-if="show"
      class="oddsbar fixed bottom-[54px] left-0 right-0 z-[49] pb-[env(safe-area-inset-bottom,0px)]"
      data-fly-target="betslip"
      @click="openBetslip"
    >
      <div
        class="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-t-2xl bg-brand-forest/85 backdrop-blur-xl backdrop-saturate-150 border border-brand-bright/20 shadow-lg shadow-black/30 cursor-pointer transition-transform duration-150 active:scale-[0.98]"
        :class="{ 'oddsbar-bounce': bouncing }"
      >
        <!-- Left: count + odds -->
        <div class="flex items-center gap-2.5">
          <span
            class="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-bright text-brand-forest text-[0.8rem] font-extrabold tabular-nums shadow-md shadow-brand-bright/40"
          >
            {{ betslipLength }}
          </span>
          <div class="flex flex-col">
            <span class="text-[0.65rem] font-semibold uppercase tracking-wider text-white/55">Betslip</span>
            <span class="text-[0.8rem] font-bold text-white tabular-nums">{{ totalOdds }} odds</span>
          </div>
        </div>

        <!-- Right: possible win + arrow -->
        <div class="flex items-center gap-2">
          <div class="flex flex-col items-end">
            <span class="text-[0.6rem] font-semibold uppercase tracking-wide text-white/45">Win</span>
            <span class="text-[0.85rem] font-extrabold text-brand-bright tabular-nums">KES {{ possibleWin }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-[18px] h-[18px] text-brand-bright/70">
            <path fill-rule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Bounce when a betslip item lands — custom keyframe, not expressible in Tailwind */
.oddsbar-bounce {
  animation: oddsbar-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes oddsbar-pop {
  0% { transform: scale(1); }
  20% { transform: scale(1.06); }
  50% { transform: scale(0.97); }
  75% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Vue <Transition> enter/leave — driven by transition name, must live in CSS */
.oddsbar-enter-active {
  transition: all 0.25s ease-out;
}
.oddsbar-leave-active {
  transition: all 0.15s ease-in;
}
.oddsbar-enter-from,
.oddsbar-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
