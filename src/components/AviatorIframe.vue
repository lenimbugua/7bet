<script setup>
import { useAviatorStore } from "@/stores/aviator";
import { computed, onBeforeUnmount, ref } from "vue";
import CasinoEmbedd from "../components/CasinoEmbedd.vue";
import { useCasinoStore } from "../stores/casino";

const { setLaunchGameId, setLaunchGameMeta } = useCasinoStore();

const rooms = [
  { id: import.meta.env.VITE_AVIATOR_GAME_ID, label: "Room 1" },
  { id: import.meta.env.VITE_AVIATOR_ROOM_TWO_GAME_ID, label: "Room 2" },
];

const activeRoom = ref(rooms[0].id);
const iframeKey = ref(0);

const activeIndex = computed(() =>
  rooms.findIndex((r) => r.id === activeRoom.value)
);

const sliderStyle = computed(() => ({
  width: `calc(${100 / rooms.length}% - 4px)`,
  transform: `translateX(calc(${activeIndex.value * 100}% + ${activeIndex.value * 4}px))`,
}));

function switchRoom(roomId) {
  if (roomId === activeRoom.value) return;
  activeRoom.value = roomId;
  setLaunchGameId(roomId);
  iframeKey.value++;
}

// Init with Room 1
setLaunchGameId(rooms[0].id);
setLaunchGameMeta("Aviator", "Spribe");

const { setView } = useAviatorStore();

onBeforeUnmount(() => {
  setView("");
});
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Room switcher -->
    <div class="room-tabs" role="tablist">
      <div class="room-tabs-inner">
        <!-- Sliding indicator -->
        <div class="room-slider" :style="sliderStyle"></div>

        <button
          v-for="room in rooms"
          :key="room.id"
          role="tab"
          :aria-selected="activeRoom === room.id"
          class="room-tab"
          :class="activeRoom === room.id ? 'room-tab--active' : ''"
          @click="switchRoom(room.id)"
        >
          <span
            class="room-dot"
            :class="activeRoom === room.id ? 'room-dot--active' : ''"
          ></span>
          <span>{{ room.label }}</span>
        </button>
      </div>
    </div>

    <!-- Game -->
    <div class="flex-1 min-h-0">
      <CasinoEmbedd :key="iframeKey" />
    </div>
  </div>
</template>

<style scoped>
.room-tabs {
  padding: 3px 10px;
  background: oklch(16% 0.03 258);
  border-bottom: 1px solid oklch(100% 0 0 / 0.04);
}

.room-tabs-inner {
  position: relative;
  display: flex;
  gap: 0;
  background: oklch(100% 0 0 / 0.04);
  border-radius: 6px;
  padding: 2px;
}

.room-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(100% - 4px);
  border-radius: 5px;
  background: oklch(45% 0.12 145 / 0.7);
  backdrop-filter: blur(8px);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  box-shadow: 0 1px 4px oklch(45% 0.12 145 / 0.3);
}

.room-tab {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 0;
  font-size: 0.65rem;
  font-weight: 600;
  color: oklch(60% 0.01 258);
  cursor: pointer;
  transition: color 0.2s;
  border-radius: 5px;
}
.room-tab--active {
  color: white;
  text-shadow: 0 1px 2px oklch(0% 0 0 / 0.3);
}

.room-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: oklch(100% 0 0 / 0.12);
  transition: all 0.2s;
}
.room-dot--active {
  background: oklch(80% 0.14 145);
  box-shadow: 0 0 4px oklch(70% 0.14 145 / 0.5);
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 3px oklch(70% 0.14 145 / 0.3); }
  50% { box-shadow: 0 0 6px oklch(70% 0.14 145 / 0.6); }
}
</style>
