<script setup>
import TheCasino from "../components/TheCasino.vue";
</script>
<template>
  <div class="w-full h-full max-w-6xl sm:px-3 mx-auto overflow-scroll">
    <div class="flex w-full px-3 lg:px-0 lg:pt-3">
      <div class="w-full">
        <div class="md:hidden w-full overflow-x-scroll py-3">
          <MainCategories />
          <div
            class="w-full flex items-center justify-between h-full cursor-pointer pt-3"
          >
            <button aria-label="Go back" class="cursor-pointer" @click="$router.go(-1)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="size-6 stroke-2 text-gray-900 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1 class="font-black text-xl dark:text-gray-50 leading-none">
              POPULAR GAMES
            </h1>
            <div></div>
          </div>
        </div>
        <!-- <h1
          class="font-bold text-xl flex justify-center w-full text-center sm:text-left text-gray-950 dark:text-white mt-4"
        >
          POPULAR GAMES
        </h1> -->
        <div class="flex w-full justify-center space-x-3">
          <CasinoTabs />
        </div>
        <div class="pb-4">
          <TheCasino />
          <!-- <TheCrash2 :games="games" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
