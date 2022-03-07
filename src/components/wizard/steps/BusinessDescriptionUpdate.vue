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
        v-model="name"
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
        maxlength="200"
        v-model="summary"
        @input="fieldChanged($event)"
        type="text"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="summary"
        placeholder=""
        value=""
      />
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
        maxlength="200"
        v-model="overview"
        @input="fieldChanged($event)"
        type="text"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="overview"
        placeholder=""
        value=""
      />
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
        maxlength="200"
        v-model="defensibleUsp"
        @input="fieldChanged($event)"
        type="text"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="defensibleUsp"
        placeholder=""
        value=""
      />
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
    const name = ref<string>("");
    const summary = ref<string>("");
    const overview = ref<string>("");
    const defensibleUsp = ref<string>("");
    const business = inject("business");
    watch(business as Record<string, unknown>, (value) => {
      syncData(value);
    });
    const syncData = (value) => {
      name.value = value.name;
      summary.value = value.summary;
      overview.value = value.overview;
      defensibleUsp.value = value.defensibleUsp;
    };
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      name,
      summary,
      overview,
      defensibleUsp,
    };
  },
});
</script>
