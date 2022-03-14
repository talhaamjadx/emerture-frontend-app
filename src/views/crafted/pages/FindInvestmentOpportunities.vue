<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="accordion" id="kt_accordion_1">
          <div class="accordion-item">
            <h2 class="accordion-header d-flex" id="kt_accordion_1_header_2">
              <button
                class="accordion-button fs-4 fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#kt_accordion_1_body_2"
                aria-expanded="true"
                aria-controls="kt_accordion_1_body_2"
              >
                Industry Sectors
              </button>
              <span class="accordion-icon d-flex align-items-center mx-2"
                ><span class="svg-icon svg-icon-4">
                  <div>
                    <div
                      class="
                        form-check
                        form-switch
                        form-check-custom
                        form-check-solid
                      "
                    >
                      <p
                        style="
                          font-weight: 100;
                          font-size: small;
                          font-family: inherit;
                        "
                        class="my-2"
                        for="flexSwitchDefault"
                      >
                        All Listed Opportunities
                      </p>
                      <input
                        v-model="globalSearch"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexSwitchDefault"
                      />
                    </div></div></span
              ></span>
            </h2>
            <div
              id="kt_accordion_1_body_2"
              class="accordion-collapse collapse show"
              aria-labelledby="kt_accordion_1_header_2"
              data-bs-parent="#kt_accordion_1"
            >
              <div class="accordion-body">
                <div class="row">
                  <div
                    v-for="is in industrySectors"
                    :key="is.id"
                    class="
                      form-check form-check-custom form-check-solid
                      my-3
                      col-md-4
                    "
                  >
                    <input
                      @input="addToIndustrySectors($event)"
                      class="form-check-input"
                      type="checkbox"
                      :checked="
                        selectedIndustrySectors.some((sis) => sis == is.id)
                      "
                      id="flexCheckDefault"
                      :data-id="is.id"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ is.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="showError" style="color: red">
          Select Atleast One To Find Experts
        </p>
        <div class="mt-8">
          <button
            :data-kt-indicator="loading ? 'on' : null"
            @click="findOpportunityInvestment"
            class="btn btn-primary float-end"
          >
            <span v-if="!loading" class="indicator-label"
              >Find Investment Opportunities</span
            >
            <span class="indicator-progress">
              Please wait...
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span
            ></span>
          </button>
        </div>
      </div>
    </div>
    <InvestmentOpportunities
      :fromConnectedInvestmentOpportunities="false"
      :investmentOpportunitiesMain="filteredInvestmentOpportunities"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  watchEffect,
  watch,
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import InvestmentOpportunities from "@/views/crafted/pages/investment-opportunities.vue";

export default defineComponent({
  name: "find-investment-opportunities",
  components: {
    InvestmentOpportunities,
  },
  setup() {
    const loading = ref<boolean>(false);
    const globalSearch = ref<boolean>(false);
    watch(globalSearch, (value) => {
      if (value) {
        selectedIndustrySectors.value = industrySectors.value?.map(
          (is) => is.id
        );
      }
    });
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const founderRequisiteExperts = ref<Array<Record<string, unknown>>>([]);
    watchEffect(() => {
      founderRequisiteExperts.value = user.value.founderRequisiteExpert;
    });
    const isAlreadyConnected = (id) => {
      return founderRequisiteExperts.value.some((expert) => {
        return objectPath.get(expert, "id", false) == id;
      });
    };
    const industrySectors = computed(() => store.getters.industrySectorsGetter);
    const selectedIndustrySectors = ref<Array<number>>([]);
    const filteredInvestmentOpportunities = computed(
      () => store.getters.getFilteredInvestmentOpportunities
    );
    const filteredExperts = computed(() => store.getters.filteredExpertsGetter);
    const showError = ref<boolean>(false);
    const addToIndustrySectors = (event) => {
      showError.value = false;
      if (event.target.checked) {
        selectedIndustrySectors.value = [
          ...selectedIndustrySectors.value,
          event.target.dataset["id"],
        ];
      } else {
        selectedIndustrySectors.value = selectedIndustrySectors.value.filter(
          (i) => {
            return i != event.target.dataset["id"];
          }
        );
      }
    };
    const findOpportunityInvestment = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.FIND_INVESTMENT_OPPORTUNITIES,
          selectedIndustrySectors.value.length
            ? {
                industrySectorIds: selectedIndustrySectors.value,
              }
            : null
        );
        if (response !== true) throw new Error();
        loading.value = false;
      } catch (err) {
        loading.value = false;
      }
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs("Find Investment Opportunities", []);
      if (!industrySectors.value.length)
        await store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });

    return {
      loading,
      globalSearch,
      showError,
      industrySectors,
      addToIndustrySectors,
      filteredExperts,
      isAlreadyConnected,
      filteredInvestmentOpportunities,
      findOpportunityInvestment,
      selectedIndustrySectors,
    };
  },
});
</script>

<style scoped>
.accordion-button::after {
  background-image: none;
}
.accordion-button:not(.collapsed)::after {
  background-image: none;
}
</style>
