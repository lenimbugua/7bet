<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";
import { useLoginStore } from "@/stores/login";

const isDark = useDark();
const router = useRouter();
const loginStore = useLoginStore();
const { token } = storeToRefs(loginStore);

function handleLogout() {
  loginStore.logout();
  router.push({ name: "home" });
}
</script>

<template>
  <!-- Settings: Theme + Logout (mirrors landing sidebar footer) -->
  <div class="rounded-xl bg-background border border-gray-200/80 dark:border-white/[0.06] shadow-sm dark:shadow-none overflow-hidden">
    <div class="flex items-center justify-between px-3.5 py-2.5">
      <!-- Theme toggle pill -->
      <button
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground hover:border-gray-300 dark:hover:border-white/20 transition-all"
        @click="isDark = !isDark"
      >
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-amber-400">
          <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
          <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd" />
        </svg>
        <span>{{ isDark ? 'Dark' : 'Light' }}</span>
      </button>

      <!-- Logout -->
      <button
        v-if="token"
        class="flex items-center gap-1.5 text-[0.7rem] font-medium text-red-500/80 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400 transition-colors cursor-pointer"
        @click="handleLogout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>
