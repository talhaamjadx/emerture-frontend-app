<template>
  <!--begin::List Widget 5-->
  <div>
    <div class="pt-5">
      <!--begin::Timeline-->
      <div class="timeline-label">
        <div
          v-for="investment in investmentsTemp"
          :key="investment.id"
          class="timeline-item"
        >
          <!--begin::Label-->
          <div
            style="width: 100px"
            class="timeline-label fw-bolder text-gray-800 fs-6"
          >
            {{ formatDate(investment?.createdAt) }}
          </div>
          <!--end::Label-->

          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless text-success fs-1"></i>
          </div>
          <!--end::Badge-->

          <!--begin::Content-->
          <div class="timeline-content d-flex">
            <span class="fw-bolder text-gray-800 ps-3">{{
              `${currencyCodeTemp} ${investment?.investment} Invested By ${investment?.investor?.user?.firstName ?? ''} ${investment?.investor?.user?.lastName ?? ''}`
            }}</span>
          </div>
          <!--end::Content-->
        </div>
      </div>
      <!--end::Timeline-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end: List Widget 5-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import moment from "moment";

export default defineComponent({
  name: "investment-history",
  props: {
    investments: Array,
    currencyCode: String,
  },
  components: {},
  setup(props) {
    const currencyCodeTemp = ref<string>(props.currencyCode as string);
    const investmentsTemp = ref<Array<Record<string, unknown>>>(
      props.investments as Array<Record<string, unknown>>
    );
    watch(
      () => props.investments,
      (value) =>
        (investmentsTemp.value = value as Array<Record<string, unknown>>)
    );
    const formatDate = (date) => {
      return moment(date).format("YYYY-MM-DD");
    };
    return {
      formatDate,
      currencyCodeTemp,
      investmentsTemp,
    };
  },
});
</script>

<style scoped>
.timeline-label:before {
  left: 101px;
}
</style>
