<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Business Description</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Business Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @input="fieldChanged($event)"
        type="textarea"
        name="name"
        class="form-control form-control-lg form-control-solid"
        rows="10"
      ></Field>
      <ErrorMessage
        name="name"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Summary</label>
      <!--end::Label-->

      <Field
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        type="text"
        v-model="summary"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="summary"
        placeholder=""
        value=""
      />
      <p class="float-end my-1">{{ summary?.length }}/{{ limitLength }}</p>
      <ErrorMessage
        name="summary"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Overview</label>
      <!--end::Label-->

      <Field
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        v-model="overview"
        type="text"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="overview"
        placeholder=""
        value=""
      />
      <p class="float-end my-1">{{ overview?.length }}/{{ limitLength }}</p>
      <ErrorMessage
        name="overview"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Defensible USP</label>
      <!--end::Label-->

      <Field
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        type="text"
        v-model="defensibleUsp"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="defensibleUsp"
        placeholder=""
        value=""
      />
      <p class="float-end my-1">
        {{ defensibleUsp?.length }}/{{ limitLength }}
      </p>
      <ErrorMessage
        name="defensibleUsp"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const limitLength = 200;
    const summary = ref<string>("");
    const defensibleUsp = ref<string>("");
    const overview = ref<string>("");
    const limitInput = (e) => {
      if (e.target.value.length >= limitLength) e.preventDefault();
    };
    const formData = ref<FormData>(props.formDataTemp);
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      limitInput,
      limitLength,
      summary,
      defensibleUsp,
      overview,
    };
  },
});
</script>
