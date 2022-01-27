<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Upload Pitch Deck</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10 d-flex flex-column">
      <!--end::Label-->
      <label class="form-label">Documents</label>
      <!--end::Label-->

      <!--begin::Input-->
      <input
        id="documents"
        type="file"
        @change="handleImageUpload($event)"
        name="pitchDeckDocument"
      />
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";

export default defineComponent({
  name: "ProfessionalSummary",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const document = ref<string | unknown>("");
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const tempEvent = {
        target: {
          name: event.target.name,
          value: file,
        },
      };
      fieldChanged(tempEvent);
    };
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      document,
      formData,
      fieldChanged,
      handleImageUpload,
    };
  },
});
</script>
