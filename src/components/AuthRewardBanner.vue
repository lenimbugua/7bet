<script setup>
import aviatorIcon from "@/assets/bonus/aviator-icon.png";
</script>

<template>
  <div
    class="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-r from-[#8f1414] via-[#a01818] to-[#6e0f0f] ring-1 ring-red-500/30 shadow-lg shadow-red-950/30"
  >
    <!-- Heat glow -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgba(255,140,60,0.3),transparent_60%)]"
    ></div>

    <div class="relative flex items-center justify-between gap-3 px-4 py-3">
      <img
        :src="aviatorIcon"
        alt="Aviator"
        class="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
      />
      <div class="text-right">
        <div
          class="text-2xl sm:text-3xl font-black italic leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fff3a0] via-[#ffd34d] to-[#e0980f] drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
        >
          UGX 1,630
        </div>
        <div
          class="mt-1.5 text-white text-xs sm:text-sm font-extrabold tracking-wide leading-tight drop-shadow"
        >
          SIGN UP &amp;<br />CLAIM REWARDS!
        </div>
      </div>
    </div>
  </div>
</template>
