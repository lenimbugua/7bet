<script setup>
// import { GiftIcon } from "@heroicons/vue/24/solid";
// const paybillNo = import.meta.env.VITE_PAYBILL_NO;
</script>
<template>
  <RouterLink
    class="w-full mx-auto p-2 bg-primary whitespace-nowrap flex justify-between items-center text-white font-bold text-xs shadow-sm"
    :to="{ name: 'deposit' }"
  >
    <div>Click to Deposit</div>
    <!-- <div class="">
      Paybill {{ paybillNo }}
    </div> -->
    <div
      class="flex items-center shadow-lg bg-amber-400 text-black text-xs font-bold rounded-md px-1 whitespace-nowrap"
    >
      <!-- <GiftIcon class="w-4 h-4 text-fuchsia-600" /> -->
      <span> <span class="line-through">Tax</span> free deposits</span>
    </div>
  </RouterLink>
</template>
