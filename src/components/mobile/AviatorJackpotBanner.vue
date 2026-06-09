<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const open = ref(false);

function toggle() {
  open.value = !open.value;
}

function play() {
  router.push({ name: "aviator" });
}

function learnMore() {
  router.push({ name: "aviator" });
}
</script>

<template>
  <section class="aviator-banner" :class="{ 'is-open': open }">
    <!-- Collapsed bar -->
    <button
      type="button"
      class="collapsed-bar"
      :aria-expanded="open"
      aria-label="Aviator Weekly UGX 300,000 cash jackpot"
      @click="toggle"
    >
      <span class="collapsed-text">
        <span class="label">Aviator Weekly</span>
        <span class="amount">UGX 300,000 CASH JACKPOT</span>
      </span>
      <svg
        class="chevron"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Expanded content -->
    <transition name="expand">
      <div v-if="open" class="expanded">
        <div class="expanded-inner">
          <p class="exp-label">Aviator Weekly</p>
          <p class="exp-amount">UGX 300,000 CASH JACKPOT</p>
          <div class="actions">
            <button type="button" class="learn-more" @click="learnMore">
              Learn more
            </button>
            <button type="button" class="play-now" @click="play">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.aviator-banner {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: oklch(22% 0.04 180);
  background-image: url("/aviator-jackpot.webp");
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
}

/* Darken so text stays legible over the artwork */
.aviator-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    oklch(20% 0.04 180 / 0.92) 0%,
    oklch(20% 0.04 180 / 0.6) 45%,
    oklch(20% 0.04 180 / 0.1) 70%,
    transparent 100%
  );
  pointer-events: none;
}

/* ── Collapsed bar ── */
.collapsed-bar {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  text-align: left;
  cursor: pointer;
}
.collapsed-text {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;
}
.collapsed-text .label {
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
}
.collapsed-text .amount {
  color: var(--gold-bright);
  font-size: 0.95rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chevron {
  flex-shrink: 0;
  width: 1.15rem;
  height: 1.15rem;
  color: white;
  transition: transform 0.25s ease;
}
.is-open .chevron {
  transform: rotate(180deg);
}

/* ── Expanded ── */
.expanded {
  position: relative;
  z-index: 1;
}
.expanded-inner {
  padding: 0 1rem 1.5rem;
  text-align: center;
}
.exp-label {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.exp-amount {
  color: var(--gold-bright);
  font-size: 1.6rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: 0.01em;
}
.actions {
  margin-top: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
}
.learn-more {
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.play-now {
  background: var(--gold-bright);
  color: oklch(20% 0.02 255);
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.55rem 1.4rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: filter 0.12s ease;
}
.play-now:hover {
  filter: brightness(1.05);
}

/* ── Expand transition ── */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .chevron,
  .expand-enter-active,
  .expand-leave-active {
    transition: none;
  }
}
</style>
