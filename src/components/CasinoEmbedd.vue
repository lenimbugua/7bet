<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useCasinoStore } from "../stores/casino";
import { useModalStore } from "@/stores/modal";
import { useLaunchCasinoGame } from "../composables/useLaunchCasinoGame";
import ErrorLaunchingGame from "./ErrorLaunchingGame.vue";

const { initGame } = useLaunchCasinoGame();
const { closeModal } = useModalStore();
const { launchData, responseOK, pending, gameNameToLaunch, gameProviderToLaunch, gameImageToLaunch } =
  storeToRefs(useCasinoStore());

// Cover art can fail to load (stale URL, blocked host). Fall back to the emblem.
const artFailed = ref(false);

// Rotating anticipation copy — keeps the wait alive while the game spins up.
const phrases = [
  "Setting the table",
  "Stacking the chips",
  "Spinning up the reels",
  "Almost there",
];
const phraseIndex = ref(0);
let phraseTimer = null;

onMounted(() => {
  initGame();
  phraseTimer = setInterval(() => {
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length;
  }, 1500);
});

onBeforeUnmount(() => {
  clearInterval(phraseTimer);
  closeModal();
});

function addStyleToLaunchData(launchData) {
  return (
    launchData.launchBody +
    "<style>body{margin:0;background:#0d0d1a;}#egamings_container{height:100dvh;width:100vw;overflow:scroll;}</style>"
  );
}
</script>

<template>
  <!-- Loading state — the curtain before the game -->
  <div v-if="pending" class="stage">
    <!-- ambient spotlight + drifting sparks -->
    <div class="stage-glow" aria-hidden="true" />
    <div class="stage-sparks" aria-hidden="true">
      <span v-for="n in 7" :key="n" class="spark" :style="{ '--i': n }" />
    </div>

    <div class="stage-content">
      <!-- Cover art (or branded emblem) under a rotating halo + sweeping shine -->
      <div class="art-wrap">
        <div class="art-halo" aria-hidden="true" />
        <div class="art-frame">
          <img
            v-if="gameImageToLaunch && !artFailed"
            :src="gameImageToLaunch"
            :alt="gameNameToLaunch || 'Game'"
            class="art-img"
            @error="artFailed = true"
          />
          <div v-else class="art-emblem" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
              <path d="M12 2.5c-.4 0-.78.2-1 .55C9.3 5.6 4.5 8.9 4.5 13.1a7.5 7.5 0 0 0 4.6 6.93c.6.26 1.2-.27 1.05-.9l-.5-2.1a2.5 2.5 0 1 1 4.7 0l-.5 2.1c-.15.63.45 1.16 1.05.9a7.5 7.5 0 0 0 4.6-6.93c0-4.2-4.8-7.5-6.5-10.05a1.2 1.2 0 0 0-1-.55Z" />
            </svg>
          </div>
          <div class="art-shine" aria-hidden="true" />
        </div>
      </div>

      <!-- Title -->
      <div class="meta">
        <p v-if="gameProviderToLaunch" class="meta-provider">{{ gameProviderToLaunch }}</p>
        <h2 class="meta-name">{{ gameNameToLaunch || "Loading game" }}</h2>
      </div>

      <!-- Charged progress + rotating status -->
      <div class="loader-bar" aria-hidden="true">
        <span class="loader-bar-fill" />
      </div>
      <transition name="status" mode="out-in">
        <span :key="phraseIndex" class="status-text">{{ phrases[phraseIndex] }}</span>
      </transition>
    </div>
  </div>

  <!-- Error state -->
  <div v-else-if="!responseOK" class="w-full h-full">
    <ErrorLaunchingGame />
  </div>

  <!-- Game iframe -->
  <div v-else class="game-viewport">
    <iframe
      v-if="launchData"
      class="game-iframe"
      :srcdoc="addStyleToLaunchData(launchData)"
      allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
/* ── The stage: a dark cinema curtain that bridges into the game (bg #0d0d1a) ── */
.stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 50% 38%, oklch(17% 0.04 262) 0%, oklch(11% 0.03 264) 55%, oklch(8% 0.02 266) 100%);
  animation: stage-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* breathing brand-green spotlight behind the art */
.stage-glow {
  position: absolute;
  top: 34%;
  left: 50%;
  width: min(520px, 90vw);
  height: min(520px, 90vw);
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, oklch(82% 0.22 145 / 0.22) 0%, oklch(70% 0.2 150 / 0.08) 38%, transparent 68%);
  filter: blur(6px);
  animation: glow-breathe 3.6s ease-in-out infinite;
  pointer-events: none;
}

/* drifting sparks */
.stage-sparks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.spark {
  position: absolute;
  bottom: -8px;
  left: calc(50% + (var(--i) - 4) * clamp(26px, 7vw, 52px));
  width: 3px;
  height: 3px;
  border-radius: 9999px;
  background: oklch(88% 0.2 145);
  box-shadow: 0 0 6px oklch(85% 0.22 145 / 0.9);
  opacity: 0;
  animation: spark-rise 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: calc(var(--i) * 0.42s);
}

.stage-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 24px;
}

/* ── Cover art ── */
.art-wrap {
  position: relative;
  display: grid;
  place-items: center;
  animation: art-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* rotating conic halo — the "charging" energy */
.art-halo {
  position: absolute;
  width: calc(100% + 26px);
  height: calc(100% + 26px);
  border-radius: 22px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    oklch(85% 0.24 145 / 0.85) 60deg,
    transparent 150deg,
    transparent 360deg
  );
  filter: blur(7px);
  opacity: 0.7;
  animation: halo-spin 2.4s linear infinite;
}

.art-frame {
  position: relative;
  width: clamp(124px, 34vw, 168px);
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
  background: oklch(16% 0.03 264);
  border: 1px solid oklch(100% 0 0 / 0.1);
  box-shadow:
    0 18px 50px oklch(0% 0 0 / 0.55),
    0 0 0 1px oklch(85% 0.22 145 / 0.18),
    inset 0 1px 0 oklch(100% 0 0 / 0.08);
}

.art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: art-kenburns 6s ease-out both;
}

.art-emblem {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: oklch(82% 0.22 145);
  background: radial-gradient(circle at 50% 42%, oklch(22% 0.05 262) 0%, oklch(14% 0.03 264) 100%);
  animation: emblem-pulse 1.8s ease-in-out infinite;
}

/* diagonal light sweeping across the art */
.art-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 30%,
    oklch(100% 0 0 / 0.32) 47%,
    oklch(100% 0 0 / 0.06) 54%,
    transparent 64%
  );
  transform: translateX(-120%);
  animation: shine 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* ── Title ── */
.meta {
  text-align: center;
  animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}
.meta-provider {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: oklch(82% 0.18 145);
  margin-bottom: 4px;
}
.meta-name {
  font-size: clamp(1.05rem, 4.4vw, 1.4rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: oklch(97% 0.005 260);
  line-height: 1.15;
  max-width: 18ch;
}

/* ── Progress + status ── */
.loader-bar {
  position: relative;
  width: clamp(140px, 44vw, 200px);
  height: 3px;
  border-radius: 9999px;
  overflow: hidden;
  background: oklch(100% 0 0 / 0.08);
  animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both;
}
.loader-bar-fill {
  position: absolute;
  inset: 0;
  width: 42%;
  border-radius: 9999px;
  background: linear-gradient(90deg, transparent, oklch(86% 0.24 145), oklch(78% 0.21 150));
  box-shadow: 0 0 12px oklch(85% 0.22 145 / 0.7);
  animation: bar-travel 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.status-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: oklch(72% 0.02 260);
}
.status-enter-active,
.status-leave-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.status-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.status-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Game viewport ── */
.game-viewport {
  width: 100%;
  height: 100%;
  max-width: 1680px;
  margin: 0 auto;
  animation: viewport-in 0.4s ease both;
}
.game-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* ── Keyframes ── */
@keyframes stage-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes glow-breathe {
  0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
}
@keyframes spark-rise {
  0% { opacity: 0; transform: translateY(0) scale(0.6); }
  18% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-220px) scale(1); }
}
@keyframes halo-spin {
  to { transform: rotate(360deg); }
}
@keyframes shine {
  0% { transform: translateX(-120%); }
  55%, 100% { transform: translateX(120%); }
}
@keyframes art-kenburns {
  from { transform: scale(1.06); }
  to { transform: scale(1); }
}
@keyframes emblem-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.06); }
}
@keyframes bar-travel {
  0% { transform: translateX(-110%); }
  100% { transform: translateX(340%); }
}
@keyframes art-pop {
  from { opacity: 0; transform: scale(0.92) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes viewport-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Reduced motion: keep it calm but still clearly "loading" ── */
@media (prefers-reduced-motion: reduce) {
  .stage-glow,
  .art-halo,
  .art-shine,
  .art-img,
  .spark,
  .art-emblem,
  .stage,
  .art-wrap,
  .meta,
  .loader-bar {
    animation: none;
  }
  .stage-sparks { display: none; }
  .loader-bar-fill {
    animation: bar-travel 1.6s ease-in-out infinite;
  }
}
</style>
