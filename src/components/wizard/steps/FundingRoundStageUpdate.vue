<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Funding Round</h2>
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="fundingRoundName"
        @input="fieldChanged($event)"
        name="fundingRoundName"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <ErrorMessage
        name="fundingRoundName"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "funding-round-stage-update",
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
    const fundingRoundName = ref<string>("");
    const syncData = (value) => {
      fundingRoundName.value = value.fundingRoundName;
    };
    watch(() => props.fundingRound, (value) => {
      formData.value = value
      syncData(value)
    });
    const fieldChanged = (event) => {
      formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      fundingRoundName,
    };
  },
});
</script>
