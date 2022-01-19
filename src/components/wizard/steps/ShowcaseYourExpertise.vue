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
      <input type="file" @change="handleImageUpload($event)" name="documents" />
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Link To External Documents</label>
      <!--end::Label-->

      <Field
        @input="fieldChanged($event)"
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
import { defineComponent, ref } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
  name: "ProfessionalSummary",
  components: {
    Field,
  },
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const tempEvent = {
        target: {
          name: "documents",
          value: file,
        },
      };
      fieldChanged(tempEvent);
    };
    const fieldChanged = (event) => {
      if (formData.value.get(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      handleImageUpload,
    };
  },
});
</script>
