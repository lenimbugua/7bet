<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useCasinoStore } from "@/stores/casino";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { setAfterLoginAction } = useLoginStore();
const { isAuthenticated } = storeToRefs(useLoginStore());
const { deposit, login } = useModalTypes();
const { openModal } = useModalStore();

const casinoStore = useCasinoStore();
const { gameNameToLaunch, gameProviderToLaunch } = storeToRefs(casinoStore);

// If the store game name doesn't match the current URL slug, clear stale data
onMounted(() => {
  const urlSlug = route.params.name;
  if (urlSlug && gameNameToLaunch.value) {
    const storeSlug = gameNameToLaunch.value.toLowerCase().replace(/\s+/g, "-");
    if (storeSlug !== urlSlug.toLowerCase()) {
      casinoStore.setLaunchGameMeta(null, null);
    }
  }
});

function formatSlugToName(slug) {
  if (!slug) return "Casino Game";
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const gameName = computed(() => {
  if (gameNameToLaunch.value) return gameNameToLaunch.value;
  return formatSlugToName(route.params.name);
});

const providerName = computed(() => gameProviderToLaunch.value || "");

function handleDeposit() {
  if (!isAuthenticated.value) {
    setAfterLoginAction(openModal(deposit));
    openModal(login);
    return;
  }
  openModal(deposit);
}
</script>

<template>
  <div class="casino-header">
    <div class="casino-header-inner">
      <!-- Back button -->
      <button aria-label="Go back" class="header-btn bg-white/15 dark:bg-black/15" @click="$router.go(-1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="header-icon"
        >
          <path
            fill-rule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Center: Game name + provider -->
      <div class="header-center">
        <div v-if="gameName" class="game-info">
          <span class="game-title">{{ gameName }}</span>
          <span v-if="providerName" class="game-provider">{{
            providerName
          }}</span>
        </div>
      </div>

      <!-- Right: Deposit button -->
      <button class="deposit-btn" @click="handleDeposit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="deposit-icon"
        >
          <path
            fill-rule="evenodd"
            d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
            clip-rule="evenodd"
          />
        </svg>
        Deposit
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Light mode (default) ── */
.casino-header {
  background: oklch(18% 0.04 258);
  border-bottom: none;
}

.casino-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1680px;
  margin: 0 auto;
  height: 44px;
  padding: 0 10px;
  gap: 8px;
}

.header-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: oklch(100% 0 0 / 0.6);
  background: oklch(100% 0 0 / 0.06);
  border: 1px solid oklch(100% 0 0 / 0.06);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.header-btn:hover {
  color: white;
  background: oklch(100% 0 0 / 0.1);
}

.header-icon {
  width: 18px;
  height: 18px;
}

.header-center {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.game-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 0;
}

.game-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
  letter-spacing: 0.01em;
  line-height: 1.2;
}

.game-provider {
  font-size: 0.55rem;
  font-weight: 500;
  color: oklch(100% 0 0 / 0.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.2;
}

.deposit-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: oklch(18% 0.04 145);
  background: var(--brand-bright);
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.deposit-btn:hover {
  opacity: 0.9;
}

.deposit-btn:active {
  transform: scale(0.97);
}

.deposit-icon {
  width: 13px;
  height: 13px;
}
</style>
