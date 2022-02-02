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
      <input
        id="documents"
        type="file"
        @change="handleImageUpload($event)"
        name="documents"
      />
      <a v-if="document" target="_blank" :href="document" class="my-2"
        >Uploaded Document</a
      >
      <!--end::Input-->
      <p v-if="!isDocumentAdded" style="color: red">Document is Required</p>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Link To External Documents</label>
      <!--end::Label-->

      <Field
        v-model="externalDocumentUrl"
        @input="fieldChanged($event)"
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="externalDocumentUrl"
        placeholder="https://"
        value=""
      />
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";
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
    isDocumentAddedProp: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const document = ref<string | unknown>("");
    const isDocumentAdded = ref<boolean>(props.isDocumentAddedProp);
    watch(
      () => props.isDocumentAddedProp,
      (value) => (isDocumentAdded.value = value)
    );
    const externalDocumentUrl = ref<string | unknown>("");
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const tempEvent = {
        target: {
          name: "documents",
          value: file,
        },
      };
      isDocumentAdded.value = true;
      fieldChanged(tempEvent);
    };
    const expertProfile = inject("expertProfile");
    const fetchData = (value) => {
      document.value = value.document;
      externalDocumentUrl.value = value.externalDocumentUrl;
      formData.value.append(
        "externalDocumentUrl",
        externalDocumentUrl.value as string
      );
    };
    watch(expertProfile as Record<string, unknown>, (value) => {
      fetchData(value);
    });
    if ((expertProfile as Record<string, unknown>).value)
      fetchData((expertProfile as Record<string, unknown>).value);
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      isDocumentAdded,
      document,
      externalDocumentUrl,
      formData,
      fieldChanged,
      handleImageUpload,
    };
  },
});
</script>
