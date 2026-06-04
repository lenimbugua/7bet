<script setup>
import { usePromos } from "@/composables/usePromos";
import formatStuff from "@/utilities/format-stuff";
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import { RouterLink } from "vue-router";
import DepositBonusTable from "../DepositBonusTable.vue";

const { formCloudflareImage } = formatStuff();

const { promos, cashbackPromo } = usePromos();

function getPromoImageByName() {
  const promo = promos.find((p) => p.name === cashbackPromo);
  return promo ? promo.img : null;
}
</script>
<template>
  <div class="mb-4">
    <div class="flex items-center mt-4 space-x-2">
      <RouterLink :to="{ name: 'home' }">
        <ChevronLeftIcon class="h-7 w-7 cursor-pointer text-white" />
      </RouterLink>
      <h3 class="text-xl dark:text-gray-100">DEPOSIT BONUS</h3>
    </div>
    <div class="relative aspect-video h-42 sm:h-104 w-full my-4">
      <img
        class="absolute top-0 w-full h-full right-0 left-0 bottom-0 object-contain md:object-cover"
        :src="formCloudflareImage(getPromoImageByName())"
        alt="Deposit bonus promotion"
        loading="lazy"
      />
    </div>
    <div class="">
      <div class="dark:text-gray-400 leading-8">
        <h3 class="text-3xl dark:text-gray-100">
          First Deposit, First Bonus - Every Day! 7bet provides a daily
          bonus to customers
        </h3>
        <div class="py-2">
          7bet provides a daily bonus to customers for their first
          deposit(s) of the day. This bonus effectively refunds either the full
          or partial transaction charges, rewarding customers for their
          deposits. The bonus amount varies based on the deposit value, allowing
          users to benefit each day by simply making a deposit. 7bet’
          commitment to enhancing the betting experience means users can enjoy
          added value and reduced transaction costs with their daily deposits.
        </div>

        <!-- Main content -->
        <div class="space-y-8">
          <!-- How it works section -->
          <section>
            <div class="flex justify-between items-center my-3">
              <h2 class="text-2xl font-bold">HOW IT WORKS</h2>
              <!-- Deposit Now Button  -->
              <RouterLink
                :to="{ name: 'deposit' }"
                class="hidden md:flex items-center text-md justify-center gap-2 px-6 py-1 text-white font-semibold rounded-lg transform transition-all duration-200 shadow-lg hover:scale-105 active:scale-100"
                :class="
                  isDark
                    ? 'bg-red-500 hover:bg-red-400'
                    : 'bg-red-600 hover:bg-red-500'
                "
              >
                Deposit Now
              </RouterLink>
            </div>
            <!-- Bonus table -->
            <DepositBonusTable />
          </section>

          <!-- Terms and conditions section -->
          <DepositBonusTerms />
          <!-- Deposit Now Button  -->
          <RouterLink
            :to="{ name: 'deposit' }"
            class="flex items-center text-lg justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transform transition-all duration-200 shadow-lg hover:scale-105 active:scale-100"
            :class="
              isDark
                ? 'bg-red-500 hover:bg-red-400'
                : 'bg-red-600 hover:bg-red-500'
            "
          >
            Deposit Now
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
