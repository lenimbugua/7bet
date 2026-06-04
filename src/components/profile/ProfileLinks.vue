<script setup>
import { useSupport } from "@/composables/useSupport";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

import betsIcon from "@/assets/icons/bets.svg";
import promosIcon from "@/assets/icons/promos.svg";
import userIcon from "@/assets/icons/user.svg";
import supportIcon from "@/assets/icons/support.svg";

const router = useRouter();
const { logout } = useLoginStore();

const { openSupportModal } = useSupport();

const signOut = () => {
  router.push({ name: "home" });
  logout();
};
</script>

<template>
  <!-- Account & Activity -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Account & Activity</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'my-bets' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <img :src="betsIcon" alt="" class="w-5 h-5 object-contain" />
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">My Bets</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
      <RouterLink
        :to="{ name: 'sort-deposit' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-emerald-500">
              <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Sort Deposit (Jisort)</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Promotions & Rewards -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Promotions & Rewards</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'promotions' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
            <img :src="promosIcon" alt="" class="w-5 h-5 object-contain" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Promotions</span>
            <span class="px-1.5 py-0.5 rounded-md bg-brand-bright/10 text-[0.55rem] font-bold text-brand-bright uppercase">New</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
      <RouterLink
        :to="{ name: 'join-affiliate' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
            <img :src="userIcon" alt="" class="w-5 h-5 object-contain" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Join Affiliate</span>
            <span class="px-1.5 py-0.5 rounded-md bg-red-500/10 text-[0.55rem] font-bold text-red-500 uppercase">Hot</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Help & Support -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Help & Support</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'share-feedback' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-amber-500">
              <path d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM5.05 3.05a.75.75 0 0 1 1.06 0l1.062 1.06A.75.75 0 1 1 6.11 5.173L5.05 4.11a.75.75 0 0 1 0-1.06ZM14.95 3.05a.75.75 0 0 1 0 1.06l-1.06 1.062a.75.75 0 0 1-1.062-1.061l1.061-1.06a.75.75 0 0 1 1.06 0ZM3 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3 8ZM14 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 14 8ZM7.172 13.172a.75.75 0 0 1 1.06 0l1.768 1.768 1.768-1.768a.75.75 0 1 1 1.06 1.06l-2.297 2.298a.75.75 0 0 1-1.06 0l-2.299-2.298a.75.75 0 0 1 0-1.06Z" />
              <path d="M10 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Share Feedback</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
      <div
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors cursor-pointer"
        @click="openSupportModal"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
            <img :src="supportIcon" alt="" class="w-5 h-5 object-contain" />
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Chat with Support</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>

  <!-- More -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">More</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'self-exclusion' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gray-400 dark:text-white/40">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Self Exclusion</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Logout -->
  <button
    type="button"
    class="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-200/60 dark:border-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/10 text-[0.8rem] font-semibold text-red-500 dark:text-red-400 transition-all cursor-pointer"
    @click="signOut"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
      <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
      <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
    </svg>
    Sign Out
  </button>
</template>
