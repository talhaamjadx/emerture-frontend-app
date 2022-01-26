<template>
  <!--begin::List Widget 6-->
  <div class="card" :class="widgetClasses">
    <div v-for="round in rounds" :key="round.id" class="card-body pt-0">
      <div class="my-5">
        <!--begin::Item-->
        <div
          :class="['mb-7', `bg-light-info`]"
          class="d-flex align-items-center rounded p-5 mb-7"
        >
          <!--begin::Icon-->
          <span :class="`svg-icon-info`" class="svg-icon me-5">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
            </span>
          </span>
          <!--end::Icon-->

          <!--begin::Title-->
          <div class="flex-grow-1 me-2">
            <a href="#" class="fw-bolder text-gray-800 text-hover-primary fs-6"
              >Funding Required</a
            >
          </div>
          <!--end::Title-->

          <!--begin::Lable-->
          <span :class="`text-info`" class="fw-bolder py-1">£{{
            round.investment_required
          }}</span>
          <!--end::Lable-->
        </div>
        <!--end::Item-->
      </div>
      <div>
        <!--begin::Item-->
        <div
          :class="['mb-7', `bg-light-info`]"
          class="d-flex align-items-center rounded p-5 mb-7"
        >
          <!--begin::Icon-->
          <span :class="`svg-icon-info`" class="svg-icon me-5">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
            </span>
          </span>
          <!--end::Icon-->

          <!--begin::Title-->
          <div class="flex-grow-1 me-2">
            <a href="#" class="fw-bolder text-gray-800 text-hover-primary fs-6"
              >Pre-Money Valuation</a
            >
          </div>
          <!--end::Title-->

          <!--begin::Lable-->
          <span :class="`text-info`" class="fw-bolder py-1">£{{
            round.preMoneyValuation
          }}</span>
          <!--end::Lable-->
        </div>
        <!--end::Item-->
      </div>
      <div>
        <!--begin::Item-->
        <div
          :class="['mb-7', `bg-light-info`]"
          class="d-flex align-items-center rounded p-5 mb-7"
        >
          <!--begin::Icon-->
          <span :class="`svg-icon-info`" class="svg-icon me-5">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
            </span>
          </span>
          <!--end::Icon-->

          <!--begin::Title-->
          <div class="flex-grow-1 me-2">
            <a href="#" class="fw-bolder text-gray-800 text-hover-primary fs-6"
              >Minimum Investment</a
            >
          </div>
          <!--end::Title-->

          <!--begin::Lable-->
          <span :class="`text-info`" class="fw-bolder py-1">£{{
            round.minimumInvestment
          }}</span>
          <!--end::Lable-->
        </div>
        <!--end::Item-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 6-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "funding-rounds",
  props: {
    widgetClasses: String,
    fundingRounds: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const rounds = ref(props.fundingRounds);
    watch(
      () => props.fundingRounds,
      (value) => {
        rounds.value = value;
      }
    );
    return {
      rounds,
    };
  },
});
</script>
