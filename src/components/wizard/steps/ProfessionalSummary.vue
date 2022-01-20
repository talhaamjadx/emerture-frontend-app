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
        v-model="introduction"
        @input="fieldChanged($event)"
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
        v-model="bio"
        @input="fieldChanged($event)"
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
import { defineComponent, ref, inject, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "ProfessionalSummary",
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
    const introduction = ref<string | unknown>("");
    const bio = ref<string | unknown>("");
    const expertProfile = inject("expertProfile");
    const fetchData = (value) => {
      bio.value = value.bio;
      introduction.value = value.introduction;
      formData.value.append("bio", bio.value as string);
      formData.value.append("introduction", introduction.value as string);
    };
    watch(expertProfile as Record<string, unknown>, (value) => {
      fetchData(value);
    });
    if ((expertProfile as Record<string, unknown>).value)
      fetchData((expertProfile as Record<string, unknown>).value);
    const fieldChanged = (event) => {
      if (formData.value.get(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      bio,
      introduction,
      formData,
      fieldChanged,
    };
  },
});
</script>
