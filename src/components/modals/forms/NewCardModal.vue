<template>
  <!--begin::Modal - New Card-->
  <div
    class="modal fade"
    ref="newCardModalRef"
    id="kt_modal_new_card"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Add a new Payment Method</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <StripeElements
            v-if="stripeLoaded"
            v-slot="{ elements }"
            ref="elms"
            :stripe-key="stripeKey"
            :instance-options="instanceOptions"
            :elements-options="elementsOptions"
          >
            <div class="position-relative">
              <label class="required fs-6 fw-bold form-label mb-2"
                >Card Number</label
              >
              <StripeElement
                class="form-control form-control-solid"
                ref="cardNumber"
                type="cardNumber"
                :elements="elements"
                :options="cardOptions"
              />
              <div
                class="position-absolute translate-middle-y top-70 end-0 me-5"
              >
                <img
                  src="media/svg/card-logos/visa.svg"
                  alt=""
                  class="h-25px"
                />
                <img
                  src="media/svg/card-logos/mastercard.svg"
                  alt=""
                  class="h-25px"
                />
                <img
                  src="media/svg/card-logos/american-express.svg"
                  alt=""
                  class="h-25px"
                />
              </div>
            </div>
            <label class="required fs-6 fw-bold form-label mb-2 my-3"
              >Card Expiry</label
            >
            <StripeElement
              class="form-control form-control-solid"
              ref="cardExpiry"
              type="cardExpiry"
              :elements="elements"
              :options="cardOptions"
            />
            <label class="required fs-6 fw-bold form-label mb-2 my-3"
              >Card CVC</label
            >
            <StripeElement
              class="form-control form-control-solid"
              ref="cardCvc"
              type="cardCvc"
              :elements="elements"
              :options="cardOptions"
            />
            <label class="required fs-6 fw-bold form-label mb-2 my-3"
              >Postal Code</label
            >
            <StripeElement
              class="form-control form-control-solid"
              ref="postalCode"
              type="postalCode"
              :elements="elements"
              :options="cardOptions"
            />
          </StripeElements>
          <div class="text-center pt-15">
            <button
              @click="clear"
              type="reset"
              id="kt_modal_new_card_cancel"
              class="btn btn-white me-3"
            >
              Discard
            </button>

            <button
              @click="addPaymentMethod"
              ref="submitButtonRef"
              type="submit"
              id="kt_modal_new_card_submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Submit </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - New Card-->
</template>

<script lang="ts">
import { StripeElements, StripeElement } from "vue-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "new-card-modal",
  components: {
    StripeElements,
    StripeElement,
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value);
      stripePromise.then(() => {
        stripeLoaded.value = true;
      });
    });
    const stripeKey = ref(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
    const stripeLoaded = ref(false);
    const cardNumber = ref();
    const cardExpiry = ref();
    const cardCvc = ref();
    const postalCode = ref();
    const elms = ref();
    const instanceOptions = ref({});
    const elementsOptions = ref({});
    const cardOptions = ref({
      value: {
        // postalCode: "12345",
      },
    });
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const newCardModalRef = ref<null | HTMLElement>(null);
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
    const clear = () => {
      cardNumber.value?.stripeElement?.clear();
      cardExpiry.value?.stripeElement?.clear();
      cardCvc.value?.stripeElement?.clear();
      postalCode.value?.stripeElement?.clear();
    };
    const getCards = async () => {
      try {
        const response = await store.dispatch(Actions.GET_CARDS);
        console.log({ response });
      } catch (err) {
        //
      }
    };
    onMounted(async () => {
      getCards();
      getSetupIntent();
    });
    return {
      clear,
      submitButtonRef,
      newCardModalRef,
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      cardNumber,
      postalCode,
      cardExpiry,
      cardCvc,
      elms,
      store,
      getSetupIntent,
      setupIntent,
      getCards,
    };
  },
  methods: {
    async addPaymentMethod() {
      const cardElement = this.cardNumber.stripeElement;
      try {
        const response = await this.elms.instance.handleCardSetup(
          this.setupIntent,
          cardElement,
          {}
        );
        console.log({ response });
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
        this.cardNumber.stripeElement?.clear();
        this.cardExpiry.stripeElement?.clear();
        this.cardCvc.stripeElement?.clear();
        this.postalCode.stripeElement?.clear();
        hideModal(this.newCardModalRef);
        this.store.commit("setAlert", {
          message: "Success",
          subMessage: "Payment Method Added!",
          variant: "primary",
          duration: 4000,
          show: true,
        });
        this.getCards();
      } catch (err) {
        hideModal(this.newCardModalRef);
        this.store.commit("setAlert", {
          message: "Error",
          subMessage: err,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    },
  },
});
</script>

<style scoped>
.top-70 {
  top: 70% !important;
}
</style>
