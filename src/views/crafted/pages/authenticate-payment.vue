<template>
  <div>{{ error_message }}</div>
  <button class="btn btn-primary" @click="authenticateAndPay">
    Authenticate
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, LocationQueryValue } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const error_message = ref<string>("");
    const paymentMethod = ref<string | string | LocationQueryValue[]>(
      route?.query?.paymentMethod ?? ""
    );
    const paymentIntentId = ref<string | string | LocationQueryValue[]>(
      route?.query?.paymentIntent ?? ""
    );
    const userPlanId = ref<string | string | LocationQueryValue[]>(
      route?.query?.upi ?? ""
    );
    const userPaymentId = ref<string | string | LocationQueryValue[]>(
      route?.query?.uppi ?? ""
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
        if (response?.error) {
          const statusResponse = await store.dispatch(
            Actions.CHANGE_PAYMENT_STATUS,
            {
              userPaymentId: userPaymentId.value,
              userPlanId: userPlanId.value,
              status: 2,
            }
          );
          if (statusResponse?.success) {
            store.commit("setAlert", {
              message: "Error",
              subMessage: response?.error?.message ?? "",
              variant: "danger",
              duration: 4000,
              show: true,
            });
          }
        } else {
          const statusResponse = await store.dispatch(
            Actions.CHANGE_PAYMENT_STATUS,
            {
              userPaymentId: userPaymentId.value,
              userPlanId: userPlanId.value,
              status: 1,
            }
          );
          if (statusResponse?.success) {
            store.commit("setAlert", {
              message: "Success",
              subMessage: "Client Authentication Successful",
              variant: "primary",
              duration: 4000,
              show: true,
            });
            await store.dispatch(Actions.AUTH_USER);
            router.push("/subscription");
          }
        }
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
        console.log({response})
        if (response?.status != 200) throw new Error(response?.data?.data?.error);
        paymentIntent.value = response?.data?.data;
        error_message.value = response?.data?.data?.last_payment_error?.message ?? "";
      } catch (err) {
        //
      }
    });
    return {
      authenticateAndPay,
      error_message,
    };
  },
});
</script>
