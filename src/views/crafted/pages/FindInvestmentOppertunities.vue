<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="accordion" id="kt_accordion_1">
          <div class="accordion-item">
            <h2 class="accordion-header d-flex" id="kt_accordion_1_header_2">
              <button
                class="accordion-button fs-4 fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#kt_accordion_1_body_2"
                aria-expanded="false"
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
                        Global Search
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
              class="accordion-collapse collapse"
              aria-labelledby="kt_accordion_1_header_2"
              data-bs-parent="#kt_accordion_1"
            >
              <div class="accordion-body">
                <div v-if="globalSearch">
                  <div
                    v-for="is in industrySectors"
                    :key="is.id"
                    class="form-check form-check-custom form-check-solid my-3"
                  >
                    <input
                      @input="addToIndustrySectors($event)"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      :data-id="is.id"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      {{ is.name }}
                    </label>
                  </div>
                </div>
                <p v-else>
                  Turn on global search to filter by industry sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p v-if="showError" style="color: red">
          Select Atleast One To Find Experts
        </p>
        <div v-if="globalSearch" class="mt-8">
          <button
            @click="findOppertunityInvestment"
            class="btn btn-primary float-end"
          >
            Find Investment Oppertunities
          </button>
        </div>
      </div>
    </div>
    <InvestmentOppertunities
      :investmentOppertunitiesMain="investmentOppertunities"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watchEffect } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import InvestmentOppertunities from "@/views/crafted/pages/investment-oppertunities.vue";

export default defineComponent({
  name: "find-investment-oppertunities",
  components: {
    InvestmentOppertunities,
  },
  setup() {
    const globalSearch = ref<boolean>(false);
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const founderRequisiteExperts = ref<Array<Record<string, unknown>>>([]);
    const investmentOppertunities = computed(
      () => store.getters.getInvestmentOppertunities
    );
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
    const findOppertunityInvestment = async () => {
      try {
        const response = await store.dispatch(
          Actions.FIND_INVESTMENT_OPPERTUNITIES, selectedIndustrySectors.value.length ?
          {
            industrySectorIds: selectedIndustrySectors.value,
          } : null
        );
        if (response !== true) throw new Error();
      } catch (err) {
        //
      }
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs("Find Investment Oppertunities", []);
      if (!investmentOppertunities.value.length)
        await store.dispatch(Actions.FIND_INVESTMENT_OPPERTUNITIES);
      if (!industrySectors.value.length)
        await store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });

    return {
      globalSearch,
      showError,
      industrySectors,
      addToIndustrySectors,
      filteredExperts,
      isAlreadyConnected,
      investmentOppertunities,
      findOppertunityInvestment,
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
