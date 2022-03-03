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
        v-for="(i, index) in advancedAssuranceOptions"
        :key="`as-${index}`"
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
import { defineComponent, reactive, watch, ref, inject } from "vue";

export default defineComponent({
  name: "investment-ticket-size",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const advancedAssuranceOptions = reactive([
      { name: "advanceAssuranceSeis", value: false },
      { name: "advanceAssuranceEis", value: false },
      { name: "advanceAssuranceAppliedFor", value: false },
      { name: "advanceAssuranceNotApplicable", value: false },
    ]);
    const business = inject("business");
    watch(business as Record<string, unknown>, (value) => {
      syncData(value);
    });
    const syncData = (value) => {
      if (value.advanceAssuranceSeis) advancedAssuranceOptions[0].value = true;
      if (value.advanceAssuranceEis) advancedAssuranceOptions[1].value = true;
      if (value.advanceAssuranceAppliedFor)
        advancedAssuranceOptions[2].value = true;
      if (value.advanceAssuranceNotApplicable) advancedAssuranceOptions[3].value = true;
      for (let i = 0; i < advancedAssuranceOptions.length; i++) {
        if (
          !eval(formData.value.get(advancedAssuranceOptions[i].name) as string)
        )
          formData.value.set(advancedAssuranceOptions[i].name, "0");
      }
    };
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name))
        formData.value.set(event.target.name, event.target.checked ? "1" : "0");
      else
        formData.value.append(
          event.target.name,
          event.target.checked ? "1" : "0"
        );
      emit("form-data", formData.value);
    };
    const enums = reactive({
      advanceAssuranceSeis: "SEIS",
      advanceAssuranceEis: "EIS",
      advanceAssuranceAppliedFor: "Applied For",
      advanceAssuranceNotApplicable: "Not Applicable",
    });
    return {
      formData,
      fieldChanged,
      advancedAssuranceOptions,
      enums,
    };
  },
});
</script>
