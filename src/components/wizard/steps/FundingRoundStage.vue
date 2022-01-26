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
import { defineComponent, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "PersonalDetails",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const fieldChanged = (event) => {
      if (formData.value.get(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
    };
  },
});
</script>
