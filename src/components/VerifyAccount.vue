<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useGoogleDataLayers } from "../composables/useGoogleDataLayers";
import { usePropellarAds } from "../composables/usePropellarAds";
import { useLoginStore } from "../stores/login";
import { useRegisterStore } from "../stores/register";
import MobileInput from "./MobileInput.vue";

const ussdActivate = import.meta.env.VITE_USSD_ACTIVATE_ACCOUNT;

const { pushDataLayerToGoogle } = useGoogleDataLayers();

const { activateProfile, resetError } = useRegisterStore();

const { error, responseOK, pending, msisdn, otp } = storeToRefs(
  useRegisterStore()
);

const { token, profileSid } = storeToRefs(useLoginStore());

const router = useRouter();

function successfulVerifyDataLayer() {
  const signUpMethod = "msisdn";

  pushDataLayerToGoogle({
    event: "sign_up",
    sign_up_method: signUpMethod,
    user_id: profileSid.value,
  });
}

function unsuccessfulVerifyDataLayer() {
  pushDataLayerToGoogle({
    event: "sign_up_failed",
    error_message: error.value,
  });
}

async function submit() {
  const body = {
    otp: otp.value,
    msisdn: msisdn.value,
  };

  await activateProfile(body);
  if (responseOK.value) {
    successfulVerifyDataLayer();

    window.gtag("event", "conversion", {
      send_to: "AW-16789345990/VjbrCNvQgoIaEMat5MU-",
    });

    const { trackPropellerConversion } = usePropellarAds();
    trackPropellerConversion();

    if (token.value) {
      router.push({ name: "home" });
      return;
    }
    router.push({ name: "login" });
  } else {
    unsuccessfulVerifyDataLayer();
  }
}

onBeforeUnmount(() => {
  resetError();
});
</script>
<template>
  <div>
    <!-- Success banner -->
    <div class="rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-4 mb-6">
      <div class="flex items-start gap-3">
        <CheckCircleIcon class="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-semibold text-green-800 dark:text-green-300">
            Verification code sent
          </p>
          <p class="mt-1 text-xs text-green-700 dark:text-green-400">
            Missed your OTP? Dial
            <span class="font-bold">{{ ussdActivate }}</span>
            to activate your account instantly.
          </p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      Activate account
    </h2>
    <p class="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
      Enter the OTP sent to your phone
    </p>

    <form class="mt-6 space-y-5" autocomplete="off" @submit.prevent="submit">
      <MobileInput />
      <OtpInput />

      <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </div>

      <button
        class="w-full h-11 rounded-xl bg-brand-bright hover:bg-brand-bright/90 text-brand-forest text-sm font-semibold transition-colors cursor-pointer"
      >
        <TheButtonSpin v-if="pending" />
        <span v-else>Continue</span>
      </button>
    </form>
  </div>
</template>
