<script setup>
defineProps({
  // Thinner sizing for dense mobile bars (e.g. QuickAccessBar)
  compact: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="text-center cursor-pointer">
    <div class="flex-col justify-end items-center inline-flex">
      <div
        class="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        :class="compact ? 'w-4 h-8 md:w-5 md:h-10' : 'w-5 h-10'"
      >
        <div
          class="relative flex items-center justify-center rounded-full h-full w-full"
        >
          <SecondaryNavIcons icon="more" />
        </div>
      </div>
      <div
        class="font-medium w-10 text-ellipsis whitespace-nowrap overflow-hidden text-gray-700 dark:text-white/60"
        :class="compact ? 'text-[0.6rem] md:text-xs mt-0.5 md:mt-1' : 'text-xs mt-1'"
      >
        more
      </div>
    </div>
  </div>
</template>
