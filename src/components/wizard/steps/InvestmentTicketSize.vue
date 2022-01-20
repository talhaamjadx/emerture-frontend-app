<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Investment Ticket Size</h2>
      <div class="text-gray-400 fw-bold fs-6">
        Please confirm your minimum and maximum ticket size for investments.
        This information would help in creating matches with relevant investment
        rounds.
      </div>
    </div>
    <!--end::Heading-->
    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Currency</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="currencyCode"
        @input="fieldChanged($event)"
        name="currencyCode"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
      >
        <option selected value="pound">£ (Pounds Sterling)</option>
        <option value="dollar">$ (US Dollars)</option>
        <option value="euro">€ (Euros)</option>
      </Field>
      <!--end::Input-->
      <ErrorMessage
        name="currencyCode"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <div class="row mb-10">
      <!--begin::Label-->
      <div class="col-md-6">
        <label class="form-label required">Minimum Investment</label>
        <Field
          v-model="minInvestment"
          @input="fieldChanged($event)"
          name="minInvestment"
          class="form-control form-control-lg form-control-solid"
          value=""
        />
        <ErrorMessage
          name="minInvestment"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <div class="col-md-6">
        <label class="form-label required">Maximum Investment</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          v-model="maxInvestment"
          @input="fieldChanged($event)"
          name="maxInvestment"
          class="form-control form-control-lg form-control-solid"
          value=""
        />
        <ErrorMessage
          name="maxInvestment"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input-->
    </div>
    <div class="row mb-10">
      <!--begin::Label-->
      <div class="col-md-6">
        <label class="form-label required">Stage of Evolution</label>
        <div
          v-for="(i, index) in stageOfEvolution"
          :key="`soe-${index}`"
          class="form-check form-check-custom form-check-solid my-3"
        >
          <input
            @input="fieldChanged($event)"
            v-model="i.value"
            class="form-check-input"
            type="checkbox"
            :name="i.name"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ enums[i.name] }}
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label required">Minimum Traction</label>
        <div
          v-for="(i, index) in minimumTraction"
          :key="`mt-${index}`"
          class="form-check form-check-custom form-check-solid my-3"
        >
          <input
            @input="fieldChanged($event)"
            v-model="i.value"
            class="form-check-input"
            type="checkbox"
            :name="i.name"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ enums[i.name] }}
          </label>
        </div>
      </div>
      <!--end::Input-->
    </div>
    <div class="row mb-10">
      <!--begin::Label-->
      <div class="col-md-6">
        <label class="form-label required">Geo Focus</label>
        <div
          v-for="(i, index) in geoFocus"
          :key="`gf-${index}`"
          class="form-check form-check-custom form-check-solid my-3"
        >
          <input
            @input="fieldChanged($event)"
            v-model="i.value"
            class="form-check-input"
            type="checkbox"
            :name="i.name"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ enums[i.name] }}
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <label class="form-label required">Tax Relief Status</label>
        <div
          v-for="(i, index) in taxReliefStatus"
          :key="`trs-${index}`"
          class="form-check form-check-custom form-check-solid my-3"
        >
          <input
            @input="fieldChanged($event)"
            v-model="i.value"
            class="form-check-input"
            type="checkbox"
            :name="i.name"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ enums[i.name] }}
          </label>
        </div>
      </div>
      <!--end::Input-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, reactive, inject, watch, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "investment-ticket-size",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<Record<string, unknown>>(props.formDataTemp);
    const investorProfile = inject("investorProfile");
    const currencyCode = ref<string | unknown>("");
    const minInvestment = ref<string | unknown>("");
    const maxInvestment = ref<string | unknown>("");
    watch(() => props.formDataTemp, () => {
      formData.value = props.formDataTemp
    })
    watch(investorProfile as Record<string, unknown>, (value) => {
      currencyCode.value = value.currencyCode;
      minInvestment.value = value.minInvestment;
      maxInvestment.value = value.maxInvestment;
      for (let i = 0; i < stageOfEvolution.length; i++) {
        if (value[stageOfEvolution[i].name] == 1)
          stageOfEvolution[i].value = true;
      }
      for (let i = 0; i < minimumTraction.length; i++) {
        if (value[minimumTraction[i].name] == 1)
          minimumTraction[i].value = true;
      }
      for (let i = 0; i < geoFocus.length; i++) {
        if (value[geoFocus[i].name] == 1)
          geoFocus[i].value = true;
      }
      for (let i = 0; i < taxReliefStatus.length; i++) {
        if (value[taxReliefStatus[i].name] == 1)
          taxReliefStatus[i].value = true;
      }
    });
    const fieldChanged = (event) => {
      if (event.target.type == "checkbox")
        formData.value[event.target.name] = event.target.checked ? 1 : 0;
      else formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    const enums = reactive({
      stageOfEvolutionPreSeed: "Pre-seed",
      stageOfEvolutionSeed: "Seed",
      stageOfEvolutionPreSeriesA: "Pre-series-A",
      stageOfEvolutionSeriesA: "Series As",
      minimumTractionPreMvp: "Pre-MVP",
      minimumTractionPostMvp: "Post-MVP",
      minimumTractionPreRevenue: "Pre-Revenue",
      minimumTractionPostRevenue: "Post-Revenue",
      geoFocusUk: "UK",
      geoFocusUs: "US",
      geoFocusEu: "EU",
      geoFocusGlobal: "Global",
      taxReliefStatusSeis: "SEIS",
      taxReliefStatusEis: "EIS",
      taxReliefStatusNa: "NA",
    });
    const stageOfEvolution = reactive([
      { name: "stageOfEvolutionPreSeed", value: false },
      { name: "stageOfEvolutionSeed", value: false },
      { name: "stageOfEvolutionPreSeriesA", value: false },
      { name: "stageOfEvolutionSeriesA", value: false },
    ]);
    const minimumTraction = reactive([
      { name: "minimumTractionPreMvp", value: false },
      { name: "minimumTractionPostMvp", value: false },
      { name: "minimumTractionPreRevenue", value: false },
      { name: "minimumTractionPostRevenue", value: false },
    ]);
    const geoFocus = reactive([
      { name: "geoFocusUk", value: false },
      { name: "geoFocusEu", value: false },
      { name: "geoFocusUs", value: false },
      { name: "geoFocusGlobal", value: false },
    ]);
    const taxReliefStatus = reactive([
      { name: "taxReliefStatusSeis", value: false },
      { name: "taxReliefStatusEis", value: false },
      { name: "taxReliefStatusNa", value: false },
    ]);
    return {
      formData,
      fieldChanged,
      stageOfEvolution,
      enums,
      minimumTraction,
      geoFocus,
      taxReliefStatus,
      currencyCode,
      minInvestment,
      maxInvestment,
    };
  },
});
</script>
