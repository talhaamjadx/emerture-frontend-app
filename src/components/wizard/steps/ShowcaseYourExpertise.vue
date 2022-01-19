<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Showcase Your Expertise</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10 d-flex flex-column">
      <!--end::Label-->
      <label class="form-label">Documents</label>
      <!--end::Label-->

      <!--begin::Input-->
      <input type="file" />
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Link To External Documents</label>
      <!--end::Label-->

      <Field
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="linkToExternalDocuments"
        placeholder="https://"
        value=""
      />
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
  name: "ProfessionalSummary",
  components: {
    Field,
  },
});
</script>
