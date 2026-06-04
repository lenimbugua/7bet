<script setup>
import { GiftIcon } from "@heroicons/vue/24/solid";
</script>
<template>
  <RouterLink
    class="px-2.5 py-1 bg-linear-to-r from-amber-600 via-red-300 to-amber-500 flex items-center justify-between text-foreground font-bold text-xs"
    :to="{ name: 'deposit' }"
  >
    <div class="flex justify-between w-full items-center text-gray-950">
      <div class="flex space-x-1.5 items-center">
        <div class="">
          <GiftIcon class="h-5 w-5 text-fuchsia-600" />
        </div>
        <span>Enjoy <span class="line-through">tax</span> free deposits</span>
        <div class="">
          <GiftIcon class="h-5 w-5 text-fuchsia-600" />
        </div>
      </div>
      <div>
        <button
          class="bg-white text-red-500 p-1 px-2 rounded-md flex space-x-1"
        >
          <span>Deposit Now</span>
        </button>
      </div>
    </div>
  </RouterLink>
</template>
