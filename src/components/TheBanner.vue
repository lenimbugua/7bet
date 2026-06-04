<script setup>
import { crashGamesRouteName, useCasino } from "@/composables/useCasino";
import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "@/utilities/format-stuff";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useCasinoStore } from "../stores/casino";

const { launchCasino } = useCasino();

const { formCloudflareImage } = formatStuff();

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();
const router = useRouter();

const modules = [];

const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
const depositId = 1000;
const homeId = 100001777;
const affiliateId = 1000014;
const leaderboardId = 1000015;
const liveBetId = 1000016;
const redBarronId = 1000017;
const oneCutId = 1000018;

let items = [
  {
    name: "100% Bonus",
    id: depositId,
    image: "6f1180d7-1fef-49bc-029a-91377d293f00",
    routeName: "",
  },
  {
    name: "2 Up",
    id: homeId,
    image: "14dd1e57-99b4-436b-b1ed-45a3b5f13600",
    routeName: "",
  },
  {
    name: "Aviator Cashback",
    id: aviatorGameId,
    image: "e638e866-4d7d-4cec-aa02-62ad80334700",
    routeName: crashGamesRouteName,
  },
  {
    name: "Cashout",
    id: homeId,
    image: "daec1adf-ef1a-4de7-8869-555a6c834600",
    routeName: "",
  },
  {
    name: "Deposit bila tax",
    id: depositId,
    image: "02f31816-95f6-449f-1984-5abb855c2a00",
    routeName: "",
  },
  {
    name: "Refer and Earn",
    id: affiliateId,
    image: "3a5c088d-c397-4cbb-0974-c7965a51b900",
    routeName: "",
  },
  {
    name: "Red Barron",
    id: redBarronId,
    image: "ea1d6f5c-0d5f-437c-ed2e-02318b031900",
    routeName: crashGamesRouteName,
  },
  {
    name: "Live Bet",
    id: liveBetId,
    image: "ff56e597-aec5-40ca-5d6e-106ec367b900",
    routeName: "",
  },
  {
    name: "Leaderboard",
    id: leaderboardId,
    image: "e833c717-fbfe-49e2-daf7-688c0681ff00",
    routeName: "",
  },
  {
    name: "Karibu Bonus Aviator",
    id: aviatorGameId,
    image: "077b46dd-3233-49db-11a8-40b945e1e400",
    routeName: crashGamesRouteName,
  },
  {
    name: "Aviator Freebet",
    id: aviatorGameId,
    image: "28e3760a-4810-45a4-6f42-879f39744b00",
    routeName: crashGamesRouteName,
  },
  {
    name: "Affiliate",
    id: affiliateId,
    image: "ae03187e-682e-48a4-9c85-6a8f6ea99400",
    routeName: "",
  },
  {
    name: "Deposit Bonus",
    id: depositId,
    image: "7fad299a-e610-43d1-6f64-385f88a1b700",
    routeName: "",
  },
  {
    name: "One Cut",
    id: oneCutId,
    image: "4b1550b7-24fd-49b2-ae55-bb440bc59400",
    routeName: crashGamesRouteName,
  },
  {
    name: "Chagua Bonus Yako",
    id: depositId,
    image: "97438509-2554-4c84-ee65-08ed146edc00",
    routeName: "",
  },
];

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchGame(gameId, gameName, routeName) {
  if (gameId === affiliateId) {
    router.push({ name: "join-affiliate" });
    return;
  }
  if (gameId === homeId) {
    goToSports();
    return;
  }
  if (gameId === depositId) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameId === leaderboardId) {
    router.push({ name: "leaderboard" });
    return;
  }
  if (gameId === liveBetId) {
    router.push({ name: "live", params: { sport: "soccer" } });
    return;
  }
  if (gameId === redBarronId || gameId === oneCutId) {
    setLaunchGameId(gameId);
    launchCasino(gameId, gameName, routeName);
    return;
  }

  setLaunchGameId(gameId);
  launchCasino(gameId, gameName, routeName);
}

const autoplayDelay = 8000;
const swiperInstance = ref(null);
const activeSegment = ref(0);
const currentSlidesPerView = computed(() => swiperInstance.value?.params?.slidesPerView ?? 1);
const totalSegments = computed(() => Math.ceil(items.length / currentSlidesPerView.value));
let autoplayTimer = null;

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    if (!swiperInstance.value) return;
    const nextSegment = (activeSegment.value + 1) % totalSegments.value;
    swiperInstance.value.slideTo(nextSegment * currentSlidesPerView.value);
  }, autoplayDelay);
};

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
  startAutoplay();
};

const onSlideChange = (swiper) => {
  swiperInstance.value = swiper;
  activeSegment.value = Math.floor(swiper.activeIndex / currentSlidesPerView.value);
};

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="w-full">
    <!-- Banner carousel -->
    <div class="relative w-full h-[116px] overflow-hidden">
      <swiper
        :slides-per-view="1"
        :slides-per-group="1"
        :space-between="12"
        :centered-slides="false"
        :navigation="false"
        :modules="modules"
        :breakpoints="{ 1280: { slidesPerView: 2, slidesPerGroup: 2 } }"
        class="h-full"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.image"
        >
          <div
            class="relative h-full rounded-xl overflow-hidden group cursor-pointer ring-1 ring-gray-200/80 dark:ring-white/10"
            @click="launchGame(item.id, item.name, item.routeName)"
          >
            <img
              :src="formCloudflareImage(item.image)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="item.name + ' game banner'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
