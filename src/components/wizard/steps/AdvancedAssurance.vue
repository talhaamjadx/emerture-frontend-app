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
import { defineComponent, reactive, watch, ref } from "vue";

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
    const advancedAssuranceOptions = reactive([
      { name: "advanceAssuranceSeis", value: false },
      { name: "advanceAssuranceEis", value: false },
      { name: "advanceAssuranceAppliedFor", value: false },
    ]);
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    const fieldChanged = (event) => {
      if (event.target.type == "checkbox")
        formData.value[event.target.name] = event.target.checked ? 1 : 0;
      else formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    const enums = reactive({
      advanceAssuranceSeis:"SEIS",
      advanceAssuranceEis:"EIS",
      advanceAssuranceAppliedFor:"Applied For",
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
