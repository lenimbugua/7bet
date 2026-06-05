<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

// Placeholder high-rollers feed until a real endpoint is wired in.
const rollers = ref([
  { name: "cas*****16", amount: 3521829, seed: "Aria" },
  { name: "ngo*******88", amount: 3506289, seed: "Mila" },
  { name: "pes*****92", amount: 3510012, seed: "Leo" },
  { name: "ale****96", amount: 3448834, seed: "Zoe" },
  { name: "des******26", amount: 2553326, seed: "Kai" },
  { name: "bib*****45", amount: 3503470, seed: "Finn" },
  { name: "kid*****33", amount: 2553007, seed: "Max" },
  { name: "ges******16", amount: 2553884, seed: "Nova" },
  { name: "cal*****10", amount: 2545168, seed: "Ivy" },
  { name: "jor******71", amount: 2540991, seed: "Theo" },
]);

const avatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

const formatAmount = (n) => n.toLocaleString("en-US");

// Live clock + light "feed" movement so the panel feels real.
const now = ref("");
const pad = (v) => String(v).padStart(2, "0");
const tick = () => {
  const d = new Date();
  now.value = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
    d.getSeconds()
  )}`;
};

let clockId;
let bumpId;
onMounted(() => {
  tick();
  clockId = setInterval(tick, 1000);
  bumpId = setInterval(() => {
    const i = Math.floor(Math.random() * rollers.value.length);
    rollers.value[i] = {
      ...rollers.value[i],
      amount: rollers.value[i].amount + Math.floor(Math.random() * 5000),
    };
  }, 4000);
});
onBeforeUnmount(() => {
  clearInterval(clockId);
  clearInterval(bumpId);
});
</script>

<template>
  <section
    class="rounded-2xl overflow-hidden bg-white dark:bg-card ring-1 ring-black/5 dark:ring-white/10"
  >
    <!-- Header (styled like the betslip header) -->
    <div
      class="relative z-10 flex items-center gap-2 px-3 py-2.5 border-b border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gold shrink-0">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
      </svg>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        High Rollers
      </h2>
    </div>

    <!-- Feed -->
    <ul class="space-y-2.5 p-3 sm:p-4">
      <li
        v-for="r in rollers"
        :key="r.name"
        class="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] ring-1 ring-black/5 dark:ring-white/5 px-3 py-2.5"
      >
        <img
          :src="avatarUrl(r.seed)"
          :alt="r.name"
          loading="lazy"
          class="w-10 h-10 rounded-full object-cover bg-gray-200 dark:bg-white/10 shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-foreground text-sm font-semibold truncate">
            {{ r.name }}
          </p>
          <p class="text-gold text-sm font-bold">
            {{ formatAmount(r.amount) }}
          </p>
        </div>
        <span class="text-muted-foreground text-xs shrink-0">{{ now }}</span>
      </li>
    </ul>
  </section>
</template>
