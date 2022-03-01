<template>
  <div>
    <InvestmentOpportunities
      :fromConnectedInvestmentOpportunities="true"
      :investmentOpportunitiesMain="filteredInvestmentOpportunities"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import InvestmentOpportunities from "@/views/crafted/pages/investment-opportunities.vue";

export default defineComponent({
  name: "find-investment-opportunities",
  components: {
    InvestmentOpportunities,
  },
  setup() {
    const store = useStore();
    const filteredInvestmentOpportunities = ref<Record<string, unknown>>({
      founderBusinesses: [],
    });
    const investmentOpportunities = computed(
      () => store.getters.getConnectedInvestmentOpportunities
    );
    onMounted(async () => {
      setCurrentPageBreadcrumbs("Connected Investment Opportunities", []);
      if (!investmentOpportunities.value.length)
        await store.dispatch(Actions.CONNECTED_INVESTMENT_OPPORTUNITIES);
      investmentOpportunities.value.forEach((investment) => {
        (
          filteredInvestmentOpportunities.value["founderBusinesses"] as Array<
            Record<string, unknown>
          >
        ).push(investment.founderBusiness);
      });
    });

    return {
      filteredInvestmentOpportunities,
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
