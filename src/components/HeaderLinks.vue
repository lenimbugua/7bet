<script setup>
import ThemeSwitch from "./ThemeSwitch.vue";
import { useLoginStore } from "../stores/login";
import HeaderProfile from "./HeaderProfile.vue";
import NavLinks from "./NavLinks.vue";
import Search from "./icons/svgs/Search.vue";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { useSupport } from "@/composables/useSupport";
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
const { openSupportModal } = useSupport();
</script>

<template>
  <header
    class="sticky top-0 z-60 backdrop-blur-xl bg-background/90 border-b border-border/50"
  >
    <!-- ========== DESKTOP ========== -->
    <div class="hidden lg:block w-full px-3 md:px-5">
      <!-- Top row: Logo + (centered) Support/Search + Auth + Theme -->
      <div class="relative flex h-14 items-center">
        <!-- Logo -->
        <div class="flex items-center shrink-0 w-64">
          <TheLogo />
        </div>

        <div class="flex-1 min-w-0"></div>

        <!-- Centered: Support + Search (icons only) -->
        <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-5">
          <!-- Support -->
          <span
            role="button"
            aria-label="Support"
            class="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            @click="openSupportModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
              <path d="M21 16v2a4 4 0 0 1-4 4h-5"/>
            </svg>
          </span>

          <!-- Search -->
          <span
            role="button"
            aria-label="Search"
            class="cursor-pointer"
            @click="openSearchModal"
          >
            <Search class="w-5 h-5 object-contain" />
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 shrink-0 pl-4">
          <template v-if="!token">
            <RouterLink
              :to="{ name: 'login' }"
              class="text-sm font-semibold px-3 py-1.5 rounded-lg login-glass transition-all duration-150"
            >
              Log in
            </RouterLink>
            <RouterLink
              :to="{ name: 'signup' }"
              class="text-sm font-bold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 px-4 py-2 rounded-lg transition-colors duration-150"
            >
              Get Started
            </RouterLink>
          </template>

          <template v-if="token">
            <HeaderProfile />
            <span class="relative inline-flex">
              <span class="absolute inset-0 rounded-lg bg-brand-bright opacity-75 animate-ping pointer-events-none"></span>
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
      <NavLinks v-if="!hideNavLinks" class="border-t border-border/50" />
    </div>

    <!-- ========== MOBILE ========== -->
    <div class="flex lg:hidden px-3 py-2 items-center justify-between">
      <!-- Left: Menu + Logo -->
      <div class="flex items-center gap-1.5">
        <TheLogo />
      </div>

      <div></div>

      <!-- Right: Auth -->
      <div class="flex items-center gap-1.5">
        <template v-if="!token">
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm font-semibold px-3 py-1.5 rounded-lg login-glass transition-all duration-150"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            class="text-sm font-semibold text-brand-forest bg-brand-bright hover:bg-brand-bright/90 rounded-lg px-4 py-1.5 transition-colors duration-150"
          >
            Join
          </RouterLink>
        </template>

        <template v-if="token">
          <HeaderProfile />
          <span class="relative inline-flex">
            <span class="absolute inset-0 rounded-lg bg-brand-bright opacity-75 animate-ping pointer-events-none"></span>
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
.login-glass {
  background: oklch(0% 0 0 / 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid oklch(0% 0 0 / 0.08);
  color: oklch(25% 0.02 258);
  box-shadow: 0 1px 3px oklch(0% 0 0 / 0.04), inset 0 1px 0 oklch(100% 0 0 / 0.5);
}
.login-glass:hover {
  background: oklch(0% 0 0 / 0.07);
  border-color: oklch(0% 0 0 / 0.12);
  box-shadow: 0 2px 6px oklch(0% 0 0 / 0.06), inset 0 1px 0 oklch(100% 0 0 / 0.5);
}

[data-theme="dark"] .login-glass {
  background: oklch(100% 0 0 / 0.06);
  border-color: oklch(100% 0 0 / 0.1);
  color: oklch(90% 0.005 258);
  box-shadow: 0 1px 3px oklch(0% 0 0 / 0.2), inset 0 1px 0 oklch(100% 0 0 / 0.08);
}
[data-theme="dark"] .login-glass:hover {
  background: oklch(100% 0 0 / 0.1);
  border-color: oklch(100% 0 0 / 0.15);
  box-shadow: 0 2px 6px oklch(0% 0 0 / 0.3), inset 0 1px 0 oklch(100% 0 0 / 0.1);
}
</style>
