<script setup>
import AuthRewardBanner from "../components/AuthRewardBanner.vue";
</script>
<template>
  <h1 class="sr-only">Account – Login & Register</h1>
  <div class="relative min-h-dvh flex flex-col bg-gray-50 dark:bg-background overflow-hidden">
    <!-- Image background with colored opacity overlay (same technique as the marketing hero) -->
    <img
      src="/hero-stadium.avif"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div
      class="absolute inset-0 bg-gradient-to-br from-white/92 via-gray-50/88 to-brand-bright/25 dark:from-background/95 dark:via-background/90 dark:to-brand-bright/15"
    ></div>

    <!-- Same header as the landing page (handles both mobile & desktop) -->
    <HeaderLinks class="relative z-10" :hide-nav-links="true" />

    <!-- Main content area -->
    <div class="relative z-10 flex-1 w-full max-w-4xl mx-auto px-3">
      <div class="flex min-h-[calc(100dvh-8rem)] lg:gap-8 lg:items-center lg:justify-center lg:py-6">

        <!-- Mobile: form area -->
        <div class="lg:hidden w-full py-4">
          <AuthRewardBanner />
          <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/2 p-5">
            <RouterView />
          </div>
        </div>

        <!-- Right: Form area (desktop) -->
        <div class="hidden lg:flex flex-1 items-center justify-center">
          <div class="w-full max-w-sm">
            <AuthRewardBanner />
            <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/2 p-8">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10">
      <Footer />
    </div>
  </div>
</template>
