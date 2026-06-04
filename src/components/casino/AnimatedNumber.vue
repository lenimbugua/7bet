<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  // Target value to count up to
  value: { type: Number, required: true },
  // Animation length in ms
  duration: { type: Number, default: 1600 },
  // Optional formatter (e.g. the parent's formatAmount); falls back to locale string
  formatter: { type: Function, default: null },
  // Replay the count-up on a loop
  loop: { type: Boolean, default: true },
  // How long (ms) to hold the final value before counting up again
  pause: { type: Number, default: 3500 },
});

const display = ref(0);
let rafId = null;
let pauseTimer = null;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function clearTimers() {
  cancelAnimationFrame(rafId);
  clearTimeout(pauseTimer);
}

// Count up from 0 to the target, hold, then (if looping) repeat
function runCycle() {
  clearTimers();
  const to = props.value;
  const from = 0;
  display.value = 0;
  let startTime = null;

  const step = (ts) => {
    if (startTime === null) startTime = ts;
    const progress = Math.min((ts - startTime) / props.duration, 1);
    display.value = from + (to - from) * easeOutCubic(progress);
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      display.value = to;
      if (props.loop) {
        pauseTimer = setTimeout(runCycle, props.pause);
      }
    }
  };

  rafId = requestAnimationFrame(step);
}

const formatted = computed(() =>
  props.formatter
    ? props.formatter(display.value)
    : Math.round(display.value).toLocaleString()
);

onMounted(runCycle);
watch(() => props.value, runCycle);
onUnmounted(clearTimers);
</script>

<template>
  <span>{{ formatted }}</span>
</template>
