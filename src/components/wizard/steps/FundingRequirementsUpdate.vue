<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Funding Requirements</h2>
    </div>

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Investment Required</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="fundingRoundInvestmentRequired"
        @input="fieldChanged($event)"
        name="fundingRoundInvestmentRequired"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <!--end::Input-->
      <ErrorMessage
        name="fundingRoundInvestmentRequired"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Pre-Money Valuation</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="fundingRoundPreMoneyValuation"
        @input="fieldChanged($event)"
        type="text"
        name="fundingRoundPreMoneyValuation"
        class="form-control form-control-lg form-control-solid"
        rows="3"
      ></Field>
      <ErrorMessage
        name="fundingRoundPreMoneyValuation"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Minimum Investment</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="fundingRoundMinimumInvestment"
        @input="fieldChanged($event)"
        type="text"
        name="fundingRoundMinimumInvestment"
        class="form-control form-control-lg form-control-solid"
        rows="3"
      ></Field>
      <ErrorMessage
        name="fundingRoundMinimumInvestment"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "funding-reqirements-update",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    fundingRound: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<Record<string, unknown>>(props.fundingRound);
    const fundingRoundInvestmentRequired = ref<string>("");
    const fundingRoundPreMoneyValuation = ref<string>("");
    const fundingRoundMinimumInvestment = ref<string>("");
    const syncData = (value) => {
      fundingRoundInvestmentRequired.value = value.fundingRoundInvestmentRequired;
      fundingRoundPreMoneyValuation.value = value.fundingRoundPreMoneyValuation;
      fundingRoundMinimumInvestment.value = value.fundingRoundMinimumInvestment;
    };
    watch(
      () => props.fundingRound,
      (value) => {
        formData.value = value;
        syncData(value);
      }
    );
    const fieldChanged = (event) => {
      formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      fundingRoundPreMoneyValuation,
      fundingRoundMinimumInvestment,
      fundingRoundInvestmentRequired,
    };
  },
});
</script>
