<script setup>
import { useCasino } from "@/composables/useCasino";
import { usePromos } from "@/composables/usePromos";
import { usePromoStore } from "@/stores/promos";
import formatStuff from "@/utilities/format-stuff";
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { selectedPromo } = toRefs(usePromoStore());

const { launchCasino } = useCasino();

const { formCloudflareImage } = formatStuff();

const { promos, aviatorPromo } = usePromos();

function getPromoImageByName() {
  const promo = promos.find((p) => p.name === aviatorPromo);
  return promo ? promo.img : null;
}

function goToRoute() {
  if (selectedPromo.value.game_id.Valid) {
    router.push({ name: selectedPromo.value.app_route_name });
    return;
  }
  launchCasino(
    selectedPromo.value.game_id.String,
    selectedPromo.value.game_name.String
  );
}
</script>

<template>
  <div class="min-h-dvh font-sans">
    <div
      class="bg-white dark:bg-background text-primary-foreground dark:text-white transition-colors duration-300"
    >
      <div class="relative aspect-video h-42 sm:h-104 w-full my-4">
        <RouterLink :to="{ name: 'aviator' }">
          <img
            class="absolute top-0 w-full h-full right-0 left-0 bottom-0 object-contain md:object-cover"
            :src="formCloudflareImage(getPromoImageByName())"
            alt="Aviator free rains promotion"
            loading="lazy"
            @click="goToRoute"
          />
        </RouterLink>
      </div>

      <section
        class="w-full min-h-dvh bg-white dark:bg-background flex justify-center"
      >
        <div
          class="w-full bg-white dark:bg-background rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-6 space-y-6"
        >
          <!-- TITLE -->
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-extrabold text-red-600 dark:text-white">
              7BET AVIATOR – DAILY FREE BET RAINS
            </h1>
            <p class="text-gray-600 dark:text-gray-300">
              Win your share of over
              <span class="font-black text-xl text-amber-600"
                >UGX 200,000 in Free Bets every day!</span
              >
              with 7bet Aviator Free Bet Rains!
            </p>
          </div>

          <!-- HIGHLIGHT BOX -->
          <div
            class="p-4 rounded-xl bg-amber-600/10 border border-amber-600/30 text-center"
          >
            <p class="text-lg font-semibold text-primary-foreground dark:text-white">
              All Aviator players stand a chance to catch random Free Bet drops
              ranging from:
            </p>
            <p class="mt-1 font-bold text-amber-600">
              UGX 10, UGX 20, UGX 30, UGX 50, UGX 100, UGX 200, UGX 500, and UGX
              1000.
            </p>
          </div>

          <!-- HOW IT WORKS -->
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-primary-foreground dark:text-white">
              HOW THE PROMO WORKS
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              Throughout the day, Free Bet Rains will appear randomly in the
              Aviator chat section.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              When a Rain pops up, the fastest players to hit CLAIM instantly
              receive the free bet amount.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              To qualify, a player must be actively playing 7bet Aviator and
              meet the requirements for each Free Bet value.
            </p>
          </div>

          <!-- CATEGORY CARDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- CARD -->
            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <div class="font-bold text-amber-500">
                1. UGX 10 FREE BET RAIN (100 drops/day)
              </div>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 10
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 10
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <p class="font-bold text-amber-600">
                2. UGX 20 FREE BET RAIN (90 drops/day)
              </p>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 20
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 20
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <div class="font-bold text-amber-600">
                3. UGX 30 FREE BET RAIN (80 drops/day)
              </div>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 30
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 30
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <div class="font-bold text-amber-600">
                4. UGX 50 FREE BET RAIN (60 drops/day)
              </div>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 50
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 50
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <p class="font-bold text-amber-600">
                5. UGX 100 FREE BET RAIN (40 drops/day)
              </p>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 100
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 100
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <p class="font-bold text-amber-600">
                6. UGX 200 FREE BET RAIN (80 drops/day)
              </p>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 200
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 200
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 5 minutes
                </li>
              </ul>
            </div>

            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <p class="font-bold text-amber-600">
                7. UGX 500 FREE BET RAIN (20 drops/day)
              </p>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 500
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 500
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 10 minutes
                </li>
              </ul>
            </div>
            <div
              class="p-4 rounded-xl bg-white dark:bg-background border border-gray-200 dark:border-white/10 space-y-2"
            >
              <p class="font-bold text-amber-600">
                8. UGX 1000 FREE BET RAIN (20 drops/day)
              </p>
              <ul class="list-disc pl-6">
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum account balance: UGX 1000
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Minimum stake played: UGX 1000
                </li>
                <li class="text-sm text-gray-700 dark:text-gray-300">
                  Must have placed a bet in the last 10 minutes
                </li>
              </ul>
            </div>
          </div>

          <!-- TERMS -->
          <div class="space-y-2 text-gray-700 dark:text-gray-300">
            <h3 class="text-xl font-extrabold text-red-600 dark:text-white">
              Terms and Conditions
            </h3>
            <ul class="list-disc pl-6">
              <li>You can claim once per Rain event.</li>
              <li>Free Bet values range from UGX 10–200.</li>
              <li>Minimum cashout multiplier: 1.50x.</li>
              <li>Free Bets are credited instantly and expire in 24 hours.</li>
              <li>Must claim within 180 minutes after the Rain appears.</li>
              <li>
                Cashout winnings = (freebet stake × cashout multiplier) –
                freebet stake.
              </li>
              <li>
                System errors or suspicious activity may lead to voided
                winnings.
              </li>
              <li>
                Promotion availability may vary, and terms may change as needed.
              </li>
              <li>Standard 7bet Aviator Terms & Conditions apply.</li>
            </ul>
          </div>

          <!-- CTA -->
          <div class="text-center">
            <RouterLink
              :to="{ name: 'aviator' }"
              class="px-6 py-3 font-bold rounded-xl bg-brand-bright text-white hover:opacity-90 transition"
            >
              READY TO PLAY? CLAIM NOW
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
