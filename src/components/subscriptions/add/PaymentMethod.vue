<template>
  <div
    class="card card-flush pt-3 mb-5 mb-lg-10"
    data-kt-subscriptions-form="pricing"
  >
    <div class="card-header">
      <div class="card-title">
        <h2 class="fw-bolder">Payment Method</h2>
      </div>

      <div class="card-toolbar">
        <a
          href="#"
          class="btn btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_card"
          >New Payment Method</a
        >
      </div>
    </div>

    <div class="card-body pt-0">
      <div id="kt_create_new_payment_method">
        <div v-for="card in cards" :key="card.id" class="py-1">
          <div class="py-3 d-flex flex-stack flex-wrap">
            <div
              class="d-flex align-items-center collapsible toggle collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#kt_create_new_payment_method_1"
              aria-expanded="false"
            >
              <img
                :src="`media/svg/card-logos/${card?.cardDetail?.data?.[0]?.card?.brand}.svg`"
                class="w-40px me-3"
                alt=""
              />

              <div class="me-3">
                <div
                  class="d-flex align-items-center fw-bolder"
                  style="text-transform: capitalize"
                >
                  {{ cardStringConstructor(card?.cardDetail ?? {}) }}
                </div>
                <div class="text-muted">
                  Expires
                  {{
                    convertDate(
                      `${card?.cardDetail?.data?.[0]?.card?.exp_month}-01-${card?.cardDetail?.data?.[0]?.card?.exp_year}`
                    )
                  }}
                </div>
              </div>
            </div>

            <div class="d-flex my-3 ms-9">
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
        </div>
      </div>
    </div>
  </div>
  <NewCardModal/>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import moment from "moment";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import NewCardModal from "@/components/modals/forms/NewCardModal.vue";

export default defineComponent({
  name: "kt-payment-method",
  components: {
    NewCardModal
  },
  setup() {
    const store = useStore();
    const cardStringConstructor = (card) => {
      const tempCard = card?.data?.[0]?.card ?? {};
      return `${tempCard?.brand ?? ""} ending in ${tempCard?.last4 ?? ""}`;
    };
    const convertDate = (date) => {
      return moment(date).format("MMM YYYY");
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
      changeActiveCard,
      cards,
      cardStringConstructor,
      convertDate,
    };
  },
});
</script>
