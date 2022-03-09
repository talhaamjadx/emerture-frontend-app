<template>
  <div>
    <InvestmentOpportunities
      :fromConnectedInvestmentOpportunities="false"
      :investmentOpportunitiesMain="matchedInvestmentOpportunities"
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
} from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import InvestmentOpportunities from "@/views/crafted/pages/investment-opportunities.vue";

export default defineComponent({
  name: "matched-investment-opportunities",
  components: {
    InvestmentOpportunities,
  },
  setup() {
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
    const matchedInvestmentOpportunities = computed(
      () => store.getters.getInvestmentOpportunities
    );
    const filteredExperts = computed(() => store.getters.filteredExpertsGetter);

    onMounted(async () => {
      setCurrentPageBreadcrumbs("Find Investment Opportunities", []);
      if (!matchedInvestmentOpportunities.value.length)
        await store.dispatch(Actions.FIND_INVESTMENT_OPPORTUNITIES);
    });

    return {
      filteredExperts,
      isAlreadyConnected,
      matchedInvestmentOpportunities,
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
