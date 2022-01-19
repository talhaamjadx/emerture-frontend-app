<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Professional Summary</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Introduction</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        type="textarea"
        name="introduction"
        class="form-control form-control-lg form-control-solid"
        rows="10"
      ></Field>
      <ErrorMessage
        name="introduction"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Bio</label>
      <!--end::Label-->

      <Field
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="bio"
        placeholder=""
        value=""
      />
      <ErrorMessage
        name="bio"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "ProfessionalSummary",
  components: {
    Field,
    ErrorMessage,
  },
});
</script>
