<script setup>
// Vertical casino category list for the desktop left sidebar.
// Square top corners — it sits flush against the header.
defineProps({
  items: { type: Array, default: () => [] },
  selected: { type: String, default: "all" },
});

defineEmits(["select"]);
</script>

<template>
  <section class="flex flex-col bg-background">
    <!-- Header (styled like the providers header) -->
    <div
      class="relative z-10 shrink-0 flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40"
    >
      <span class="text-base">🎮</span>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        Categories
      </h2>
    </div>

    <!-- List -->
    <ul class="space-y-1.5 p-3">
      <li v-for="item in items" :key="item.slug">
        <button
          type="button"
          class="w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer"
          :class="
            selected === item.slug
              ? 'bg-primary/10'
              : 'bg-gray-50 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.08]'
          "
          @click="$emit('select', item.slug)"
        >
          <img :src="item.icon" :alt="item.label" class="w-6 h-6 shrink-0" />
          <span
            class="flex-1 min-w-0 block text-sm truncate"
            :class="
              selected === item.slug
                ? 'text-primary font-semibold'
                : 'text-foreground font-medium'
            "
          >
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>
  </section>
</template>
