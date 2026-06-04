<script setup>
import AuthTopBar from "./AuthTopBar.vue";
import AuthRewardBanner from "../components/AuthRewardBanner.vue";
</script>
<template>
  <h1 class="sr-only">Account – Login & Register</h1>
  <div class="min-h-dvh flex flex-col bg-gray-50 dark:bg-background">
    <!-- Mobile: top bar -->
    <div class="flex lg:hidden">
      <AuthTopBar />
    </div>

    <!-- Desktop: full header -->
    <div class="hidden lg:block">
      <HeaderLinks />
    </div>

    <!-- Main content area -->
    <div class="flex-1 w-full max-w-4xl mx-auto px-3">
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

    <Footer />
  </div>
</template>
