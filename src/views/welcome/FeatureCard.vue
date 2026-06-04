<template>
  <div
    class="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-sm mx-auto"
  >
    <div class="mb-4 flex  items-center ">
      <slot name="icon"></slot>
      <h3 class="text-2xl font-semibold mb-2 truncate text-amber-400 text-ellipsis">{{ title }}</h3>
    </div>
    <div class="text-gray-300 truncate">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
