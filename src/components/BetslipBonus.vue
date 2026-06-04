<script setup>
import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { GiftIcon } from "@heroicons/vue/24/solid";
import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

const { calculatePossibleWin } = useBetslip();
const { betslip, stake } = toRefs(useBetslipStore());
const { calculateBoostBonus } = useMultibetBonus();
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-1.5">
      <GiftIcon class="w-3.5 h-3.5 text-brand-bright shrink-0" />
      <span class="text-[10px] font-semibold text-brand-bright">Boost Bonus</span>
    </div>
    <div class="flex items-baseline gap-1">
      <span class="text-xs font-extrabold text-foreground tabular-nums">{{ calculateBoostBonus(calculatePossibleWin(betslip, stake)) }}</span>
      <span class="text-[10px] text-muted-foreground">KES</span>
    </div>
  </div>
</template>
