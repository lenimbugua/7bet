<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div
    class="bg-white text-primary-foreground dark:bg-background dark:text-white min-h-dvh py-10"
  >
    <div class="max-w-5xl mx-auto px-4 space-y-10">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-3xl md:text-5xl font-bold">
          🏆 7bet One Cut -
          <span class="text-gold-bright">Miss One, Still Win Cash Back!</span>
        </h1>
        <p class="text-lg md:text-xl font-medium text-brand-dark">
          Revolutionary Multibet Protection - Real Cash, Real Peace of Mind
        </p>
      </div>

      <!-- Intro -->
      <div class="bg-gray-50 dark:bg-surface-sunken rounded-2xl p-6 shadow-sm">
        <p class="leading-relaxed">
          Experience smarter betting with
          <strong>7bet One Cut!</strong> Even the best bettors can have one
          selection let them down. That’s why we created the ultimate safety net
          – when your multibet falls short by just one game, you still win
          <span class="font-bold text-gold-bright">real cash back</span>.
        </p>
        <p class="mt-4 font-semibold">
          🎯 Unlike other platforms, 7bet One Cut gives you cash you can
          withdraw immediately – no restrictions.
        </p>
      </div>

      <!-- How It Works -->
      <section>
        <h2 class="text-2xl font-bold mb-4">How 7bet One Cut Works</h2>
        <div class="grid md:grid-cols-5 gap-4">
          <div
            class="bg-gray-50 dark:bg-surface-sunken p-4 rounded-xl shadow-sm text-center"
          >
            <p class="font-semibold">⚡ Build Your Multibet</p>
            <p class="text-sm">6+ games across any sports</p>
          </div>
          <div
            class="bg-gray-50 dark:bg-surface-sunken p-4 rounded-xl shadow-sm text-center"
          >
            <p class="font-semibold">📏 Meet the Minimums</p>
            <p class="text-sm">Stake UGX 50+, odds ≥ 1.2</p>
          </div>
          <div
            class="bg-gray-50 dark:bg-surface-sunken p-4 rounded-xl shadow-sm text-center"
          >
            <p class="font-semibold">🎫 Place Your Bet</p>
            <p class="text-sm">Standard placement</p>
          </div>
          <div
            class="bg-gray-50 dark:bg-surface-sunken p-4 rounded-xl shadow-sm text-center"
          >
            <p class="font-semibold">🛡️ Protection Activates</p>
            <p class="text-sm">If exactly 1 loses</p>
          </div>
          <div
            class="bg-gray-50 dark:bg-surface-sunken p-4 rounded-xl shadow-sm text-center"
          >
            <p class="font-semibold">💰 Instant Cashback</p>
            <p class="text-sm">50% credited instantly</p>
          </div>
        </div>
      </section>

      <!-- Cashback Scenarios -->
      <section>
        <h2 class="text-2xl font-bold mb-4">📊 Cashback Scenarios</h2>
        <div class="bg-gray-50 dark:bg-surface-sunken rounded-2xl p-6 shadow-sm">
          <ul class="space-y-2">
            <li>
              ✅ All selections win:
              <span class="font-bold">Full payout</span>
            </li>
            <li>
              ✅ Exactly 1 selection loses:
              <span class="font-bold text-gold-bright">50% cashback</span>
            </li>
            <li>❌ 2+ selections lose: <span>No cashback</span></li>
          </ul>
        </div>
      </section>

      <!-- Why It Stands Apart -->
      <section>
        <h2 class="text-2xl font-bold mb-4">
          🌟 Why 7bet One Cut Stands Apart
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm">
            <h3 class="font-semibold mb-2">✅ Real Cash Protection</h3>
            <p>No bonus terms, withdraw instantly.</p>
          </div>
          <div class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm">
            <h3 class="font-semibold mb-2">✅ Fair & Accessible</h3>
            <p>Stake from UGX 50, odds ≥ 1.2, cashback up to 10K.</p>
          </div>
          <div class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm">
            <h3 class="font-semibold mb-2">✅ Automatic & Instant</h3>
            <p>System detects qualifying bets, cash credited fast.</p>
          </div>
          <div class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm">
            <h3 class="font-semibold mb-2">✅ Complete Flexibility</h3>
            <p>Mix any sports, markets, pre-match bets worldwide.</p>
          </div>
        </div>
      </section>

      <!-- Supported Sports -->
      <section>
        <h2 class="text-2xl font-bold mb-4">🏈 Eligible Sports & Markets</h2>
        <div
          class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm space-y-4"
        >
          <p>
            <strong>Sports:</strong> Football, Basketball, Tennis, Cricket,
            Rugby, Boxing/MMA
          </p>
          <p>
            <strong>Markets:</strong> 1X2, Over/Under, BTTS, Handicap, Player
            Performance, Correct Score (≥1.2 odds)
          </p>
        </div>
      </section>

      <!-- Terms & Conditions -->
      <section>
        <h2 class="text-2xl font-bold mb-4">📋 Terms & Conditions</h2>
        <div
          class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm space-y-4 text-sm leading-relaxed"
        >
          <p>
            <strong>Eligibility:</strong> Registered customers only, 6+
            selections, odds ≥ 1.2, stake ≥ UGX 50, pre-match only.
          </p>
          <p>
            <strong>Cashback Rules:</strong> 50% of stake refunded if exactly 1
            loses (max 10K).
          </p>
          <p>
            <strong>Exclusions:</strong> Bonus/free bets, cashed-out bets, void
            selections, system bets, same-game multiples.
          </p>
          <p>
            <strong>General:</strong> 7bet may modify/terminate promo.
            Standard terms apply.
          </p>
        </div>
      </section>

      <!-- Quick Start Guide -->
      <section>
        <h2 class="text-2xl font-bold mb-4">🚀 Quick Start Guide</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <ul
            class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm space-y-2 list-disc list-inside"
          >
            <li>Log into 7bet</li>
            <li>Select matches & markets</li>
            <li>Add 6+ selections (odds ≥ 1.2)</li>
            <li>Confirm protection status</li>
            <li>Place bet (min UGX 50)</li>
            <li>Enjoy matches with peace of mind</li>
          </ul>
          <div class="bg-gray-50 dark:bg-surface-sunken p-6 rounded-2xl shadow-sm">
            <h3 class="font-semibold mb-2">💡 Pro Tips</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>Mix safe & risky picks</li>
              <li>Avoid all from same league</li>
              <li>Research form & news</li>
              <li>Stake smart, max cashback 10K</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="text-center py-10 bg-brand-dark text-white rounded-2xl shadow-lg"
      >
        <h2 class="text-3xl font-bold">🔥 Ready to Try One Cut Protection?</h2>
        <p class="mt-2">Join thousands of smart bettors today.</p>
        <div class="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <RouterLink
            :to="{ name: 'home' }"
            class="bg-gold-bright text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-sm hover:scale-105 transition"
          >
            Bet Now on Web
          </RouterLink>
        </div>
        <p class="mt-4">24/7 Support Always Available</p>
      </section>
    </div>
  </div>
</template>
