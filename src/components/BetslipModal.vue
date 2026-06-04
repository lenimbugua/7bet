<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal";
import { useModalTypes } from "@/composables/useModalTypes";
import { useBetslipStore } from "@/stores/sports-betslip";
import { computed, ref } from "vue";

const { betslip, instantBetslip } = useModalTypes();
const { betslipLength } = storeToRefs(useBetslipStore());
const { clearBetslip } = useBetslipStore();

const { showModal, modalType } = storeToRefs(useModalStore());
const { closeModal } = useModalStore();
const closeButtonRef = ref(null); // Element to initially focus

const showBetslip = computed(() => {
  return (
    (modalType.value === betslip || modalType.value === instantBetslip) &&
    showModal.value
  );
});


</script>

<template>
  <TransitionRoot appear :show="showBetslip" as="template">
    <Dialog
      as="div"
      class="relative z-50"
      :initial-focus="closeButtonRef"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>
      <div class="fixed z-50 inset-0 flex flex-col justify-end">
        <div class="flex flex-col mt-auto sm:items-center text-center max-h-dvh">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-8"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-8"
          >
            <DialogPanel
              class="w-full max-w-4xl h-dvh max-h-dvh sm:h-auto sm:max-h-[80dvh] bg-white dark:bg-background transform overflow-hidden text-left align-middle shadow-xl dark:shadow-none border-t border-gray-200 dark:border-white/6 transition-all rounded-none sm:rounded-t-xl flex flex-col"
            >
              <div
                class="relative z-10 flex items-center justify-between px-4 py-2.5 sm:py-3 border-b border-gray-200 dark:border-white/5 shrink-0 bg-gray-100 dark:bg-surface-elevated shadow-md shadow-black/10 dark:shadow-black/40"
              >
                <DialogTitle
                  class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide"
                >
                  <slot name="title"></slot>
                </DialogTitle>
                <button
                  v-if="betslipLength > 0"
                  class="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors cursor-pointer"
                  @click="clearBetslip"
                >
                  <TrashIcon class="w-3.5 h-3.5" />
                  Clear All
                </button>
                <div class="flex items-center gap-3">
                  <button ref="closeButtonRef" class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer outline-hidden" aria-label="Close betslip" @click="closeModal">
                    <XMarkIcon class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div class="flex-1 min-h-0 flex flex-col">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
