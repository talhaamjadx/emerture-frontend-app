<template>
  <div class="card my-3">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <!--begin::Wrapper-->
      <div class="card-px text-center py-20 my-10">
        <!--begin::Title-->
        <h2 class="fs-2x fw-bolder mb-10">Subscription</h2>
        <!--end::Title-->

        <!--begin::Description-->
        <p class="text-gray-400 fs-4 fw-bold mb-10">
          The First subscription will be of
          {{ firstOrderPlan()?.planForMonths }} months for £{{
            firstOrderPlan()?.pricePerMonth
          }}. The Second subscription will be of
          {{ secondOrderPlan()?.planForMonths }} months for £{{
            secondOrderPlan()?.pricePerMonth
          }}. The Third subscription will be of
          {{ thirdOrderPlan()?.planForMonths }} months for £{{
            thirdOrderPlan()?.pricePerMonth
          }}. All the subsequent subscriptions after the third payment will be
          of {{ thirdOrderPlan()?.planForMonths }} months for £{{
            thirdOrderPlan()?.pricePerMonth
          }}.
        </p>
        <!--end::Description-->

        <!--begin::Action-->
        <button
          :data-kt-indicator="loading ? 'on' : null"
          :disabled="
            user?.userPlan ?? false
              ? user?.userPlan?.status == 1
                ? true
                : false
              : false
          "
          @click="subscribe"
          class="btn btn-primary"
        >
          <span v-if="!loading" class="indicator-label">
            {{
              user?.userPlan ?? false
                ? user?.userPlan?.status == 1
                  ? `Subscribed ${
                      user?.userPlan?.planId
                        ? `(${user?.userPlan?.planId?.planForMonths} months for £${user?.userPlan?.planId?.pricePerMonth})`
                        : `(Trail Expires on ${formatDate(
                            user?.userPlan?.renewSubscriptionAt ?? null
                          )})`
                    }`
                  : "Subscribe"
                : "Subscribe"
            }}
          </span>
          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Action-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <PaymentMethod />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";
import PaymentMethod from "@/components/subscriptions/add/PaymentMethod.vue";

export default defineComponent({
  name: "Subscription",

  components: {
    PaymentMethod,
  },

  setup() {
    const loading = ref<boolean>(false);
    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };
    const store = useStore();
    const cards = computed(() => store.getters.cardsGetter);
    const getCards = async () => {
      try {
        const response = await store.dispatch(Actions.GET_CARDS);
        console.log({ response });
      } catch (err) {
        //
      }
    };
    const plans = computed(() => store.getters.plansGetter);
    const firstOrderPlan = () => {
      return plans.value?.find((plan) => plan?.orderNo == 1) ?? {};
    };
    const secondOrderPlan = () => {
      return plans.value?.find((plan) => plan?.orderNo == 2) ?? {};
    };
    const thirdOrderPlan = () => {
      return plans.value?.find((plan) => plan?.orderNo == 3) ?? {};
    };
    const getPlans = async () => {
      try {
        const response = await store.dispatch(Actions.GET_PLANS);
        console.log({ response });
      } catch (err) {
        //
      }
    };
    onMounted(async () => {
      getPlans();
    });
    const cardStringConstructor = (card) => {
      const tempCard = card?.data?.[0]?.card ?? {};
      return `${(tempCard?.brand ?? "").toUpperCase()} ending in ${
        tempCard?.last4 ?? ""
      }`;
    };
    const subscribe = async () => {
      loading.value = true
      const createPaymentResponse = await store.dispatch(
        Actions.CREATE_PAYMENT
      );
      if (
        createPaymentResponse.status == 400 ||
        createPaymentResponse.status == 500
      ) {
        loading.value = false
        store.commit("setAlert", {
          message: "Error",
          subMessage: createPaymentResponse?.data?.message ?? "",
          variant: "danger",
          duration: 4000,
          show: true,
        });
        return;
      }
      store.dispatch(Actions.AUTH_USER);
      loading.value = false
      store.commit("setAlert", {
        message: "Success",
        subMessage: "Subscription Successful!",
        variant: "primary",
        duration: 4000,
        show: true,
      });
    };
    const user = computed(() => store.getters.getUser);

    return {
      loading,
      formatDate,
      user,
      firstOrderPlan,
      secondOrderPlan,
      thirdOrderPlan,
      getCards,
      subscribe,
      cards,
      store,
      cardStringConstructor,
    };
  },
});
</script>
