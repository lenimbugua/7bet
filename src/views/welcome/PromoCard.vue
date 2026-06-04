<script setup>
defineProps({
  promo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    :class="promo.bg"
    class="p-3 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
  >
    <div class="flex gap-3 items-start">
      <!-- Icon container (fixed size, won't shrink) -->
      <div
        class="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center shrink-0"
      >
        <div class="w-10 h-10 text-yellow-300 flex justify-center items-center">
          <slot name="icon"></slot>
        </div>
      </div>

      <!-- Text content (flexible, will wrap) -->
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-bold text-white wrap-break-word mb-1">
          {{ promo.title }}
        </h3>
        <p class="text-gray-200 text-sm wrap-break-word leading-relaxed">
          {{ promo.samary }}
        </p>
      </div>
    </div>
  </section>
</template>
