<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Founder Details</h2>
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="name"
        @input="fieldChanged($event)"
        name="name"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <ErrorMessage
        name="name"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Summary</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="summary"
        @input="fieldChanged($event)"
        name="summary"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <!--end::Input-->
      <ErrorMessage
        name="jobTitle"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>

      <!--begin::Hint-->
      <div class="form-text">
        Customers will see this shortened version of your statement descriptor
      </div>
      <!--end::Hint-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Website</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="website"
        @input="fieldChanged($event)"
        type="text"
        name="website"
        class="form-control form-control-lg form-control-solid"
        rows="3"
      ></Field>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "FounderDetailsStep",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const name = ref<string | unknown>("");
    const summary = ref<string | unknown>("");
    const website = ref<string | unknown>("");
    const formData = ref<Record<string, unknown>>(props.formDataTemp);
    const fetchData = (value) => {
      name.value = value.name;
      summary.value = value.summary;
      website.value = value.website;
    };
    watch(
      () => props.formDataTemp as Record<string, unknown>,
      (value) => {
        fetchData(value);
      }
    );
    if (formData.value) fetchData(formData.value);
    const fieldChanged = (event) => {
      formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    return {
      name,
      summary,
      website,
      formData,
      fieldChanged,
    };
  },
});
</script>
