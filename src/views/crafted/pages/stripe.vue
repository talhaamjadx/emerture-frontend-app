<template>
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
  <button type="button" @click="pay">Pay</button>
</template>

<script lang="ts">
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
export default defineComponent({
  name: "CardOnly",

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
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
    onMounted(async () => {
      getSetupIntent();
    });

    return {
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
    };
  },

  methods: {
    async pay() {
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
      } catch (err) {
        console.log({ err });
      }
    },
  },
});
</script>
