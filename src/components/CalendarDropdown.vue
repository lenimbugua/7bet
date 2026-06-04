<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { useFormatDates } from "../composables/useFormatDates";

// import { useMatchesStore } from "../stores/matches";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

import { useModalStore } from "@/stores/modal";

import { useModalTypes } from "@/composables/useModalTypes";
import { ref } from "vue";

const { calendar } = useModalTypes();

const { openModal } = useModalStore();

// const { fetchDayMatches } = useMatchesStore();
const { getMatches, emptyMatches, setCalendarIsPending } = useMatches2Store();
const { setDay, setResource } = useSportsQueryParamsStore();

const { generateNextFourDays } = useFormatDates();

const nextFourDays = generateNextFourDays();

const selectedDay = ref(nextFourDays[0]);

const isCalendar = ref(false);

function openCalendar() {
  isCalendar.value = true;
  openModal(calendar);
}
async function fetchMatchesByDate(date) {
  isCalendar.value = false;
  emptyMatches();
  setResource("");
  setDay(date);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}
</script>

<template>
  <div class="flex items-center">
    <Listbox v-model="selectedDay">
      <div class="relative">
        <ListboxButton
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-bright/40"
        >
          <!-- Calendar icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-3.5 h-3.5 text-brand-bright shrink-0"
          >
            <path
              fill-rule="evenodd"
              d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-xs font-medium text-gray-700 dark:text-gray-200 capitalize whitespace-nowrap">
            {{ isCalendar ? 'Date' : selectedDay.day }}
          </span>
          <ChevronUpDownIcon
            class="w-3 h-3 text-gray-500 dark:text-gray-500 shrink-0"
            aria-hidden="true"
          />
        </ListboxButton>

        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <ListboxOptions
            class="absolute z-50 mt-1.5 right-0 w-36 overflow-hidden rounded-xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
          >
            <div class="py-1">
              <ListboxOption
                v-for="day in nextFourDays"
                v-slot="{ active, selected }"
                :key="day.date"
                :value="day"
                as="template"
                @click="fetchMatchesByDate(day.date)"
              >
                <li
                  :class="[
                    active
                      ? 'bg-brand-bright/10 dark:bg-brand-bright/15'
                      : '',
                    selected
                      ? 'text-brand-bright font-semibold'
                      : 'text-gray-700 dark:text-gray-200',
                    'flex items-center gap-2.5 cursor-pointer select-none px-3 py-2 text-xs',
                  ]"
                >
                  <CheckIcon
                    v-if="selected"
                    class="w-3.5 h-3.5 text-brand-bright shrink-0"
                    aria-hidden="true"
                  />
                  <div
                    v-else
                    class="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-white/15 shrink-0"
                  />
                  <span class="uppercase truncate">{{ day.day }}</span>
                </li>
              </ListboxOption>
            </div>

            <!-- Pick Date divider + button -->
            <div class="border-t border-gray-200 dark:border-white/8 px-1.5 py-1.5">
              <button
                class="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
                @click="openCalendar()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-3.5 h-3.5 text-brand-bright shrink-0"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Pick Date
              </button>
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
