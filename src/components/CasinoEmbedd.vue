<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
import { useCasinoStore } from "../stores/casino";
import { useModalStore } from "@/stores/modal";
import { useLaunchCasinoGame } from "../composables/useLaunchCasinoGame";
import ErrorLaunchingGame from "./ErrorLaunchingGame.vue";

const { initGame } = useLaunchCasinoGame();
const { closeModal } = useModalStore();
const { launchData, responseOK, pending } = storeToRefs(useCasinoStore());

onMounted(() => {
  initGame();
});

onBeforeUnmount(() => {
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
  <!-- Loading state -->
  <div v-if="pending" class="game-loading">
    <div class="game-loading-inner">
      <div class="game-loader">
        <div class="game-loader-ring" />
        <div class="game-loader-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <span class="game-loading-text">Loading game</span>
      <div class="game-loading-dots">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
      </div>
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
/* ── Light mode (default) ── */
.game-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: oklch(96% 0.005 260);
}

.game-loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.game-loader {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-loader-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid oklch(0% 0 0 / 0.06);
  border-top-color: oklch(50% 0.18 145);
  animation: spin 0.9s linear infinite;
}

.game-loader-icon {
  color: oklch(50% 0.18 145);
  animation: pulse-icon 1.5s ease-in-out infinite;
}

.game-loading-text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: oklch(0% 0 0 / 0.45);
  letter-spacing: 0.02em;
}

.game-loading-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: oklch(50% 0.18 145 / 0.5);
  animation: bounce-dot 1.2s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

.game-viewport {
  width: 100%;
  height: 100%;
  max-width: 1680px;
  margin: 0 auto;
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse-icon {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

@keyframes bounce-dot {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-6px); opacity: 1; }
}

/* ── Dark mode ── */
[data-theme="dark"] .game-loading {
  background: oklch(10% 0.02 260);
}
[data-theme="dark"] .game-loader-ring {
  border-color: oklch(100% 0 0 / 0.04);
  border-top-color: oklch(65% 0.19 145);
}
[data-theme="dark"] .game-loader-icon {
  color: oklch(70% 0.19 145);
}
[data-theme="dark"] .game-loading-text {
  color: oklch(100% 0 0 / 0.45);
}
[data-theme="dark"] .dot {
  background: oklch(65% 0.19 145 / 0.6);
}
</style>
