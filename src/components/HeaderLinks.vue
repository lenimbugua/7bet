<script setup>
import ThemeSwitch from "./ThemeSwitch.vue";
import { useLoginStore } from "../stores/login";
import HeaderProfile from "./HeaderProfile.vue";
import NavLinks from "./NavLinks.vue";
import Search from "./icons/svgs/Search.vue";
import CategoryPills from "./mobile/CategoryPills.vue";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { storeToRefs } from "pinia";

defineProps({
  // Suppress the desktop nav-links row (used when a layout renders <NavLinks />
  // in its own middle content column instead).
  hideNavLinks: { type: Boolean, default: false },
});

const { token } = storeToRefs(useLoginStore());

const { search } = useModalTypes();
const { openModal } = useModalStore();
const openSearchModal = () => openModal(search);
</script>

<template>
  <header
    class="sticky top-0 z-60 backdrop-blur-xl bg-background/90 border-b border-border/50"
  >
    <!-- ========== DESKTOP ========== -->
    <div class="hidden lg:block w-full px-3 md:px-5">
      <!-- Top row: Logo + (centered) Support/Search + Auth + Theme -->
      <div class="relative flex h-16 items-center max-w-[1680px] mx-auto">
        <!-- Logo (nudged left, toward the viewport edge; no fixed width so the
             pills sit right after it) -->
        <div class="flex items-center shrink-0 -ml-4 mr-3">
          <TheLogo />
        </div>

        <!-- Category pills (compact header variant), left-aligned after the logo -->
        <div class="flex-1 min-w-0 flex justify-start">
          <CategoryPills in-header />
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 shrink-0 pl-4">
          <template v-if="!token">
            <RouterLink
              :to="{ name: 'login' }"
              class="text-sm font-semibold px-3 py-1.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/6 text-brand-bright hover:bg-gray-200 dark:hover:bg-white/8 transition-colors"
            >
              Log in
            </RouterLink>
            <RouterLink
              :to="{ name: 'signup' }"
              class="text-sm font-bold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 px-4 py-2 rounded-md transition-colors duration-150"
            >
              Get Started
            </RouterLink>
          </template>

          <template v-if="token">
            <HeaderProfile />
            <span class="relative inline-flex">
              <span class="absolute inset-0 rounded-lg bg-brand-bright deposit-ping pointer-events-none"></span>
              <RouterLink
                :to="{ name: 'deposit' }"
                class="relative flex items-center gap-1.5 text-sm font-bold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 px-4 py-2 rounded-lg transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                </svg>
                Deposit
              </RouterLink>
            </span>
          </template>

          <div class="w-px h-5 bg-border/50"></div>
          <ThemeSwitch />
        </div>
      </div>

      <!-- Nav links row (hidden when a layout hosts <NavLinks /> in its middle column) -->
      <NavLinks
        v-if="!hideNavLinks"
        class="border-t border-border/50 max-w-[1680px] mx-auto"
      />
    </div>

    <!-- ========== MOBILE ========== -->
    <div class="relative flex lg:hidden pr-3 py-0 items-center justify-between">
      <!-- Left: Menu + Logo -->
      <div class="flex items-center gap-1.5">
        <TheLogo />
      </div>

      <!-- Center: Search -->
      <button
        type="button"
        aria-label="Search"
        class="absolute left-1/2 translate-x-[calc(-50%_-_3rem)] flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
        @click="openSearchModal"
      >
        <Search class="w-5 h-5 object-contain" />
      </button>

      <!-- Right: Auth -->
      <div class="flex items-center gap-2">
        <template v-if="!token">
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm font-semibold px-3 py-1.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/6 text-brand-bright hover:bg-gray-200 dark:hover:bg-white/8 transition-colors"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            class="text-sm font-semibold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 rounded-md px-4 py-1.5 transition-colors duration-150"
          >
            Join
          </RouterLink>
        </template>

        <template v-if="token">
          <HeaderProfile />
          <span class="relative inline-flex">
            <span class="absolute inset-0 rounded-lg bg-brand-bright deposit-ping pointer-events-none"></span>
            <RouterLink
              :to="{ name: 'deposit' }"
              class="relative text-sm font-bold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 rounded-lg px-4 py-1.5 transition-colors duration-150"
            >
              Deposit
            </RouterLink>
          </span>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Gentle deposit pulse — small scale so it can't push the layout */
.deposit-ping {
  transform-origin: center;
  animation: deposit-ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes deposit-ping {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  70%,
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .deposit-ping {
    animation: none;
    opacity: 0;
  }
}
</style>
