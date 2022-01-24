<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Advanced Assurance</h2>
    </div>
    <div class="fv-row mb-10">
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
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, reactive, inject, watch, ref } from "vue";

export default defineComponent({
  name: "investment-ticket-size",
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
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    watch(investorProfile as Record<string, unknown>, (value) => {
      fetchData(value);
    });
    const fetchData = (value) => {
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
        if (value[geoFocus[i].name] == 1) geoFocus[i].value = true;
      }
      for (let i = 0; i < taxReliefStatus.length; i++) {
        if (value[taxReliefStatus[i].name] == 1)
          taxReliefStatus[i].value = true;
      }
    };
    if ((investorProfile as Record<string, unknown>)?.value){
      fetchData((investorProfile as Record<string, unknown>)?.value);
    }
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
