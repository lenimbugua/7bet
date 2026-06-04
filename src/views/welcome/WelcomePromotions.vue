<script setup>
import MobileFooterV2 from "../../components/mobile/MobileFooterV2.vue";
import PromoSection from "./PromoSection.vue";
</script>

<template>
  <HeaderLinks />
  <div class="flex gap-2 py-2 justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="text-amber-500 h-10 w-10"
      viewBox="0 0 24 24"
    >
      <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
      <path
        fill="currentColor"
        d="m12 22l-9-8.9L8 7h8l5 6.1zM4.575 7L2.45 4.875l1.425-1.4L6 5.6zM11 5V2h2v3zm8.375 2L17.95 5.575l2.125-2.125L21.5 4.875zM12 19.2l5.25-5.2H6.75zM8.95 9l-2.475 3h11.05L15.05 9z"
      />
    </svg>
    <div class="text-gray-900 dark:text-slate-300">
      <h1 class="font-bold text-lg md:text-2xl">
        Welcome To <span class="text-brand-bright">Pari</span
        ><span class="text-gold-bright">bets</span>
      </h1>
      <h5
        class="text-sm md:text-xl text-gray-600 dark:text-slate-400 leading-none"
      >
        Explore Our Promotions!
      </h5>
    </div>
  </div>
  <section class="bg-white dark:bg-background py-2 px-3">
    <PromoSection />
  </section>
  <Footer />
  <MobileFooterV2 />
</template>
