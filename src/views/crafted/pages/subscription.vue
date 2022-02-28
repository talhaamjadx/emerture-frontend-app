<template>
  <div class="row">
    <div class="col-md-6">
      The First subscription will be of
      {{ firstOrderPlan()?.planForMonths }} months for £{{
        firstOrderPlan()?.pricePerMonth
      }}. The Second subscription will be of
      {{ secondOrderPlan()?.planForMonths }} months for £{{
        secondOrderPlan()?.pricePerMonth
      }}. The Third subscription will be of
      {{ thirdOrderPlan()?.planForMonths }} months for £{{
        thirdOrderPlan()?.pricePerMonth
      }}. All the subsequent subscriptions after the third payment will be of
      {{ thirdOrderPlan()?.planForMonths }} months for £{{
        thirdOrderPlan()?.pricePerMonth
      }}.
    </div>
    <div class="col-md-6">
      <button
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
      </button>
    </div>
  </div>
  <div class="my-3">
    <StripeElements
      v-if="stripeLoaded"
      v-slot="{ elements }"
      ref="elms"
      :stripe-key="stripeKey"
      :instance-options="instanceOptions"
      :elements-options="elementsOptions"
    >
      <StripeElement ref="card" :elements="elements" :options="cardOptions" />
    </StripeElements>
  </div>
  <button type="button" class="btn btn-primary my-3" @click="addPaymentMethod">
    Add a Payment Method
  </button>
  <div class="row">
    <div class="col-md-12">
      <label for="">Payment Methods</label>
      <ul class="my-4">
        <li v-for="card in cards" :key="card.id" class="my-3">
          <div class="row">
            <div class="col-md-6">
              {{ cardStringConstructor(card?.cardDetail ?? {}) }}
            </div>
            <div class="col-md-6">
              <div
                class="
                  form-check form-switch form-check-custom form-check-solid
                "
              >
                <input
                  @input="changeActiveCard(card?.isActive ?? 0, card.id)"
                  class="form-check-input mx-3"
                  type="checkbox"
                  id="flexSwitchChecked"
                  :checked="card?.isActive == 1 ? true : false"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <span v-if="!cards?.length">No Payment Methods</span>
    </div>
  </div>
</template>

<script lang="ts">
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import moment from "moment";

export default defineComponent({
  name: "Subscription",

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
    const formatDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };
    const store = useStore();
    const stripeKey = ref(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
    const instanceOptions = ref({});
    const elementsOptions = ref({});
    const cardOptions = ref({
      value: {
        // postalCode: "12345",
      },
    });
    const stripeLoaded = ref(false);
    const card = ref();
    const elms = ref();

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value);
      stripePromise.then(() => {
        stripeLoaded.value = true;
      });
    });
    const setupIntent = ref<string>("");
    const getSetupIntent = async () => {
      try {
        const response = await store.dispatch(Actions.SETUP_INTENT);
        if (!response.success) throw new Error("");
        setupIntent.value = response?.data?.client_secret ?? "";
      } catch (err) {
        //
      }
    };
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
      getCards();
      getSetupIntent();
    });
    const cardStringConstructor = (card) => {
      const tempCard = card?.data?.[0]?.card ?? {};
      return `${(tempCard?.brand ?? "").toUpperCase()} ending in ${
        tempCard?.last4 ?? ""
      }`;
    };
    const subscribe = async () => {
      const createPaymentResponse = await store.dispatch(
        Actions.CREATE_PAYMENT
      );
      if (createPaymentResponse.status == 400) {
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
      store.commit("setAlert", {
        message: "Success",
        subMessage: "Subscription Successful!",
        variant: "primary",
        duration: 4000,
        show: true,
      });
    };
    const user = computed(() => store.getters.getUser);
    const changeActiveCard = async (isActive, id) => {
      try {
        const response = await store.dispatch(
          Actions.CHANGE_ACTIVE_CARD_STATUS,
          {
            cardId: id,
            status: isActive == 1 ? 0 : 1,
          }
        );
        if (!response?.success) throw new Error("error in active card status");
        getCards();
        for (let i = 0; i < +cards.value.length; i++) {
          if (cards.value[i]?.id != id) {
            await store.dispatch(Actions.CHANGE_ACTIVE_CARD_STATUS, {
              cardId: cards.value[i]?.id,
              status: 0,
            });
          }
        }
        getCards();
      } catch (err) {
        //
      }
    };
    return {
      formatDate,
      user,
      firstOrderPlan,
      secondOrderPlan,
      thirdOrderPlan,
      changeActiveCard,
      getCards,
      subscribe,
      cards,
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
      setupIntent,
      store,
      getSetupIntent,
      cardStringConstructor,
    };
  },

  methods: {
    async addPaymentMethod() {
      const cardElement = this.card.stripeElement;
      try {
        const response = await this.elms.instance.handleCardSetup(
          this.setupIntent,
          cardElement,
          {}
        );
        if (response?.error) {
          this.getSetupIntent();
          throw new Error(response?.error?.message);
        }
        const saveCardResponse = await this.store.dispatch(Actions.SAVE_CARD, {
          paymentMethod: response?.setupIntent?.payment_method,
        });
        if (saveCardResponse !== true)
          throw new Error("error in saving card details!");
        this.getSetupIntent();
        this.card.stripeElement?.clear();
        this.store.commit("setAlert", {
          message: "Success",
          subMessage: "Payment Method Added!",
          variant: "primary",
          duration: 4000,
          show: true,
        });
        this.getCards();
      } catch (err) {
        console.log({ err });
      }
    },
  },
});
</script>
