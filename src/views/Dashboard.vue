<template>
  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-12">
      <FounderStatistics
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></FounderStatistics>
    </div>
    <div class="col-xxl-12">
      <InvestorStatistics
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></InvestorStatistics>
    </div>
    <div class="col-xxl-12">
      <ExpertStatistics
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></ExpertStatistics>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import FounderStatistics from "@/components/widgets/mixed/FounderStatistics.vue";
import InvestorStatistics from "@/components/widgets/mixed/InvestorStatistics.vue";
import ExpertStatistics from "@/components/widgets/mixed/ExpertStatistics.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "dashboard",
  components: {
    FounderStatistics,
    ExpertStatistics,
    InvestorStatistics
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Dashboard");
    });
  },
});
</script>
