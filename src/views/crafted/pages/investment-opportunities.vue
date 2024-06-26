<template>
  <div
    v-for="opportunity in investmentOpportunities.founderBusinesses"
    :key="opportunity.id"
  >
    <div class="container-fluid p-0">
      <div class="row m-3 g-0">
        <div class="col-12 order-md-first order-last">
          <div class="content" style="background-color: #1b283f">
            <div class="row">
              <div
                class="
                  col-sm-4 col-12
                  order-sm-first order-last
                  text-center
                  offset-sm-1
                "
              >
                <div>
                  <img
                    class="rounded-circle my-2"
                    :src="`${opportunity.logo ?? 'media/avatars/blank.png'}`"
                    style="
                      border: 3px solid white;
                      width: 120px;
                      height: 118px;
                      object-fit: cover;
                    "
                  />
                </div>
                <router-link
                  :to="`/investment-opportunity-profile/${opportunity.id}`"
                  type="button"
                  class="btn btn-danger my-sm-2 my-3"
                  style="display: block; margin: auto; width: 70%"
                >
                  View Investment Opportunity
                </router-link>
                <div v-if="hasInvestorRole">
                  <button
                    v-if="
                      !connectedIds[opportunity.id] &&
                      !props.fromConnectedInvestmentOpportunities
                    "
                    data-bs-toggle="modal"
                    :data-bs-target="`#kt_modal_delete_round_disclaimer_${opportunity.id}`"
                    type="button"
                    style="width: 70%; display: block; margin: auto"
                    class="btn btn-danger my-sm-2 my-3"
                  >
                    Request Virtual Pitch Event
                  </button>
                  <button
                    v-else
                    disabled
                    type="button"
                    style="width: 70%; display: block; margin: auto"
                    class="btn btn-danger my-sm-2 my-3"
                  >
                    Requested
                  </button>
                </div>
              </div>

              <div
                class="
                  col-sm-4 col-12
                  order-sm-last order-first
                  text-white text-center
                  my-sm-auto
                  mt-3
                  offset-sm-1
                "
              >
                <h3 style="color: white !important">{{ opportunity.name }}</h3>
                <p>{{ opportunity.summary }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-xl-5 col-12 order-md-last order-first">
          <div class="contnt">
            <img
              :src="`${opportunity.headerImage}`"
              style="width: 100%; height: 242px"
            />
          </div>
        </div> -->
      </div>
    </div>
    <DisclaimerModal
      :key="opportunity.id"
      @connected="refresh()"
      :businessId="opportunity.id"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import DisclaimerModal from "@/components/modals/forms/DisclaimerModal.vue";

export default defineComponent({
  props: {
    investmentOpportunitiesMain: {
      required: true,
      type: Object,
    },
    fromConnectedInvestmentOpportunities: {
      type: Boolean,
    },
  },
  components: {
    DisclaimerModal,
  },
  setup(props) {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const hasInvestorRole = computed(() => {
      return user.value?.userRoles?.some(
        (role) => role.name.toLowerCase() == "investor"
      );
    });
    const investmentOpportunities = ref<Record<string, unknown>>({});
    let connectedIds = ref<Record<string, unknown>>({});
    const refresh = async () => {
      try {
        const response = await store.dispatch(
          Actions.CONNECTED_INVESTMENT_OPPORTUNITIES
        );
        if (!response.success) throw new Error();
        connectedIds.value = {};
        for (let i = 0; i < response.data.length; i++) {
          connectedIds.value[response.data?.[i]?.founderBusiness?.id] = true;
        }
      } catch (err) {
        //
      }
    };
    onMounted(() => {
      refresh();
    });
    watchEffect(() => {
      investmentOpportunities.value = props.investmentOpportunitiesMain;
    });
    return {
      investmentOpportunities,
      connectedIds,
      props,
      refresh,
      hasInvestorRole,
    };
  },
});
</script>