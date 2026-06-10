<script setup>
// CLONE of TheBanner.vue — tryout carousel. Slides do NOT point anywhere (no nav).
import formatStuff from "@/utilities/format-stuff";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { formCloudflareImage } = formatStuff();

const modules = [];

// New tryout slides — these do not point anywhere
let items = [
  {
    name: "Carousel 1",
    image: "352d000f-9a18-4420-f58f-113f671e3e00",
    routeName: "",
  },
  {
    name: "Carousel 2",
    image: "b184fd3d-316d-4d50-b692-8ff7025fc500",
    routeName: "",
  },
  {
    name: "Carousel 3",
    image: "6b93c423-7114-4724-5d83-8387824a8e00",
    routeName: "",
  },
  {
    name: "Carousel 4",
    image: "a42116ac-aac0-4bf9-1d9c-b02b5349e500",
    routeName: "",
  },
];

// Slides don't point anywhere — no-op
function launchGame() {}

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

/* Desktop (xl+) two-panel 3D flip carousel.
   Panels flip staggered: left first, right 3s later. Each steps by 2
   through the items (left = even slots, right = odd) so they never
   show the same image. */
const rightFlipOffset = 3000;
const leftIdx = ref(0);
const rightIdx = ref(1);
const leftItem = computed(() => items[leftIdx.value % items.length]);
const rightItem = computed(() => items[rightIdx.value % items.length]);

let flipTimer = null;
let rightFlipTimer = null;
const stopFlip = () => {
  clearInterval(flipTimer);
  flipTimer = null;
  clearTimeout(rightFlipTimer);
  rightFlipTimer = null;
};
const startFlip = () => {
  stopFlip();
  flipTimer = setInterval(() => {
    leftIdx.value = (leftIdx.value + 2) % items.length;
    rightFlipTimer = setTimeout(() => {
      rightIdx.value = (rightIdx.value + 2) % items.length;
    }, rightFlipOffset);
  }, autoplayDelay);
};

onMounted(startFlip);
onBeforeUnmount(stopFlip);
</script>

<template>
  <div class="w-full">
    <!-- Mobile / tablet: swiper carousel -->
    <div class="relative w-full overflow-hidden xl:hidden">
      <swiper
        :slides-per-view="1"
        :slides-per-group="1"
        :space-between="12"
        :centered-slides="false"
        :navigation="false"
        :modules="modules"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.image"
        >
          <div
            class="relative w-full aspect-[1366/331] overflow-hidden group cursor-pointer ring-1 ring-gray-200/80 dark:ring-white/10"
            @click="launchGame(item.id, item.name, item.routeName)"
          >
            <img
              :src="formCloudflareImage(item.image)"
              class="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="item.name + ' game banner'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Desktop: two 3D-flip panels (left flips left, right flips right) -->
    <div class="hidden xl:flex gap-3 w-full">
      <!-- Left panel -->
      <div class="flip-perspective flex-1 min-w-0 aspect-[1366/331]">
        <Transition name="flip-left" mode="out-in">
          <div
            :key="leftItem.image"
            class="banner-card relative h-full w-full rounded-xl overflow-hidden group cursor-pointer ring-1 ring-gray-200/80 dark:ring-white/10"
            @click="launchGame(leftItem.id, leftItem.name, leftItem.routeName)"
          >
            <img
              :src="formCloudflareImage(leftItem.image)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="leftItem.name + ' game banner'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Transition>
      </div>

      <!-- Right panel -->
      <div class="flip-perspective flex-1 min-w-0 aspect-[1366/331]">
        <Transition name="flip-right" mode="out-in">
          <div
            :key="rightItem.image"
            class="banner-card relative h-full w-full rounded-xl overflow-hidden group cursor-pointer ring-1 ring-gray-200/80 dark:ring-white/10"
            @click="launchGame(rightItem.id, rightItem.name, rightItem.routeName)"
          >
            <img
              :src="formCloudflareImage(rightItem.image)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="rightItem.name + ' game banner'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-perspective {
  perspective: 1200px;
}
.banner-card {
  backface-visibility: hidden;
  will-change: transform, opacity;
}

/* Left panel flips towards the left */
.flip-left-enter-active,
.flip-left-leave-active,
.flip-right-enter-active,
.flip-right-leave-active {
  transition: transform 0.55s ease, opacity 0.55s ease;
}
.flip-left-enter-from {
  transform: rotateY(-90deg);
  opacity: 0;
}
.flip-left-leave-to {
  transform: rotateY(90deg);
  opacity: 0;
}

/* Right panel flips towards the right */
.flip-right-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}
.flip-right-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}
</style>
