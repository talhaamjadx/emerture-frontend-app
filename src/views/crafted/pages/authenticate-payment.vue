<template>
  <div>{{ error_message }}</div>
  <button @click="authenticateAndPay">Authenticate</button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, LocationQueryValue } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const error_message = ref<string>("")
    const paymentMethod = ref<string | string | LocationQueryValue[]>(
      route?.query?.paymentMethod ?? ""
    );
    const paymentIntentId = ref<string | string | LocationQueryValue[]>(
      route?.query?.paymentIntent ?? ""
    );
    const paymentIntent = ref<Record<string, unknown>>({});
    let stripe = ref();
    const authenticateAndPay = async () => {
      try {
        const response = await stripe.value?.handleCardPayment(
          paymentIntent.value?.client_secret,
          {
            payment_method: paymentMethod.value,
          }
        );
        console.log({ response });
      } catch (err) {
        console.log("error", err);
      }
    };
    onMounted(async () => {
      try {
        stripe.value = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
        const response = await store.dispatch(
          Actions.GET_PAYMENT_INTENT,
          paymentIntentId.value
        );
        if (response?.status != 200) throw new Error(response?.data?.error);
        paymentIntent.value = response?.data;
        error_message.value = response?.data?.last_payment_error?.message ?? ""
      } catch (err) {
        //
      }
    });
    return {
      authenticateAndPay,
      error_message
    };
  },
});
</script>
